"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, User as UserIcon, MapPin, Bell, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/footer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Header2 } from "@/components/Header2"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

  const navLinks = [
    {
      href: "/user",
      icon: <Activity className="h-5 w-5" />,
      label: "Dashboard"
    },
    {
      href: "/user/profile",
      icon: <UserIcon className="h-5 w-5" />,
      label: "Profile"
    },
    {
      href: "/user/bookings",
      icon: <MapPin className="h-5 w-5" />,
      label: "My Bookings"
    },
    {
      href: "/user/saved",
      icon: <MapPin className="h-5 w-5" />,
      label: "Saved Locations"
    },
    {
      href: "/user/support",
      icon: <Bell className="h-5 w-5" />,
      label: "Support"
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav
          className={`${
            isSidebarOpen ? 'w-72' : 'w-24'
          } border-r flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 bg-white/80 backdrop-blur`}
          aria-label="User navigation"
        >
          <div className="h-full flex flex-col p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 mb-4 inline-flex items-center justify-center border border-gray-200 bg-white shadow-sm"
              aria-label="Toggle sidebar"
              aria-expanded={isSidebarOpen}
            >
              <svg
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${!isSidebarOpen && 'rotate-180'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <h2
              className={`text-xs font-semibold tracking-wide text-gray-500 uppercase mb-4 px-1 ${
                !isSidebarOpen && 'hidden'
              }`}
            >
              Your Account
            </h2>

            <nav className="space-y-1 flex-1">
              {navLinks.map((link) => {
                const isRoot = link.href === '/user'
                const isActive = isRoot
                  ? pathname === '/user'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center ${
                      isSidebarOpen ? 'space-x-3 justify-start' : 'justify-center'
                    } px-2 py-2 rounded-xl text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-100 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    title={link.label}
                  >
                    {link.icon}
                    {isSidebarOpen && <span>{link.label}</span>}
                  </Link>
                )
              })}
            </nav>

            {/* Logout Button */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm border border-red-100"
                onClick={() => setIsLogoutDialogOpen(true)}
              >
                <LogOut className="h-5 w-5" />
                {isSidebarOpen && <span>Logout</span>}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Logout Confirmation</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to logout? You'll need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsLogoutDialogOpen(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Add your logout logic here
                console.log('Logging out...')
                // Example: signOut()
                // router.push('/login')
                setIsLogoutDialogOpen(false)
              }}
              className="px-6"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
