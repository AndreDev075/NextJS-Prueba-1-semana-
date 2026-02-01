import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { User } from "@prisma/client"
import { Role } from "@/types/enums"
import { z } from "zod"

const UpdateRoleSchema = z.object({
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'INSTRUCTOR', 'STUDENT'] as const),
})

export async function getUsers(query?: string, role?: string, status?: string): Promise<User[]> {
    const session = await auth()
    if (session?.user.role !== 'ADMIN' && session?.user.role !== 'SUPER_ADMIN') {
        return [] // Return empty array instead of throwing to avoid UI crash
    }

    return await db.user.findMany({
        where: {
            AND: [
                query ? {
                    OR: [
                        { name: { contains: query } },
                        { email: { contains: query } }
                    ]
                } : {},
                role ? { role: role as Role } : {},
                status ? { isActive: status === 'ACTIVE' } : {},
            ]
        },
        orderBy: { createdAt: 'desc' }
    })
}

export async function updateUserRole(userId: string, newRole: Role) {
    const session = await auth()
    if (session?.user.role !== 'ADMIN' && session?.user.role !== 'SUPER_ADMIN') {
        throw new Error("Unauthorized")
    }

    if (session.user.id === userId) {
        throw new Error("Cannot modify your own role")
    }

    const { role } = UpdateRoleSchema.parse({ role: newRole })

    await db.user.update({
        where: { id: userId },
        data: { role }
    })

    revalidatePath('/dashboard/admin/users')
}

export async function toggleUserStatus(userId: string, isActive: boolean) {
    const session = await auth()
    if (session?.user.role !== 'ADMIN' && session?.user.role !== 'SUPER_ADMIN') {
        throw new Error("Unauthorized")
    }

    if (session.user.id === userId) {
        throw new Error("Cannot deactivate yourself")
    }

    await db.user.update({
        where: { id: userId },
        data: { isActive }
    })
    revalidatePath('/dashboard/admin/users')
}
