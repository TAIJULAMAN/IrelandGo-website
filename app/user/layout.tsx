"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  LogOut,
  User as UserIcon,
  MapPin,
  Bell,
  LayoutDashboard,
  Grip,
  Menu,
  CreditCard,
  Headphones,
  X,
  Settings,
  ChevronRight,
  ShieldCheck,
  LifeBuoy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/Redux/hooks"
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi"
import { logout as reduxLogout } from "@/Redux/Slice/authSlice"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const token = useAppSelector((state) => state.auth.token)
  const isAuthenticated = !!token

  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  })

  const user = profileData?.data

  const handleLogout = () => {
    dispatch(reduxLogout())
    setIsLogoutDialogOpen(false)
    toast.success("Logged out successfully")
    router.push("/auth/login")
  }

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

  const NavContent = () => (
    <div className="h-full flex flex-col">
      {/* Branding */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-105 duration-300">
            <Image src="/logo.png" alt="IrelandGo" fill className="object-contain" />
          </div>
          <span className="text-xl font-extrabold text-blue-900 tracking-tight">IrelandGo</span>
        </Link>
      </div>

      {/* User Card */}
      <div className="px-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg shadow-blue-100 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
          <div className="relative flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-white/20 shadow-sm flex-shrink-0">
              {user?.profileImage ? (
                <Image src={user.profileImage} alt={user.fullName} fill className="object-cover" />
              ) : (
                <Image src="/avatar.png" alt="avatar" fill className="object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate uppercase tracking-wide">{user?.fullName || "User"}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-blue-200" />
                <p className="text-[10px] text-blue-100 font-medium uppercase">{user?.role || "Member"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pt-2">
        <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Main Menu</p>
        {navLinks.map((link) => {
          const isRoot = link.href === '/user'
          const isActive = isRoot
            ? pathname === '/user'
            : pathname === link.href || pathname.startsWith(`${link.href}/`)

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
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
          <p className="text-[10px] font-semibold text-gray-500 text-center uppercase tracking-wider">Account Actions</p>
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white/80 backdrop-blur-md px-5 py-4 border-b sticky top-0 z-30 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="font-extrabold text-lg text-blue-900">IrelandGo</span>
        </Link>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 rounded-xl">
              <Menu className="h-6 w-6 text-blue-600" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] max-w-[320px] p-0 border-none shadow-2xl">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar */}
        <aside
          className="hidden md:block w-[280px] flex-shrink-0 h-screen sticky top-0 bg-white border-r border-gray-100 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.02)] z-20"
          aria-label="User navigation"
        >
          <NavContent />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FBFBFB]">
          <main className="flex-1 overflow-y-auto px-4 py-8 md:px-10 md:py-10 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[400px] border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
              <LogOut className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-black mb-2 leading-tight">Wait! Going so soon?</DialogTitle>
            <DialogDescription className="text-red-100 text-sm font-medium">
              You are about to sign out of your account. Do you want to continue?
            </DialogDescription>
          </div>
          <div className="p-6 flex flex-col sm:flex-row-reverse gap-3 bg-white">
            <Button
              className="px-8 h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-100 transition-all flex-1"
              onClick={handleLogout}
            >
              Yes, Log Out
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsLogoutDialogOpen(false)}
              className="px-8 h-12 font-bold rounded-xl border-gray-200 flex-1"
            >
              Stay Logged In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

