import { db } from "@/lib/db"
import { auth } from "@/auth"
import { createCourse } from "./actions"
import { Course } from "@prisma/client"
import { CourseLevel, CourseStatus } from "@/types/enums"
import Link from "next/link"
import { PlusCircle, Search, BookOpen, Pencil } from "lucide-react"
import { getYouTubeThumbnail } from "@/lib/youtube"

export const dynamic = 'force-dynamic'

type CourseWithUser = Course & {
    createdBy: {
        name: string | null
    }
}

export default async function CoursesPage({
    searchParams
}: {
    searchParams: Promise<{ title?: string, status?: string, level?: string, progress?: string }>
}) {
    const session = await auth()
    const userRole = session?.user?.role
    const params = await searchParams

    const isStudent = userRole === 'STUDENT'

    // Fetch user progress if student
    const userProgress = (isStudent && session?.user?.id) ? await db.userProgress.findMany({
        where: { userId: session.user.id }
    }) : []

    if (isStudent && session?.user?.id) {
        console.log(`[CoursesPage] Loaded ${userProgress.length} progress records for user ${session.user.id}`)
    }

    const courses = await db.course.findMany({
        where: {
            AND: [
                isStudent ? { status: 'PUBLISHED' } : (userRole === 'INSTRUCTOR' ? { createdById: session?.user?.id || "" } : {}),
                params.title ? { title: { contains: params.title } } : {},
                params.status ? { status: params.status as CourseStatus } : {},
                params.level ? { level: params.level as CourseLevel } : {},
            ]
        },
        include: {
            createdBy: {
                select: { name: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    // Filter and Sort for students
    let filteredCourses = [...courses]

    if (isStudent) {
        const progressMap = new Map(userProgress.map(p => [p.courseId, p]))

        if (params.progress === 'CURSANDO') {
            filteredCourses = courses.filter(c => progressMap.has(c.id) && !progressMap.get(c.id)?.isCompleted)
        } else if (params.progress === 'TERMINADOS') {
            filteredCourses = courses.filter(c => progressMap.get(c.id)?.isCompleted)
        } else {
            // "Todos" - show everything: in progress first, then available, then completed
            const inProgress = courses.filter(c => progressMap.has(c.id) && !progressMap.get(c.id)?.isCompleted)
            const available = courses.filter(c => !progressMap.has(c.id))
            const completed = courses.filter(c => progressMap.get(c.id)?.isCompleted)
            filteredCourses = [...inProgress, ...available, ...completed]
        }
    }

    return (
        <div className="p-8 space-y-8 bg-[#0b0e14] min-h-full text-[#c9d1d9]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight text-white font-heading underline decoration-blue-600/30 decoration-8 underline-offset-8 uppercase">Course Library</h1>
                    <p className="text-[#8b949e] text-sm font-medium">Coordinate and expand academic modules across the global directory.</p>
                </div>
                {!isStudent && (
                    <form action={createCourse}>
                        <button type="submit" className="flex items-center bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black hover:bg-blue-700 w-full md:w-auto justify-center transition shadow-xl shadow-blue-500/20 active:scale-95 uppercase tracking-[0.2em] text-[10px]">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Launch Module
                        </button>
                    </form>
                )}
            </div>

            {/* Search and Filters */}
            <form method="get" className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-[#0d1117] p-6 rounded-[2.5rem] border border-[#30363d] shadow-2xl">
                <div className="relative col-span-1 md:col-span-2 lg:col-span-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#484f58]" />
                    <input
                        name="title"
                        placeholder="Search curriculum by keyword..."
                        defaultValue={params.title}
                        className="w-full pl-12 pr-4 py-4 border border-[#30363d] bg-[#161b22] text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold placeholder:text-[#484f58] text-sm"
                    />
                </div>
                {isStudent && (
                    <select name="progress" defaultValue={params.progress || "TODOS"} className="p-4 border border-[#30363d] bg-[#161b22] text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-black text-[10px] uppercase tracking-widest cursor-pointer appearance-none">
                        <option value="TODOS">Filtro: Todos</option>
                        <option value="CURSANDO">Filtro: Cursando</option>
                        <option value="TERMINADOS">Filtro: Terminados</option>
                    </select>
                )}
                {!isStudent && (
                    <select name="status" defaultValue={params.status} className="p-4 border border-[#30363d] bg-[#161b22] text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-black text-[10px] uppercase tracking-widest cursor-pointer appearance-none">
                        <option value="">Status: All</option>
                        <option value="DRAFT">DRAFT</option>
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                )}
                <select name="level" defaultValue={params.level} className="p-4 border border-[#30363d] bg-[#161b22] text-white rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-black text-[10px] uppercase tracking-widest cursor-pointer appearance-none">
                    <option value="">Level: All</option>
                    <option value="BEGINNER">BEGINNER</option>
                    <option value="INTERMEDIATE">INTERMEDIATE</option>
                    <option value="ADVANCED">ADVANCED</option>
                </select>
                <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-blue-600/10 text-blue-400 border border-blue-500/20 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition active:scale-95">
                        Filter
                    </button>
                    <Link href="/dashboard/courses" className="flex items-center justify-center aspect-square bg-[#1c2128] border border-[#30363d] rounded-2xl text-[#484f58] hover:text-white transition">
                        <Search className="h-4 w-4" />
                    </Link>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredCourses.map((course: CourseWithUser) => {
                    const progress = isStudent ? userProgress.find((p) => p.courseId === course.id) : null;
                    const isCompleted = progress?.isCompleted;
                    const isStarted = !!progress;

                    let statusLabel = "Disponible";
                    let statusColor = "bg-blue-500/20 text-blue-400 border-blue-500/40";

                    if (isCompleted) {
                        statusLabel = "Terminado";
                        statusColor = "bg-green-500/20 text-green-400 border-green-500/40";
                    } else if (isStarted) {
                        statusLabel = `Cursando`;
                        statusColor = "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
                    }

                    return (
                        <Link
                            key={course.id}
                            href={isStudent ? `/dashboard/courses/${course.id}/preview` : `/dashboard/courses/${course.id}`}
                            className="group border border-[#30363d] rounded-[3rem] overflow-hidden bg-[#0d1117] shadow-2xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.7)] hover:border-blue-500/40 transition-all duration-700 transform hover:-translate-y-3 flex flex-col"
                        >
                            <div className="h-56 bg-[#161b22] flex items-center justify-center relative overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                {course.coverImage || getYouTubeThumbnail(course.videoUrl) ? (
                                    <img
                                        src={course.coverImage || getYouTubeThumbnail(course.videoUrl) || ''}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 z-10"
                                    />
                                ) : (
                                    <BookOpen className="h-24 w-24 text-[#21262d] group-hover:scale-125 transition-all duration-1000 group-hover:text-blue-500/20 z-10" />
                                )}
                                <div className="absolute top-8 right-8 z-20">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-2xl border backdrop-blur-2xl shadow-2xl ${isStudent ? statusColor : (
                                        course.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                                            course.status === 'DRAFT' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                                                'bg-red-500/20 text-red-400 border-red-500/40'
                                    )
                                        }`}>
                                        {isStudent ? statusLabel : course.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-black text-2xl text-white leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{course.title}</h3>
                                    <p className="text-[15px] text-[#8b949e] mt-5 line-clamp-3 min-h-[4.5rem] leading-relaxed font-medium">
                                        {course.shortDescription || "Accelerate professional growth through high-impact, industry-standard curriculum modules."}
                                    </p>
                                </div>

                                <div className="space-y-8 pt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-2xl bg-[#1c2128] text-blue-400 border border-[#30363d] shadow-lg">
                                                {course.level}
                                            </span>
                                        </div>
                                        {isStudent && isStarted && !isCompleted && (
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-24 bg-[#1c2128] rounded-full overflow-hidden border border-[#30363d]">
                                                    <div className="h-full bg-yellow-500/50 w-full animate-pulse" />
                                                </div>
                                                <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                                                    {Math.floor(progress.playbackTime / 60)}m {Math.floor(progress.playbackTime % 60)}s
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-8 border-t border-[#30363d]">
                                        <div className="flex items-center gap-4">
                                            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-sm font-black text-white shadow-2xl ring-2 ring-[#0d1117]">
                                                {(course.createdBy?.name || "U")[0]}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.2em]">Curator</p>
                                                <p className="text-sm text-white font-black tracking-tight mt-0.5">{course.createdBy?.name || "Professional"}</p>
                                            </div>
                                        </div>
                                        {!isStudent && (
                                            <div className="bg-[#161b22] p-3 rounded-2xl border border-[#30363d] text-[#8b949e] group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all shadow-xl">
                                                <Pencil className="h-5 w-5" />
                                            </div>
                                        )}
                                        {isStudent && (
                                            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform">
                                                <BookOpen className="h-5 w-5" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {courses.length === 0 && (
                <div className="flex flex-col items-center justify-center py-48 bg-[#0d1117] rounded-[4rem] border-2 border-dashed border-[#30363d] shadow-inner">
                    <div className="h-28 w-28 bg-[#161b22] rounded-[2.5rem] flex items-center justify-center mb-10 border border-[#30363d] shadow-2xl">
                        <Search className="h-12 w-12 text-[#484f58]" />
                    </div>
                    <p className="text-white font-black text-4xl tracking-tight uppercase">Directory Empty</p>
                    <p className="text-[#8b949e] mt-4 font-bold text-xl text-center">Reset search filters to view the global curriculum database.</p>
                    <Link href="/dashboard/courses" className="text-blue-500 hover:text-white mt-12 text-xs font-black tracking-[0.4em] uppercase border-b-4 border-blue-500/30 pb-3 hover:border-blue-500 transition-all">Clear Active Filters</Link>
                </div>
            )}
        </div>
    )
}
