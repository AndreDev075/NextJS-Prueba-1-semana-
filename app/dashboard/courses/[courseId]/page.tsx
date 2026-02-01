import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { updateCourse, deleteCourse } from "../actions"
import { ArrowLeft, Trash2, Save, FileText, Layers, Activity } from "lucide-react"
import Link from "next/link"

const COURSE_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const
const COURSE_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const

export default async function CourseIdPage({ params }: { params: { courseId: string } }) {
    const { courseId } = await params
    const session = await auth()

    if (!session) redirect("/login")

    const course = await db.course.findUnique({
        where: { id: courseId }
    })

    if (!course) {
        return (
            <div className="p-8 bg-[#0b0e14] min-h-screen flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                    <p className="text-4xl font-black opacity-20 uppercase tracking-tighter">404 NOT FOUND</p>
                    <p className="text-[#8b949e] font-bold">The requested curriculum node does not exist.</p>
                    <Link href="/dashboard/courses" className="inline-block mt-4 text-blue-500 hover:underline">Return to Directory</Link>
                </div>
            </div>
        )
    }

    // Basic permission check
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN' && course.createdById !== session.user.id) {
        return (
            <div className="p-8 bg-[#0b0e14] min-h-screen flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                    <p className="text-4xl font-black text-red-500/50 uppercase tracking-tighter">ACCESS DENIED</p>
                    <p className="text-[#8b949e] font-bold">Unauthorized signature detected for this resource.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 lg:p-12 min-h-screen bg-[#0b0e14] text-[#c9d1d9]">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link href="/dashboard/courses" className="inline-flex items-center text-[10px] font-black text-[#484f58] hover:text-blue-500 transition uppercase tracking-[0.3em] group">
                            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Return to Directory
                        </Link>
                        <h1 className="text-5xl font-black tracking-tight text-white font-heading uppercase">Modify Module</h1>
                        <p className="text-[#8b949e] text-lg font-medium">Updating curriculum node: <span className="text-blue-400 font-bold">{course.id.slice(0, 8)}</span></p>
                    </div>

                    <form action={async () => {
                        "use server"
                        await deleteCourse(course.id)
                        redirect("/dashboard/courses")
                    }}>
                        <button className="flex items-center gap-2 bg-[#161b22] border border-red-500/20 text-red-500 px-6 py-3.5 rounded-2xl font-black hover:bg-red-500 hover:text-white transition shadow-xl active:scale-95 uppercase tracking-[0.2em] text-[10px]">
                            <Trash2 className="h-4 w-4" />
                            Decommission Course
                        </button>
                    </form>
                </div>

                <form action={updateCourse.bind(null, course.id)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#0d1117] p-10 rounded-[3rem] border border-[#30363d] shadow-2xl space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-[#161b22] rounded-xl flex items-center justify-center border border-[#30363d]">
                                    <FileText className="h-5 w-5 text-blue-500" />
                                </div>
                                <h3 className="font-black text-white text-xl uppercase tracking-tight">Core Curriculum Data</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.3em] ml-1 group-focus-within:text-blue-500 transition-colors">Course Primary Title</label>
                                    <input
                                        name="title"
                                        defaultValue={course.title}
                                        className="w-full bg-[#161b22] border border-[#30363d] p-5 text-white rounded-2xl text-lg font-bold placeholder:text-[#484f58] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.3em] ml-1 group-focus-within:text-blue-500 transition-colors">Functional Description</label>
                                    <textarea
                                        name="description"
                                        defaultValue={course.description || ""}
                                        className="w-full bg-[#161b22] border border-[#30363d] p-5 text-white rounded-2xl text-sm font-medium placeholder:text-[#484f58] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all h-48 resize-none"
                                        placeholder="Detailed curriculum breakdown..."
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.3em] ml-1 group-focus-within:text-blue-500 transition-colors">Course Video URL (YouTube)</label>
                                    <input
                                        name="videoUrl"
                                        defaultValue={course.videoUrl || ""}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="w-full bg-[#161b22] border border-[#30363d] p-5 text-white rounded-2xl text-sm font-medium placeholder:text-[#484f58] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-[#0d1117] p-10 rounded-[3rem] border border-[#30363d] shadow-2xl space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-[#161b22] rounded-xl flex items-center justify-center border border-[#30363d]">
                                    <Layers className="h-5 w-5 text-blue-500" />
                                </div>
                                <h3 className="font-black text-white text-xl uppercase tracking-tight">System Properties</h3>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.3em] ml-1 group-focus-within:text-blue-500 transition-colors">Complexity Level</label>
                                    <select name="level" defaultValue={course.level} className="w-full bg-[#161b22] border border-[#30363d] p-5 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer appearance-none">
                                        {COURSE_LEVELS.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.3em] ml-1 group-focus-within:text-blue-500 transition-colors">Deployment Status</label>
                                    <select name="status" defaultValue={course.status} className="w-full bg-[#161b22] border border-[#30363d] p-5 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer appearance-none">
                                        {COURSE_STATUSES.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-[#30363d]">
                                <button type="submit" className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white p-5 rounded-2xl font-black hover:bg-blue-700 transition shadow-[0_20px_40px_rgba(37,99,235,0.3)] active:scale-95 uppercase tracking-[0.3em] text-[10px]">
                                    <Save className="h-5 w-5" />
                                    Push Updates
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600/10 to-indigo-800/10 border border-blue-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Activity className="h-5 w-5 text-blue-500" />
                                    <p className="text-white font-black text-sm uppercase tracking-widest">Live Preview</p>
                                </div>
                                <p className="text-[#8b949e] text-xs font-medium italic">Changes published to this curriculum node will propagate across all enrolled student interfaces immediately.</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
