import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Player from "./Player"

export default async function CourseLearnPage({ params }: { params: { courseId: string } }) {
    const { courseId } = await params
    const session = await auth()
    if (!session) redirect("/login")

    const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
            progress: {
                where: { userId: session.user.id }
            }
        }
    })

    if (!course || !course.videoUrl) redirect("/dashboard/courses")

    let progress = course.progress[0]

    // Eagerly create progress if it doesn't exist to mark it as "Cursando"
    if (!progress) {
        progress = await db.userProgress.create({
            data: {
                userId: session.user.id,
                courseId: course.id,
                playbackTime: 0,
                isCompleted: false
            }
        })
    }

    return (
        <div className="h-full bg-black">
            <Player
                courseId={course.id}
                videoUrl={course.videoUrl}
                initialTime={progress?.playbackTime || 0}
                isCompleted={progress?.isCompleted || false}
            />
        </div>
    )
}
