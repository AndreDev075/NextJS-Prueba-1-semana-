"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BookOpen, Users, LogOut, Settings, User } from "lucide-react"
import { signOut } from "next-auth/react"

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
        roles: ["ADMIN", "SUPER_ADMIN", "INSTRUCTOR"],
    },
    {
        label: "Courses",
        icon: BookOpen,
        href: "/dashboard/courses",
        color: "text-violet-500",
    },
    {
        label: "Users",
        icon: Users,
        href: "/dashboard/admin/users",
        color: "text-pink-700",
        roles: ["ADMIN", "SUPER_ADMIN"],
    },
    {
        label: "Profile",
        icon: User,
        href: "/dashboard/profile",
        color: "text-emerald-500",
    },
]

export function Sidebar({ role }: { role?: string }) {
    const pathname = usePathname()

    const filteredRoutes = routes.filter(route =>
        !route.roles || (role && route.roles.includes(role))
    )

    return (
        <div className="flex flex-col h-full bg-[#0d1117] border-r border-[#30363d] text-[#c9d1d9]">
            <div className="px-6 py-8 flex-1">
                <Link href="/dashboard" className="flex items-center mb-10 group">
                    <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                        <LayoutDashboard className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-white font-heading">LMS PRO</span>
                </Link>

                <nav className="space-y-1.5">
                    {filteredRoutes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "group flex items-center px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 hover:bg-[#161b22] relative",
                                pathname === route.href
                                    ? "text-white bg-blue-600 shadow-lg shadow-blue-500/20"
                                    : "text-[#8b949e] hover:text-white"
                            )}
                        >
                            <route.icon className={cn(
                                "h-5 w-5 mr-3 transition-colors",
                                pathname === route.href ? "text-white" : route.color
                            )} />
                            {route.label}
                            {pathname === route.href && (
                                <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full -ml-4" />
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="px-6 py-6 border-t border-[#30363d] bg-[#0d1117]">
                <button
                    onClick={() => signOut()}
                    className="flex items-center w-full px-4 py-3 text-sm font-bold text-[#8b949e] hover:text-[#ff7b72] hover:bg-[#161b22] rounded-2xl transition-all duration-300"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
