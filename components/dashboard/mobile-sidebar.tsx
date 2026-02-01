"use client"

import { Menu } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useState } from "react"

export function MobileSidebar({ role }: { role?: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                <Menu />
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
                    <div className="fixed inset-y-0 left-0 w-72 bg-[#111827]">
                        <Sidebar role={role} />
                    </div>
                </div>
            )}
        </div>
    )
}
