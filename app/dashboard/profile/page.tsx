import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { User, Mail, Shield, Activity, Calendar, Fingerprint, LogOut } from "lucide-react"

export default async function ProfilePage() {
    const session = await auth()
    if (!session) redirect("/login")

    const user = session.user

    return (
        <div className="p-8 lg:p-12 min-h-screen bg-[#0b0e14] text-[#c9d1d9]">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tight text-white font-heading uppercase">Security Profile</h1>
                    <p className="text-[#8b949e] text-lg font-medium">Verify credentials and manage platform access parameters.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Identity Overview Card */}
                    <div className="lg:col-span-1 bg-[#0d1117] rounded-[3rem] border border-[#30363d] p-10 flex flex-col items-center text-center space-y-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent z-0" />

                        <div className="relative z-10">
                            <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white text-5xl font-black shadow-[0_20px_50px_rgba(37,99,235,0.4)] ring-4 ring-[#0b0e14] group-hover:scale-105 transition-transform duration-500">
                                {(user.name || user.email || "?")[0].toUpperCase()}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 h-8 w-8 rounded-full border-4 border-[#0d1117] shadow-lg shadow-green-500/20" />
                        </div>

                        <div className="relative z-10 space-y-2">
                            <h2 className="text-3xl font-black text-white tracking-tight uppercase">{user.name || "System User"}</h2>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-4 py-2 rounded-2xl border border-blue-500/20">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="w-full pt-8 border-t border-[#30363d] relative z-10">
                            <p className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.3em] mb-4">Access Status</p>
                            <div className="flex items-center justify-center gap-2 text-green-400 font-black text-sm uppercase tracking-widest">
                                <Activity className="h-4 w-4" />
                                Verified Active
                            </div>
                        </div>
                    </div>

                    {/* Technical Parameters Card */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-[#0d1117] rounded-[3rem] border border-[#30363d] shadow-2xl overflow-hidden">
                            <div className="p-10 space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-[#161b22] rounded-xl flex items-center justify-center border border-[#30363d]">
                                        <Fingerprint className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <h3 className="font-black text-white text-xl uppercase tracking-tight">Technical Identification</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Mail className="h-3 w-3" /> External Email
                                        </p>
                                        <p className="text-lg font-bold text-white tracking-tight">{user.email}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Shield className="h-3 w-3" /> Security Clearance
                                        </p>
                                        <p className="text-lg font-bold text-white tracking-tight">Level 4.0 - Full UI Access</p>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Calendar className="h-3 w-3" /> Last Handshake
                                        </p>
                                        <p className="text-lg font-bold text-white tracking-tight">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Activity className="h-3 w-3" /> System Uptime
                                        </p>
                                        <p className="text-lg font-bold text-green-500 tracking-tight">99.9% Operational</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-10 py-8 bg-[#161b22] border-t border-[#30363d] flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <button className="text-[10px] font-black text-blue-500 hover:text-white transition uppercase tracking-[0.4em] border-b-2 border-blue-500/20 pb-1 hover:border-blue-500">
                                    Update Security Credentials
                                </button>
                                <button className="flex items-center gap-2 text-[10px] font-black text-[#ef4444] hover:text-white transition uppercase tracking-[0.4em] opacity-80 hover:opacity-100">
                                    <LogOut className="h-4 w-4" />
                                    Deactivate Session
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-blue-500/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                <Shield className="h-32 w-32 text-blue-500" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <p className="text-white font-black text-lg tracking-tight uppercase">Multi-Factor Authentication</p>
                                    <p className="text-[#8b949e] text-sm mt-1 font-medium italic">Requirement status: <span className="text-emerald-500 font-black not-italic ml-2 uppercase tracking-widest">ACTIVE PROTECTED</span></p>
                                </div>
                                <button className="bg-white text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                                    Configure MFA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
