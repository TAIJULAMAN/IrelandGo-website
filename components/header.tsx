"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 relative ${isScrolled ? "shadow-md py-3" : "py-5"
        }`}
    >
      {/* Navigation - Centered to viewport */}
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-8 text-sm text-white/90 z-10">
        <a href="#" className="hover:text-white transition">
          Transfers
        </a>
        <a href="#" className="hover:text-white transition">
          Tours
        </a>
        <a href="#" className="hover:text-white transition">
          About
        </a>
        <a href="#" className="hover:text-white transition">
          Contact
        </a>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo Icon */}
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold text-white">IrelandGO</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-white text-sm hover:text-white/80 border border-white/30 px-3 py-1.5 rounded-md transition flex items-center gap-1">
              EN
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">Login</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

