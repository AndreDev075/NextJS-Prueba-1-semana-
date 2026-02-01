import { PrismaClient } from '@prisma/client'
import { Role, CourseLevel, CourseStatus } from '../types/enums'


import { hash } from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    const password = await hash('password123', 12)

    // 1. Users
    // Super Admin
    const superAdmin = await prisma.user.upsert({
        where: { email: 'super@lms.com' },
        update: {},
        create: {
            email: 'super@lms.com',
            name: 'Super Admin',
            role: 'SUPER_ADMIN' as Role,
            password,
        },
    })
    console.log({ superAdmin })

    // 2 Admins
    const admins = ['admin1', 'admin2']
    for (const admin of admins) {
        await prisma.user.upsert({
            where: { email: `${admin}@lms.com` },
            update: {},
            create: {
                email: `${admin}@lms.com`,
                name: `Admin ${admin}`,
                role: 'ADMIN' as Role,
                password,
            },
        })
    }

    // 3 Instructors
    const instructors = ['inst1', 'inst2', 'inst3']
    const instructorIds = []
    for (const inst of instructors) {
        const user = await prisma.user.upsert({
            where: { email: `${inst}@lms.com` },
            update: {},
            create: {
                email: `${inst}@lms.com`,
                name: `Instructor ${inst}`,
                role: 'INSTRUCTOR' as Role,
                password,
            },
        })
        instructorIds.push(user.id)
    }

    // 10 Students
    for (let i = 1; i <= 10; i++) {
        await prisma.user.upsert({
            where: { email: `student${i}@lms.com` },
            update: {},
            create: {
                email: `student${i}@lms.com`,
                name: `Student ${i}`,
                role: 'STUDENT' as Role,
                password,
            },
        })
    }

    // 2. Courses
    const coursesData = [
        { title: 'Intro to Programming', level: 'BEGINNER' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'Advanced React Patterns', level: 'ADVANCED' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'Next.js for Beginners', level: 'BEGINNER' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'Mastering TypeScript', level: 'INTERMEDIATE' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'Database Design 101', level: 'BEGINNER' as CourseLevel, status: 'ARCHIVED' as CourseStatus },
        { title: 'Kubernetes Deep Dive', level: 'ADVANCED' as CourseLevel, status: 'DRAFT' as CourseStatus },
        { title: 'CSS Grid & Flexbox', level: 'BEGINNER' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'UI/UX Principles', level: 'INTERMEDIATE' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'Node.js Microservices', level: 'ADVANCED' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'Python for Data Science', level: 'INTERMEDIATE' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'Machine Learning Basics', level: 'ADVANCED' as CourseLevel, status: 'DRAFT' as CourseStatus },
        { title: 'Cybersecurity Fundamentals', level: 'BEGINNER' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'Agile Methodologies', level: 'BEGINNER' as CourseLevel, status: 'ARCHIVED' as CourseStatus },
        { title: 'DevOps Pipelines', level: 'INTERMEDIATE' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
        { title: 'Mobile App Dev with React Native', level: 'INTERMEDIATE' as CourseLevel, status: 'PUBLISHED' as CourseStatus },
    ]

    let courseCount = 0
    for (const course of coursesData) {
        const randomInstructorId = instructorIds[courseCount % instructorIds.length]

        const existing = await prisma.course.findFirst({
            where: { title: course.title }
        })

        if (!existing) {
            await prisma.course.create({
                data: {
                    title: course.title,
                    shortDescription: `Learn ${course.title} in this comprehensive course.`,
                    description: `Full description for ${course.title}. This course covers all the essentials and advanced topics needed to master the subject. Includes projects and quizzes.`,
                    level: course.level,
                    status: course.status,
                    createdById: randomInstructorId,
                }
            })
        }
        courseCount++
    }

    console.log('Seed completed successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
