"use server"
console.log("!!! actions.ts TOP LEVEL LOADED !!!")

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { CourseLevel, CourseStatus } from "@/types/enums"


export async function createCourse(formData: FormData) {
    const session = await auth()
    if (!session || (session.user.role !== 'INSTRUCTOR' && session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
        throw new Error("Unauthorized")
    }

    const title = (formData.get("title") as string) || "Untitled Course"

    const course = await db.course.create({
        data: {
            title,
            createdById: session.user.id,
            status: 'DRAFT',
            level: 'BEGINNER'
        }
    })

    redirect(`/dashboard/courses/${course.id}`)
}

export async function updateCourse(courseId: string, formData: FormData) {
    const session = await auth()
    const course = await db.course.findUnique({ where: { id: courseId } })
    if (!course) throw new Error("Not found")

    // Check authorization
    if (!session || (course.createdById !== session.user.id && session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
        throw new Error("Unauthorized")
    }

    await db.course.update({
        where: { id: courseId },
        data: {
            title: formData.get("title") as string,
            description: formData.get("description") as string || null,
            videoUrl: formData.get("videoUrl") as string || null,
            level: formData.get("level") as CourseLevel,
            status: formData.get("status") as CourseStatus,
        }
    })

    revalidatePath(`/dashboard/courses/${courseId}`)
    revalidatePath(`/dashboard/courses`)
}

export async function deleteCourse(courseId: string) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    await db.course.delete({
        where: { id: courseId }
    })
    revalidatePath(`/dashboard/courses`)
}

export async function updateProgress(courseId: string, playbackTime: number, isCompleted: boolean = false) {
    console.log(">>> SERVER ACTION: updateProgress START", { courseId, playbackTime, isCompleted });

    try {
        const session = await auth();
        if (!session?.user?.id) {
            console.log(">>> SERVER ACTION: No session found");
            return;
        }

        console.log(">>> SERVER ACTION: Updating DB for user", session.user.id);

        await db.userProgress.upsert({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId
                }
            },
            update: {
                playbackTime,
                isCompleted: isCompleted,
                updatedAt: new Date()
            },
            create: {
                userId: session.user.id,
                courseId,
                playbackTime,
                isCompleted,
                updatedAt: new Date()
            }
        });

        console.log(">>> SERVER ACTION: updateProgress SUCCESS");
    } catch (error: any) {
        console.error(">>> SERVER ACTION: updateProgress ERROR", error.message);
    }
}

export async function completeCourse(courseId: string) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    await db.userProgress.update({
        where: {
            userId_courseId: {
                userId: session.user.id,
                courseId
            }
        },
        data: {
            isCompleted: true
        }
    })

    revalidatePath(`/dashboard/courses`)
    revalidatePath(`/dashboard/courses/${courseId}/learn`)
}
