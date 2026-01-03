"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { UserAvatar } from "@/components/common/UserAvatar"
import { useAuth } from "@/contexts/AuthContext"
import { ChevronRight, X } from "lucide-react"

export function Header2() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 relative ${isScrolled ? "shadow-md py-3" : "py-5"}`}
    >
      {/* Desktop navigation */}
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-8 text-md text-gray-900 z-10">
        <Link href="/transfer" className="hover:text-gray-700 transition font-bold">Transfers</Link>
        <Link href="/multi-day-tours" className="hover:text-gray-700 transition font-bold">Tours</Link>
        <Link href="/contact" className="hover:text-gray-700 transition font-bold">Contact</Link>
        <Link href="/blog" className="hover:text-gray-700 transition font-bold">Blog</Link>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer */}
          <nav className="relative h-full w-[80%] max-w-[300px] bg-white shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />
                  <span className="text-lg font-bold text-gray-900">IrelandGO</span>
                </div>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 flex-1">
              <Link
                href="/transfer"
                className="flex items-center justify-between p-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Transfers</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/multi-day-tours"
                className="flex items-center justify-between p-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Tours</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between p-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Contact</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/blog"
                className="flex items-center justify-between p-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Blog</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>

            {/* Drawer Footer (Auth) */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              {isAuthenticated && user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {/* Fallback avatar if user doesn't have one, or just use name */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {user.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={user.role === 'agent' ? '/agent' : '/user'}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full justify-center text-sm">Dashboard</Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-center text-sm text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/logo3.png" alt="Logo" width={150} height={80} />
            </div>
          </Link>
          <button
            className="md:hidden ml-auto text-gray-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <UserAvatar />
            ) : (
              <Link href="/auth/login">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
