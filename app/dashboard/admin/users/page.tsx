import { getUsers, updateUserRole, toggleUserStatus } from "./actions"
import { User } from "@prisma/client"
import { Role } from "@/types/enums"

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
    const users = await getUsers()

    return (
        <div className="p-8 space-y-8 bg-[#0b0e14] min-h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tight text-white font-heading underline decoration-indigo-500/30 decoration-8 underline-offset-4">User Authority</h1>
                    <p className="text-[#8b949e] text-sm font-medium">Coordinate system permissions and oversee user lifecycles.</p>
                </div>
                <div className="bg-[#161b22] border border-[#30363d] px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-[#8b949e] uppercase tracking-widest">Active Entities: </span>
                    <span className="text-white font-black text-sm">{users.length}</span>
                </div>
            </div>

            <div className="bg-[#0d1117] rounded-[2.5rem] border border-[#30363d] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#30363d]">
                        <thead className="bg-[#161b22]">
                            <tr>
                                <th className="px-8 py-6 text-left text-[11px] font-black text-[#8b949e] uppercase tracking-[0.2em]">Profile Identity</th>
                                <th className="px-8 py-6 text-left text-[11px] font-black text-[#8b949e] uppercase tracking-[0.2em]">Access Level</th>
                                <th className="px-8 py-6 text-left text-[11px] font-black text-[#8b949e] uppercase tracking-[0.2em]">Presence</th>
                                <th className="px-8 py-6 text-right text-[11px] font-black text-[#8b949e] uppercase tracking-[0.2em]">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#30363d]">
                            {users.map((user: User) => (
                                <tr key={user.id} className="hover:bg-[#1c2128]/50 transition-all duration-300 group">
                                    <td className="px-8 py-7 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white font-black text-sm shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                                {(user.name || user.email || "?")[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-[15px] font-black text-white tracking-tight leading-none">{user.name || "UNNAMED"}</div>
                                                <div className="text-xs text-[#8b949e] font-medium mt-1.5">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 whitespace-nowrap">
                                        <span className={`px-4 py-1.5 inline-flex text-[10px] font-black rounded-xl border tracking-[0.15em] ${user.role === 'SUPER_ADMIN' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                                                user.role === 'ADMIN' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' :
                                                    user.role === 'INSTRUCTOR' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                                        'bg-[#161b22] text-[#8b949e] border-[#30363d]'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-7 whitespace-nowrap">
                                        {user.isActive ? (
                                            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-green-500/10 border border-green-500/30">
                                                <div className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Running</span>
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Halted</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-7 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                            <form action={async () => {
                                                "use server"
                                                await toggleUserStatus(user.id, !user.isActive)
                                            }}>
                                                <button className={`p-2.5 rounded-xl border transition-all ${user.isActive ? 'hover:bg-red-500/10 border-red-500/20 text-red-500' : 'hover:bg-green-500/10 border-green-500/20 text-green-500'
                                                    }`}>
                                                    <ShieldAlert className="h-4.5 w-4.5" />
                                                </button>
                                            </form>
                                            <form action={async () => {
                                                "use server"
                                                let nextRole: Role = 'STUDENT'
                                                if (user.role === 'STUDENT') nextRole = 'INSTRUCTOR'
                                                else if (user.role === 'INSTRUCTOR') nextRole = 'ADMIN'
                                                await updateUserRole(user.id, nextRole)
                                            }}>
                                                <button className="p-2.5 rounded-xl border border-[#30363d] text-[#8b949e] hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all">
                                                    <RotateCw className="h-4.5 w-4.5" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

import { RotateCw, ShieldAlert, UserCog } from "lucide-react"
