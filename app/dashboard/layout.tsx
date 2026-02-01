import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { auth } from "@/auth"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()
    const role = session?.user?.role

    return (
        <div className="h-full relative bg-[#0b0e14]">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] border-r border-[#30363d]">
                <Sidebar role={role} />
            </div>
            <main className="md:pl-72 h-full min-h-screen">
                <div className="flex items-center p-4 border-b border-[#30363d] md:hidden bg-[#0d1117]">
                    <MobileSidebar role={role} />
                </div>
                <div className="h-full bg-[#0b0e14]">
                    {children}
                </div>
            </main>
        </div>
    )
}
