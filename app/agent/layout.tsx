"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, User as UserIcon, MapPin, LayoutDashboard } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header2 } from "@/components/Header2";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navLinks = [
    {
      href: "/agent",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      href: "/agent/profile",
      icon: <UserIcon className="h-5 w-5" />,
      label: "Profile",
    },
    {
      href: "/agent/bookings",
      icon: <MapPin className="h-5 w-5" />,
      label: "My Bookings",
    },
    {
      href: "/agent/clients",
      icon: <Users className="h-5 w-5" />,
      label: "Clients",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />
      <div className="flex flex-1 overflow-hidden bg-gray-50/60">
        {/* Sidebar */}
        <nav
          className={`${
            isSidebarOpen ? "w-72" : "w-24"
          } border-r flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 bg-white/80 backdrop-blur`}
          aria-label="Agent navigation"
        >
          <div className="h-full flex flex-col p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 mb-4 inline-flex items-center justify-center border border-gray-200 bg-white shadow-sm"
              aria-label="Toggle sidebar"
              aria-expanded={isSidebarOpen}
            >
              <svg
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                  !isSidebarOpen && "rotate-180"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <h2
              className={`text-xs font-semibold tracking-wide text-gray-500 uppercase mb-4 px-1 ${
                !isSidebarOpen && "hidden"
              }`}
            >
              Agent Panel
            </h2>

            <nav className="space-y-1 flex-1">
              {navLinks.map((link) => {
                const isRoot = link.href === "/agent";
                const isActive = isRoot
                  ? pathname === "/agent"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center ${
                      isSidebarOpen ? "space-x-3 justify-start" : "justify-center"
                    } px-2 py-2 rounded-xl text-sm transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    title={link.label}
                  >
                    {link.icon}
                    {isSidebarOpen && <span>{link.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-6">{children}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
