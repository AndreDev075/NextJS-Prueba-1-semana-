import { db } from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Play, User, BookOpen, Clock, BarChart } from "lucide-react"
import ProgressDisplay from "./ProgressDisplay"
import { getYouTubeThumbnail } from "@/lib/youtube"

// Helper function to format seconds to MM:SS
function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
}

export default async function CoursePreviewPage({ params }: { params: { courseId: string } }) {
    const { courseId } = await params
    const session = await auth()
    if (!session) redirect("/login")

    const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
            createdBy: {
                select: { name: true }
            },
            progress: {
                where: { userId: session.user.id }
            }
        }
    })

    if (!course) redirect("/dashboard/courses")

    const progress = course.progress[0]
    const isStarted = !!progress
    const isCompleted = progress?.isCompleted

    // Get playback time for display
    const playbackTime = progress?.playbackTime || 0

    return (
        <div className="p-8 lg:p-12 min-h-screen bg-[#0b0e14] text-[#c9d1d9]">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/dashboard/courses" className="inline-flex items-center text-[10px] font-black text-[#484f58] hover:text-blue-500 transition uppercase tracking-[0.3em] group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Library
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="aspect-video bg-[#0d1117] rounded-[3rem] border border-[#30363d] overflow-hidden relative group shadow-2xl">
                            {course.coverImage || getYouTubeThumbnail(course.videoUrl) ? (
                                <img
                                    src={course.coverImage || getYouTubeThumbnail(course.videoUrl) || ''}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <BookOpen className="h-32 w-32 text-[#1c2128]" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent opacity-60" />
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl font-black text-white uppercase tracking-tight leading-tight">{course.title}</h1>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 rounded-2xl bg-[#1c2128] border border-[#30363d] text-blue-400 text-[10px] font-black uppercase tracking-widest">{course.level}</span>
                                <span className="px-4 py-2 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <User className="h-3 w-3" />
                                    {course.createdBy?.name || "Professional"}
                                </span>
                            </div>
                            <p className="text-xl text-[#8b949e] font-medium leading-relaxed">
                                {course.description || course.shortDescription || "Accelerate professional growth through high-impact, industry-standard curriculum modules."}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-[#0d1117] border border-[#30363d] rounded-[3rem] p-10 shadow-2xl space-y-10">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.3em]">Module Status</p>
                                {isCompleted ? (
                                    <div className="bg-green-500/10 border border-green-500/30 text-green-500 p-6 rounded-3xl text-center">
                                        <p className="font-black text-xs uppercase tracking-widest">Completed</p>
                                    </div>
                                ) : isStarted ? (
                                    <ProgressDisplay videoUrl={course.videoUrl} playbackTime={playbackTime} />
                                ) : (
                                    <div className="bg-blue-600/10 border border-blue-500/30 text-blue-500 p-6 rounded-3xl text-center">
                                        <p className="font-black text-xs uppercase tracking-widest">Available</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {course.videoUrl ? (
                                    <Link
                                        href={`/dashboard/courses/${course.id}/learn`}
                                        className="w-full flex items-center justify-center gap-4 bg-blue-600 text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition shadow-[0_20px_40px_rgba(37,99,235,0.3)] active:scale-95"
                                    >
                                        <Play className="h-5 w-5 fill-current" />
                                        {isStarted ? "Resume Learning" : "Launch Module"}
                                    </Link>
                                ) : (
                                    <div className="bg-[#1c2128] border border-[#30363d] p-6 rounded-[2rem] text-center space-y-2 opacity-50">
                                        <p className="font-black text-[10px] uppercase tracking-widest text-[#484f58]">Module Unavailable</p>
                                        <p className="text-xs text-[#8b949e]">Video curriculum is currently being prepared.</p>
                                    </div>
                                )}

                                <button className="w-full p-6 rounded-[2rem] border border-[#30363d] text-[#8b949e] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#1c2128] transition">
                                    Save to Library
                                </button>
                            </div>

                            <div className="pt-10 border-t border-[#30363d] space-y-6">
                                <div className="flex items-center gap-4 text-[#8b949e]">
                                    <Clock className="h-5 w-5" />
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#484f58]">Duration</p>
                                        <p className="text-sm font-bold text-white">Full Access</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-[#8b949e]">
                                    <BarChart className="h-5 w-5" />
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#484f58]">Difficulty</p>
                                        <p className="text-sm font-bold text-white">{course.level}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
