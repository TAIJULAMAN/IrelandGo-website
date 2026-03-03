"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
    LogOut,
    User as UserIcon,
    MapPin,
    Bell,
    LayoutDashboard,
    ChevronRight,
    ShieldCheck,
    LifeBuoy,
    CreditCard
} from "lucide-react"
import { ProfileData } from "@/Redux/features/settings/profileApi"

interface UserSidebarProps {
    user: ProfileData | undefined
    setIsMobileMenuOpen?: (open: boolean) => void
    setIsLogoutDialogOpen: (open: boolean) => void
}

export function UserSidebar({ user, setIsMobileMenuOpen, setIsLogoutDialogOpen }: UserSidebarProps) {
    const pathname = usePathname()

    const navLinks = [
        {
            href: "/user",
            icon: <LayoutDashboard className="h-4 w-4" />,
            label: "Dashboard"
        },
        {
            href: "/user/bookings",
            icon: <MapPin className="h-4 w-4" />,
            label: "My Bookings"
        },
        {
            href: "/user/profile",
            icon: <UserIcon className="h-4 w-4" />,
            label: "Profile"
        },
        {
            href: "/user/payment-methods",
            icon: <CreditCard className="h-4 w-4" />,
            label: "Payments",
        },
        {
            href: "/user/notifications",
            icon: <Bell className="h-4 w-4" />,
            label: "Notifications",
        },
        {
            href: "/user/support",
            icon: <LifeBuoy className="h-4 w-4" />,
            label: "Help & Support"
        },
    ]

    return (
        <div className="h-full flex flex-col bg-white border-r border-gray-100 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.02)]">
            {/* Branding */}
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 transition-transform group-hover:scale-105 duration-300">
                        <Image src="/logo.png" alt="IrelandGo" fill className="object-contain" />
                    </div>
                    <span className="text-xl font-extrabold text-blue-900 tracking-tight">IrelandGo</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pt-2">
                {navLinks.map((link) => {
                    const isRoot = link.href === '/user'
                    const isActive = isRoot
                        ? pathname === '/user'
                        : pathname === link.href || pathname.startsWith(`${link.href}/`)

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen?.(false)}
                            className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all duration-200 ${isActive
                                ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600 shadow-sm shadow-blue-50/50 translate-x-1'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-3.5">
                                <span className={`${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {link.icon}
                                </span>
                                <span>{link.label}</span>
                            </div>
                            {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 mt-auto">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <button
                        className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white hover:bg-red-50 text-red-600 font-bold text-xs border border-gray-200 hover:border-red-100 transition-all active:scale-[0.98] shadow-sm"
                        onClick={() => setIsLogoutDialogOpen(true)}
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
