import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="p-8 space-y-8 bg-[#0b0e14] min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-48 bg-[#161b22]" />
                    <Skeleton className="h-4 w-64 bg-[#0d1117]" />
                </div>
                <Skeleton className="h-12 w-32 rounded-2xl bg-[#161b22]" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="p-6 bg-[#0d1117] rounded-3xl border border-[#30363d] space-y-4">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-20 bg-[#161b22]" />
                            <Skeleton className="h-8 w-8 rounded-xl bg-[#161b22]" />
                        </div>
                        <Skeleton className="h-10 w-16 bg-[#161b22]" />
                        <Skeleton className="h-2 w-full bg-[#161b22]" />
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-1 lg:col-span-4 bg-[#0d1117] p-8 rounded-3xl border border-[#30363d] space-y-8">
                    <Skeleton className="h-8 w-48 bg-[#161b22]" />
                    <div className="space-y-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex justify-between">
                                    <Skeleton className="h-3 w-24 bg-[#161b22]" />
                                    <Skeleton className="h-5 w-10 bg-[#161b22]" />
                                </div>
                                <Skeleton className="h-3 w-full bg-[#161b22] rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-3 bg-[#0d1117] p-8 rounded-3xl border border-[#30363d] space-y-6">
                    <Skeleton className="h-8 w-48 bg-[#161b22]" />
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-full rounded-2xl bg-[#161b22]" />
                        <Skeleton className="h-16 w-full rounded-2xl bg-[#161b22]" />
                    </div>
                    <Skeleton className="h-32 w-full rounded-2xl bg-[#161b22] mt-8" />
                </div>
            </div>
        </div>
    )
}
