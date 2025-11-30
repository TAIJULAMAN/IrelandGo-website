"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { LogOut, User as UserIcon, MapPin, Bell, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-88' : 'w-24'} border-r flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300`}>
          <div className="p-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 mb-4"
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
            
            <h2 className={`text-xl font-bold mb-8 ${!isSidebarOpen && 'hidden'}`}>Your Account</h2>
            
            <nav className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`flex items-center space-x-2 p-2 rounded-lg ${isActive ? 'bg-gray-100 text-blue-600 font-medium' : 'hover:bg-gray-50'}`}
                  >
                    {link.icon}
                    {isSidebarOpen && <span>{link.label}</span>}
                  </Link>
                )
              })}
            </nav>
            
            {/* Logout Button */}
            <div className="mt-4 p-4 pt-4 border-t">
              <button 
                className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-red-800 text-white-600 bg-red-600 font-medium"
                onClick={() => setIsLogoutDialogOpen(true)}
              >
                <LogOut className="h-5 w-5" />
                {isSidebarOpen && <span>Logout</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>

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
