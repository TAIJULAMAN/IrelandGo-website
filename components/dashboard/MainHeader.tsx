"use client"

import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ProfileData } from "@/Redux/features/settings/profileApi"
import Link from "next/link"
import { useGetMyNotificationsQuery } from "@/Redux/features/notification/notificationApi"

interface DashboardHeaderProps {
    setIsMobileMenuOpen: (open: boolean) => void
    user: ProfileData | undefined
}

export function MainHeader({ setIsMobileMenuOpen, user }: DashboardHeaderProps) {
    const { data: response } = useGetMyNotificationsQuery();
    const notifications = response?.data || [];
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-5 md:px-5 sticky top-0 z-30 transition-all">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:bg-slate-100 rounded-full text-slate-700"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
                <div>
                    <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight hidden md:block">
                        Dashboard
                    </h1>
                    <p className="text-[11px] text-slate-500 font-medium hidden md:block uppercase tracking-widest mt-0.5">
                        Welcome back, {user?.fullName?.split(' ')[0] || 'there'}!
                    </p>
                </div>
            </div>

            {/* Actions & User Profile */}
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 relative group transition-all duration-300 shadow-sm border-slate-200">
                    <Link href="/dashboard/notifications">
                        <Bell className="w-4 h-4 text-slate-600 transition-transform duration-300 group-hover:rotate-12" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-sm flex items-center justify-center">
                                    <span className="text-[9px] text-white font-bold leading-none">{unreadCount}</span>
                                </span>
                            </span>
                        )}
                    </Link>
                </Button>

                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

                <Link href="/dashboard/profile" className="flex items-center gap-3 group cursor-pointer">
                    <div className="flex flex-col items-end justify-center min-w-0 hidden sm:flex">
                        <p className="font-bold text-sm text-slate-900 truncate tracking-tight leading-none">
                            {user?.fullName || "User"}
                        </p>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1.5 leading-none">
                            {user?.role || "Member"}
                        </p>
                    </div>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100 flex-shrink-0 bg-slate-50 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src={user?.profileImage || "/avatar.png"}
                            alt={user?.fullName || "User"}
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>
            </div>
        </header>
    )
}
