"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, User as UserIcon, MapPin, Bell, Activity, Grip, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    {
      href: "/",
      icon: <Grip className="h-5 w-5" />,
      label: "Home"
    },
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

  const NavContent = () => (
    <div className="h-full flex flex-col p-4">
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
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 justify-start px-2 py-2 rounded-xl text-sm transition-colors ${isActive
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-100 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
              aria-current={isActive ? 'page' : undefined}
              title={link.label}
            >
              {link.icon}
              <span>{link.label}</span>
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
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-900">IrelandGo</span>
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-mr-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="p-4 border-b text-left">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <nav
          className="hidden md:block w-72 border-r flex-shrink-0 h-screen sticky top-0 bg-white"
          aria-label="User navigation"
        >
          <NavContent />
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-6 md:p-8">
              {children}
            </div>
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
