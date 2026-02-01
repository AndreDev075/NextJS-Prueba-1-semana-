import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { loginAction } from "./actions"
import { ShieldCheck, Fingerprint, Lock } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
    const session = await auth()
    if (session?.user) {
        redirect('/dashboard')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#0b0e14] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-lg p-12 space-y-10 bg-[#0d1117] rounded-[3rem] border border-[#30363d] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative z-10 transition-all">
                <div className="space-y-4 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-2xl mb-2 border border-blue-500/20">
                        <ShieldCheck className="h-10 w-10 text-blue-500" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase font-heading">LMS <span className="text-blue-500">Core</span></h1>
                    <p className="text-[#8b949e] text-sm font-medium tracking-widest uppercase">Central Intelligence Protocol</p>
                </div>

                <form action={loginAction} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.3em] ml-1 flex items-center gap-2 group-focus-within:text-blue-500 transition-colors">
                                <Fingerprint className="h-3.5 w-3.5" /> Identity Access
                            </label>
                            <input
                                name="email"
                                type="email"
                                defaultValue="admin1@lms.com"
                                className="w-full bg-[#161b22] border border-[#30363d] p-4 text-white rounded-2xl text-sm font-bold placeholder:text-[#484f58] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-inner"
                                placeholder="Enter system email..."
                                required
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black text-[#484f58] uppercase tracking-[0.3em] ml-1 flex items-center gap-2 group-focus-within:text-blue-500 transition-colors">
                                <Lock className="h-3.5 w-3.5" /> Security Key
                            </label>
                            <input
                                name="password"
                                type="password"
                                defaultValue="password123"
                                className="w-full bg-[#161b22] border border-[#30363d] p-4 text-white rounded-2xl text-sm font-bold placeholder:text-[#484f58] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-inner"
                                placeholder="Signature required..."
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full py-5 text-[10px] font-black text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.5)] active:scale-95 uppercase tracking-[0.4em]">
                        Initialize Session
                    </button>
                </form>

                <div className="pt-10 border-t border-[#30363d] space-y-4">
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-[10px] font-black text-[#484f58] uppercase tracking-widest">Available Access Nodes</p>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="p-3 bg-[#161b22] rounded-xl border border-[#30363d] text-center">
                                <p className="text-[9px] font-black text-[#8b949e] uppercase tracking-tighter">Root Admin</p>
                                <p className="text-[10px] font-bold text-blue-400 mt-1">admin1@lms.com</p>
                            </div>
                            <div className="p-3 bg-[#161b22] rounded-xl border border-[#30363d] text-center">
                                <p className="text-[9px] font-black text-[#8b949e] uppercase tracking-tighter">Student Node</p>
                                <p className="text-[10px] font-bold text-emerald-400 mt-1">student1@lms.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-[#484f58] text-[10px] font-black tracking-[0.5em] uppercase pointer-events-none">
                Encryption Protocol Active
            </div>
        </div>
    )
}
