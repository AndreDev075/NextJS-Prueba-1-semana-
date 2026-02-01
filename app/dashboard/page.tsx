import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Users, BookOpen, UserCheck, Star, ArrowRight, TrendingUp, ShieldCheck } from "lucide-react"

export const dynamic = 'force-dynamic'

async function getMetrics() {
    const [userCount, courseCount, publishedCourseCount, instructorsCount, activeUsers] = await Promise.all([
        db.user.count(),
        db.course.count(),
        db.course.count({ where: { status: 'PUBLISHED' } }),
        db.user.count({ where: { role: 'INSTRUCTOR' } }),
        db.user.count({ where: { isActive: true } })
    ])

    // Mock data for the "Role distribution" visual
    const roles = [
        { name: 'SUPER_ADMIN', count: await db.user.count({ where: { role: 'SUPER_ADMIN' } }), color: 'bg-purple-500' },
        { name: 'ADMIN', count: await db.user.count({ where: { role: 'ADMIN' } }), color: 'bg-indigo-500' },
        { name: 'INSTRUCTOR', count: await db.user.count({ where: { role: 'INSTRUCTOR' } }), color: 'bg-blue-500' },
        { name: 'STUDENT', count: await db.user.count({ where: { role: 'STUDENT' } }), color: 'bg-emerald-500' },
    ]

    return { userCount, courseCount, publishedCourseCount, instructorsCount, activeUsers, roles }
}

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        redirect('/login')
    }

    if (session.user.role === 'STUDENT') {
        redirect('/dashboard/courses')
    }

    const { userCount, courseCount, publishedCourseCount, activeUsers, roles } = await getMetrics()

    return (
        <div className="p-8 space-y-8 bg-[#0b0e14] min-h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black tracking-tight text-white font-heading">Overview</h2>
                    <p className="text-[#8b949e] text-sm font-medium">Welcome back, <span className="text-blue-500 font-bold">{session.user.name || "Administrator"}</span>. System status: <span className="text-green-500">Operational</span></p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/courses" className="flex items-center bg-[#161b22] border border-[#30363d] px-5 py-2.5 rounded-2xl text-sm font-bold text-white shadow-xl hover:bg-[#1c2128] transition-all hover:border-blue-500/50">
                        View Courses
                        <ArrowRight className="h-4 w-4 ml-2 text-blue-500" />
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Metric Card: Total Users */}
                <div className="group p-6 bg-[#0d1117] rounded-3xl border border-[#30363d] hover:border-blue-500/50 transition-all duration-300 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                        <Users className="h-24 w-24 text-white" />
                    </div>
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b949e]">Total Users</div>
                        <div className="p-2 bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform">
                            <Users className="h-4 w-4 text-blue-500" />
                        </div>
                    </div>
                    <div className="mt-2 text-4xl font-black text-white relative z-10">{userCount}</div>
                    <div className="mt-2 flex items-center text-[11px] text-green-500 font-bold relative z-10">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12% vs last month
                    </div>
                </div>

                {/* Metric Card: Active Users */}
                <div className="group p-6 bg-[#0d1117] rounded-3xl border border-[#30363d] hover:border-emerald-500/50 transition-all duration-300 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                        <UserCheck className="h-24 w-24 text-white" />
                    </div>
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b949e]">Active Now</div>
                        <div className="p-2 bg-emerald-500/10 rounded-xl group-hover:scale-110 transition-transform">
                            <UserCheck className="h-4 w-4 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-2 text-4xl font-black text-white relative z-10">{activeUsers}</div>
                    <div className="mt-2 text-[11px] text-[#8b949e] font-bold relative z-10">
                        <span className="text-emerald-500 font-black">LIVE</span> SYSTEM UPTIME
                    </div>
                </div>

                {/* Metric Card: Courses */}
                <div className="group p-6 bg-[#0d1117] rounded-3xl border border-[#30363d] hover:border-violet-500/50 transition-all duration-300 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                        <BookOpen className="h-24 w-24 text-white" />
                    </div>
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b949e]">Curriculums</div>
                        <div className="p-2 bg-violet-500/10 rounded-xl group-hover:scale-110 transition-transform">
                            <BookOpen className="h-4 w-4 text-violet-500" />
                        </div>
                    </div>
                    <div className="mt-2 text-4xl font-black text-white relative z-10">{courseCount}</div>
                    <div className="mt-2 text-[11px] text-[#8b949e] font-bold relative z-10">
                        <span className="text-violet-500">{publishedCourseCount}</span> available modules
                    </div>
                </div>

                {/* Metric Card: Quality */}
                <div className="group p-6 bg-[#0d1117] rounded-3xl border border-[#30363d] hover:border-amber-500/50 transition-all duration-300 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                        <Star className="h-24 w-24 text-white" />
                    </div>
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8b949e]">Platform Rating</div>
                        <div className="p-2 bg-amber-500/10 rounded-xl group-hover:scale-110 transition-transform">
                            <Star className="h-4 w-4 text-amber-500" />
                        </div>
                    </div>
                    <div className="mt-2 text-4xl font-black text-white relative z-10">9.8</div>
                    <div className="mt-2 text-[11px] text-amber-500 font-black uppercase tracking-widest relative z-10">
                        TOP PERFORMANCE
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Horizontal Bar Chart (Users by Role) */}
                <div className="col-span-1 lg:col-span-4 bg-[#0d1117] p-8 rounded-3xl border border-[#30363d] shadow-2xl space-y-8">
                    <div>
                        <h3 className="text-xl font-black text-white tracking-tight">User Base Distribution</h3>
                        <p className="text-[11px] font-bold text-[#8b949e] uppercase tracking-widest mt-1">Real-time organizational analytics</p>
                    </div>

                    <div className="space-y-6">
                        {roles.map((role) => (
                            <div key={role.name} className="space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.15em]">
                                    <span className="text-[#8b949e]">{role.name.replace('_', ' ')}</span>
                                    <span className="text-white bg-[#1c2128] px-2 py-0.5 rounded border border-[#30363d]">{role.count}</span>
                                </div>
                                <div className="h-3 w-full bg-[#161b22] rounded-full overflow-hidden border border-[#30363d]">
                                    <div
                                        className={`h-full ${role.color} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(29,144,255,0.3)]`}
                                        style={{ width: `${(role.count / userCount) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Side */}
                <div className="col-span-1 lg:col-span-3 space-y-6">
                    <div className="bg-[#0d1117] p-8 rounded-3xl border border-[#30363d] shadow-2xl flex flex-col justify-between group h-full">
                        <div>
                            <h3 className="text-xl font-black text-white tracking-tight">System Controls</h3>
                            <p className="text-[11px] font-bold text-[#8b949e] uppercase tracking-widest mt-1 mb-6">Immediate Admin Actions</p>

                            <div className="space-y-3">
                                <Link href="/dashboard/courses" className="flex items-center p-4 rounded-2xl bg-[#161b22] border border-[#30363d] hover:bg-[#1c2128] hover:border-blue-500/50 hover:text-white transition-all font-bold text-sm text-[#c9d1d9] group/btn">
                                    <div className="p-2.5 bg-blue-500/10 rounded-xl mr-4 group-hover/btn:scale-110 transition-transform">
                                        <BookOpen className="h-5 w-5 text-blue-500" />
                                    </div>
                                    Manage Course Content
                                </Link>
                                <Link href="/dashboard/admin/users" className="flex items-center p-4 rounded-2xl bg-[#161b22] border border-[#30363d] hover:bg-[#1c2128] hover:border-indigo-500/50 hover:text-white transition-all font-bold text-sm text-[#c9d1d9] group/btn">
                                    <div className="p-2.5 bg-indigo-500/10 rounded-xl mr-4 group-hover/btn:scale-110 transition-transform">
                                        <Users className="h-5 w-5 text-indigo-500" />
                                    </div>
                                    Review Permissions
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl text-white shadow-2xl overflow-hidden relative group/banner">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black opacity-80 uppercase tracking-[0.2em]">Platform Integrity</p>
                                <p className="text-2xl font-black mt-1 leading-tight">Safe. Fast.<br />Secured.</p>
                            </div>
                            <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">
                                <ShieldCheck className="h-32 w-32" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
