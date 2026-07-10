"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LogOut,
  User as UserIcon,
  MapPin,
  Bell,
  LayoutDashboard,
  ChevronRight,
  LifeBuoy,
  CreditCard,
  Users,
} from "lucide-react";
import { ProfileData } from "@/Redux/features/settings/profileApi";

interface UserSidebarProps {
  user: ProfileData | undefined;
  setIsMobileMenuOpen?: (open: boolean) => void;
  setIsLogoutDialogOpen: (open: boolean) => void;
}

const basePath = "/dashboard";
const userNavLinks = [
  {
    href: basePath,
    icon: <LayoutDashboard className="h-4 w-4" />,
    label: "Dashboard",
  },
  {
    href: `${basePath}/bookings`,
    icon: <MapPin className="h-4 w-4" />,
    label: "My Bookings",
  },
  {
    href: `${basePath}/profile`,
    icon: <UserIcon className="h-4 w-4" />,
    label: "Profile",
  },
  {
    href: `${basePath}/notifications`,
    icon: <Bell className="h-4 w-4" />,
    label: "Notifications",
  },
  {
    href: `/contact`,
    icon: <LifeBuoy className="h-4 w-4" />,
    label: "Help & Support",
  },
];
const agentNavLinks = [
  {
    href: basePath,
    icon: <LayoutDashboard className="h-4 w-4" />,
    label: "Dashboard",
  },
  {
    href: `${basePath}/clients`,
    icon: <Users className="h-4 w-4" />,
    label: "Clients",
  },
  {
    href: `${basePath}/bookings`,
    icon: <MapPin className="h-4 w-4" />,
    label: "My Bookings",
  },
  {
    href: `${basePath}/profile`,
    icon: <UserIcon className="h-4 w-4" />,
    label: "Profile",
  },
  {
    href: `${basePath}/payment-methods`,
    icon: <CreditCard className="h-4 w-4" />,
    label: "Onboarding",
  },
  {
    href: `${basePath}/notifications`,
    icon: <Bell className="h-4 w-4" />,
    label: "Notifications",
  },
  {
    href: `/contact`,
    icon: <LifeBuoy className="h-4 w-4" />,
    label: "Help & Support",
  },
];

export function Sidebar({
  user,
  setIsMobileMenuOpen,
  setIsLogoutDialogOpen,
}: UserSidebarProps) {
  const pathname = usePathname();

  const role = user?.role?.toLowerCase();
  const navLinks = role === "agent" ? agentNavLinks : userNavLinks;

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Branding */}
      <div className="px-6 py-8 flex items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-105 duration-300">
            <Image
              src="/logo.png"
              alt="IrelandGo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent tracking-tight">
            IrelandGo
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pt-2">
        <div className="mb-4 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Dashboard
        </div>
        {navLinks.map((link) => {
          const isRoot = link.href === basePath;
          const isActive = isRoot
            ? pathname === basePath ||
            pathname === `${basePath}/user` ||
            pathname === `${basePath}/agent`
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen?.(false)}
              className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all duration-300 group relative overflow-hidden ${isActive
                ? "text-blue-700 font-semibold bg-blue-50/50 shadow-sm border border-blue-100/50"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                }`}
            >
              <div className="flex items-center gap-3.5 relative z-10">
                <span
                  className={`${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"} transition-colors`}
                >
                  {link.icon}
                </span>
                <span className="tracking-wide">{link.label}</span>
              </div>
              {isActive && (
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-6 mt-auto">
        <button
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 font-medium text-sm transition-all duration-300 group border border-slate-100 hover:border-red-100"
          onClick={() => setIsLogoutDialogOpen(true)}
        >
          <LogOut className="h-4 w-4 text-slate-400 group-hover:text-red-500 transition-colors" />
          <span className="tracking-wide">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
