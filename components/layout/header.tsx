"use client"

import { useId } from 'react'
import Link from "next/link"
import { Bell, ChevronDown, Globe, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const languageMenuId = useId()
  const userMenuId = useId()

  return (
    <header className="border-b border-blue-100 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/logo1.png" alt="" className="max-w-full max-h-full object-contain" />
          </div>
          <span className="text-xl font-bold text-blue-600 ml-2">IrelandGO</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/transfers" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Transfers
          </Link>
          <Link href="/tours" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Tours
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                <Globe className="h-4 w-4" />
                <span>EN</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-20">
              <DropdownMenuItem className="justify-center">EN</DropdownMenuItem>
              <DropdownMenuItem className="justify-center">FR</DropdownMenuItem>
              <DropdownMenuItem className="justify-center">ES</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notification */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/user">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user/bookings">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
