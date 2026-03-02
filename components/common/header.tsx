"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { UserAvatar } from "@/components/common/UserAvatar"
import { Menu, X, ChevronRight, LayoutDashboard, LogOut } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/Redux/hooks"
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi"
import { logout as reduxLogout } from "@/Redux/Slice/authSlice"
import { useRouter } from "next/navigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const token = useAppSelector((state) => state.auth.token)
  console.log("token", token)
  const isAuthenticated = !!token
  console.log("isAuthenticated", isAuthenticated)

  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  })

  const user = profileData?.data

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

  const handleLogout = () => {
    dispatch(reduxLogout())
    setIsMenuOpen(false)
    router.push("/")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 relative ${isScrolled ? "shadow-md py-4" : "py-8"}`}
    >
      {/* Desktop navigation */}
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-10 text-md z-10">
        <Link href="/transfer" className="text-white transition font-bold hover:text-blue-400">Transfers</Link>
        <Link href="/multi-day-tours" className="text-white transition font-bold hover:text-blue-400">Tours</Link>
        <Link href="/contact" className="text-white transition font-bold hover:text-blue-400">Contact</Link>
        <Link href="/blog" className="text-white transition font-bold hover:text-blue-400">Blog</Link>
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
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    {user?.profileImage ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                          src={user?.profileImage}
                          alt={user?.fullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <Image
                          src="/avatar.png"
                          alt="user avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate">{user?.fullName}</p>
                      <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">{user?.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <Link
                      href={user.role?.toLowerCase() === 'agent' ? '/agent' : '/user'}
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full justify-start gap-3 h-11 text-sm font-medium border-gray-200">
                        <LayoutDashboard className="w-4 h-4 text-white" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start gap-3 h-11 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <Link href="/auth/login" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 rounded-xl transition-all active:scale-[0.98]">
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
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <span className="text-xl font-bold text-white">IrelandGO</span>
            </div>
          </Link>
          <button
            className="md:hidden ml-auto text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <UserAvatar />
            ) : (
              <Link href="/auth/login">
                <Button className="bg-blue-500 text-white px-6 py-2 rounded-md">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
