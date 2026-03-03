"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/Redux/hooks"
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi"
import { logout as reduxLogout } from "@/Redux/Slice/authSlice"
import { toast } from "sonner"
import { UserSidebar } from "@/components/dashboard/UserSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  return (
    <div className="flex h-screen overflow-hidden bg-[#FBFBFB]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[280px] h-full flex-shrink-0">
        <UserSidebar
          user={user}
          setIsLogoutDialogOpen={setIsLogoutDialogOpen}
        />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[85%] max-w-[320px] p-0 border-none">
          <UserSidebar
            user={user}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            setIsLogoutDialogOpen={setIsLogoutDialogOpen}
          />
        </SheetContent>
      </Sheet>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Main Header */}
        <DashboardHeader setIsMobileMenuOpen={setIsMobileMenuOpen} user={user} />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/30">
          <div className="container mx-auto px-5 py-5 md:px-0 md:py-10">
            {children}
          </div>
        </main>
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


