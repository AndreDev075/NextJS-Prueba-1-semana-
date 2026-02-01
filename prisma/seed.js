const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    const password = await bcrypt.hash('password123', 12)

    // Super Admin
    const superAdmin = await prisma.user.upsert({
        where: { email: 'super@lms.com' },
        update: {},
        create: {
            email: 'super@lms.com',
            name: 'Super Admin',
            role: 'SUPER_ADMIN',
            password,
        },
    })

    // Admin
    await prisma.user.upsert({
        where: { email: 'admin1@lms.com' },
        update: {},
        create: {
            email: 'admin1@lms.com',
            name: 'Admin User',
            role: 'ADMIN',
            password,
        },
    })

    // Instructor
    const inst1 = await prisma.user.upsert({
        where: { email: 'inst1@lms.com' },
        update: {},
        create: {
            email: 'inst1@lms.com',
            name: 'Instructor One',
            role: 'INSTRUCTOR',
            password,
        },
    })

    // Students
    for (let i = 1; i <= 5; i++) {
        await prisma.user.upsert({
            where: { email: `student${i}@lms.com` },
            update: {},
            create: {
                email: `student${i}@lms.com`,
                name: `Student ${i}`,
                role: 'STUDENT',
                password,
            },
        })
    }

    // Courses
    const courseCount = await prisma.course.count()
    if (courseCount === 0) {
        await prisma.course.createMany({
            data: [
                {
                    title: 'Intro to Programming',
                    shortDescription: 'Learn programming basics',
                    description: 'A comprehensive introduction to programming',
                    level: 'BEGINNER',
                    status: 'PUBLISHED',
                    createdById: inst1.id,
                },
                {
                    title: 'Advanced React',
                    shortDescription: 'Master React patterns',
                    level: 'ADVANCED',
                    status: 'PUBLISHED',
                    createdById: inst1.id,
                },
                {
                    title: 'TypeScript Fundamentals',
                    shortDescription: 'Learn TypeScript',
                    level: 'INTERMEDIATE',
                    status: 'PUBLISHED',
                    createdById: inst1.id,
                },
                {
                    title: 'Node.js Mastery',
                    shortDescription: 'Backend with Node.js',
                    level: 'INTERMEDIATE',
                    status: 'DRAFT',
                    createdById: inst1.id,
                },
            ]
        })
    }

    console.log('✅ Seed completed successfully!')
    console.log('\n📝 Demo credentials:')
    console.log('   Admin: admin1@lms.com / password123')
    console.log('   Instructor: inst1@lms.com / password123')
    console.log('   Student: student1@lms.com / password123')
}

main()
    .catch((e) => {
        console.error('❌ Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
