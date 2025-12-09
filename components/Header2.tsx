"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { UserAvatar } from "@/components/UserAvatar"
import { useAuth } from "@/contexts/AuthContext"

export function Header2() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState('EN')
  const { isAuthenticated } = useAuth()

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
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-8 text-sm text-gray-900 z-10">
        <a href="/transfer" className="hover:text-gray-700 transition">Transfers</a>
        <a href="#" className="hover:text-gray-700 transition">Tours</a>
        <a href="/about" className="hover:text-gray-700 transition">About</a>
        <a href="/contact" className="hover:text-gray-700 transition">Contact</a>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="flex flex-col items-center bg-gradient-to-b from-sky-500 to-indigo-500 absolute top-0 left-0 h-screen w-[70%] py-4 md:hidden z-40 transition-transform duration-300 ease-out">
          <a href="/transfer" className="text-white py-2 hover:text-gray-300">Transfers</a>
          <a href="#" className="text-white py-2 hover:text-gray-300">Tours</a>
          <a href="/about" className="text-white py-2 hover:text-gray-300">About</a>
          <a href="/contact" className="text-white py-2 hover:text-gray-300">Contact</a>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-white border border-white/30 px-3 py-1.5 rounded-md focus:outline-none mt-2"
          >
            <option value="EN" className="bg-sky-500 text-white">ENG</option>
            <option value="FR" className="bg-sky-500 text-white">FRA</option>
          </select>
          {!isAuthenticated && (
            <Link href="/auth/login">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md mt-2">
                Login
              </Button>
            </Link>
          )}
        </nav>
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
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-gray-900 border border-gray-300 px-3 py-1.5 rounded-md focus:outline-none"
            >
              <option value="EN" className="bg-sky-500 text-white">ENG</option>
              <option value="FR" className="bg-sky-500 text-white">FRA</option>
            </select>
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
