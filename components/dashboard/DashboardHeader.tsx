"use client"

import { Menu, Bell, Search, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { ProfileData } from "@/Redux/features/settings/profileApi"

interface DashboardHeaderProps {
    setIsMobileMenuOpen: (open: boolean) => void
    user: ProfileData | undefined
}

export function DashboardHeader({ setIsMobileMenuOpen, user }: DashboardHeaderProps) {
    const pathname = usePathname()

    // Get page title from pathname
    const getPageTitle = (path: string) => {
        const segment = path.split("/").pop() || "Dashboard"
        return segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ")
    }

    return (
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-10 transition-all">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:bg-blue-50 rounded-xl"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="h-8 w-8 font-bold text-blue-600" />
                </Button>
                <div>

                    <p className="text-[10px] md:text-xs text-gray-400 font-medium hidden md:block uppercase tracking-widest">
                        Welcome back to your workspace
                    </p>
                    <h1 className="text-xl md:text-2xl font-black text-blue-900 tracking-tight">
                        {getPageTitle(pathname)}
                    </h1>
                </div>
            </div>

            {/* Actions & User Profile */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-2xl bg-blue-50 hover:bg-blue-100 relative group transition-all duration-300 shadow-sm border border-blue-100">
                    <Bell className="w-8 h-8 text-blue-600 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-sm"></span>
                    </span>
                </Button>

                <div className="flex items-center gap-3 pl-2 border-l border-gray-100">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0 bg-gray-50">
                        <Image
                            src={user?.profileImage || "/avatar.png"}
                            alt={user?.fullName || "User"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center min-w-0 pr-2">
                        <p className="font-bold text-xs md:text-sm text-blue-900 truncate uppercase tracking-tight leading-tight">
                            {user?.fullName || "User"}
                        </p>
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest leading-tight mt-0.5">
                            {user?.role || "Member"}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}
