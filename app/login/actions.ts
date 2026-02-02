"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
    const email = formData.get("email")
    const password = formData.get("password")

    console.log("🔐 Login attempt:", { email, hasPassword: !!password })

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false, // Cambiado para manejar la redirección manualmente
        })

        console.log("✅ Login result:", result)

        if (result?.error) {
            console.error("❌ Login error:", result.error)
            redirect(`/login?error=${result.error}`)
        }

        // Si todo salió bien, redirigir al dashboard
        redirect("/dashboard")
    } catch (error) {
        console.error("❌ Login exception:", error)
        if (error instanceof AuthError) {
            redirect(`/login?error=${error.type}`)
        }
        throw error
    }
}
