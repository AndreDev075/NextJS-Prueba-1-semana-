import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log("🔑 Authorize called with credentials:", {
                    email: credentials?.email,
                    hasPassword: !!credentials?.password
                })

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (!parsedCredentials.success) {
                    console.log("❌ Invalid credentials format:", parsedCredentials.error.issues)
                    console.error("❌ Invalid credentials format:", parsedCredentials.error.issues)
                    return null
                }

                const { email, password } = parsedCredentials.data
                console.log("✅ Credentials validated for email:", email)

                try {
                    console.log("🔍 Searching for user in database...")
                    
                    const user = await db.user.findUnique({ where: { email } })

                    console.log("email:", email)
                    console.log("User:", user)

                    if (!user) {
                        console.log("❌ User not found in database:", email)
                        console.error("❌ User not found in database:", email)
                        return null
                    }

                    console.log("✅ User found:", {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        hasPassword: !!user.password
                    })
                    console.log("✅ User password:" + user.password)
                    console.log("this password:" + password)

                    //if (!user.password) {
                    //    console.log("❌ User has no password set")
                    //    console.error("❌ User has no password set")
                    //    return null
                    //}

                    console.log("🔐 Comparing passwords...")
                    console.log("Password from input:", password)
                    console.log("Hash from database:", user.password)

                    // Try bcrypt first
                    let passwordsMatch = await bcrypt.compare(password, user.password)
                    console.log("Bcrypt match:", passwordsMatch)

                    // TEMPORARY: Fallback to plain text comparison for debugging
                    if (password == user.password) {
                        console.log("⚠️ WARNING: Plain text password match (INSECURE)")
                        passwordsMatch = true
                    }

                    console.log("Final match result:", passwordsMatch)

                    if (!passwordsMatch) {
                        console.log("❌ Password does not match")
                        console.error("❌ Password does not match")
                        return null
                    }

                    console.log("✅ Password matches! Login successful")
                    return user
                } catch (error) {
                    console.log("❌ Database error during authorize:", error)
                    console.error("❌ Database error during authorize:", error)
                    if (error instanceof Error) {
                        console.log("Error message:", error.message)
                        console.error("Error stack:", error.stack)
                    }
                    return null
                }
            },
        }),
    ],
})
