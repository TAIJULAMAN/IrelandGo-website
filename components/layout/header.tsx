"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Menu, X, ChevronRight, LayoutDashboard, LogOut, ChevronDown, MessageCircle, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi";
import { logout as reduxLogout } from "@/Redux/Slice/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { decodeAuthToken } from "@/utils/decode-access-token";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const token = useAppSelector((state) => state.auth.token);
  console.log("token of aman", token);

  let isExpired = false;
  if (token) {
    try {
      const decoded = decodeAuthToken<any>(token);
      if (decoded && decoded.exp) {
        isExpired = decoded.exp * 1000 < Date.now();
      }
    } catch (e) {
      isExpired = true;
    }
  }

  const isAuthenticated = !!token && !isExpired;
  // console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    if (token && isExpired) {
      dispatch(reduxLogout());
    }
  }, [token, isExpired, dispatch]);

  const { data: profileData, isError } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isError) {
      dispatch(reduxLogout());
    }
  }, [isError, dispatch]);

  const user = profileData?.data;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(reduxLogout());
    setIsMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${isScrolled
          ? "py-3 bg-white border-b border-blue-500/10"
          : "py-3 bg-white border-b border-gray-100"
          }`}
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between">
            {/* Left side: Logo + Links */}
            <div className="flex items-center gap-8 xl:gap-12">
              <Link href="/">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Logo" width={40} height={40} />
                  <span className="text-2xl font-black text-gray-900 tracking-tight">Tourenzo</span>
                </div>
              </Link>

              {/* Desktop navigation */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-gray-800">
                <Link
                  href="/transfer"
                  className={`flex items-center gap-1 transition-colors ${pathname === "/transfer" ? "text-blue-600" : "hover:text-blue-600"}`}
                >
                  Transfers
                </Link>
                <Link
                  href="/multi-day-tours"
                  className={`flex items-center gap-1 transition-colors ${pathname === "/multi-day-tours" ? "text-blue-600" : "hover:text-blue-600"}`}
                >
                  Tours
                </Link>
                <Link
                  href="/auth/signup"
                  className={`flex items-center gap-1 transition-colors ${pathname === "/auth/signup" ? "text-blue-600" : "hover:text-blue-600"}`}
                >
                  Travel Agent
                </Link>
                <Link
                  href="/airport-transfers"
                  className={`transition-colors ${pathname === "/airport-transfers" ? "text-blue-600" : "hover:text-blue-600"}`}
                >
                  Airport Transfer
                </Link>
              </nav>
            </div>

            {/* Right Side: Phone + Login + Mobile Toggle */}
            <div className="flex items-center gap-4 xl:gap-6">

              {/* Phone Block */}
              <a 
                href="https://wa.me/353858090960"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-3 border-r border-gray-200 pr-6 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">WhatsApp Us</span>
                  <span className="text-sm font-black text-gray-900">+353 85 809 0960</span>
                </div>
              </a>

              {/* Auth / Login */}
              <div className="hidden lg:flex items-center">
                {isAuthenticated ? (
                  <UserAvatar />
                ) : (
                  <Link href="/auth/login">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white  px-6 py-5 rounded-lg font-bold text-lg shadow-md flex items-center gap-2 transition-all hover:scale-105">
                      <User className="w-4 h-4" />
                      Login
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile Toggle */}
              <button
                className="lg:hidden ml-auto focus:outline-none p-1.5 rounded-lg text-gray-900"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer */}
          <nav className="absolute top-0 left-0 z-50 h-full w-[80%] max-w-[300px] bg-white shadow-2xl flex flex-col p-5 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />
                  <span className="text-lg font-bold text-blue-600">
                    Tourenzo
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-900"
              >
                <X className="w-6 h-6" />
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
                href="/auth/signup"
                className="flex items-center justify-between p-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Travel Agent</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                href="/airport-transfers"
                className="flex items-center justify-between p-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Airport Transfer</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>

            {/* Drawer Footer (Auth) */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              {isAuthenticated && user ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
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
                      <p className="font-bold text-sm text-gray-900 truncate">
                        {user?.fullName}
                      </p>
                      <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                        {user?.role}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <Link
                      href="/dashboard"
                      className="w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 h-11 text-sm font-medium border-gray-200"
                      >
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
                <Link
                  href="/auth/login"
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 rounded-lg transition-all active:scale-[0.98]">
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
