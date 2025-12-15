"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, User as UserIcon, MapPin, LayoutDashboard, Grip, Menu } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header2 } from "@/components/common/Header2";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "/",
      icon: <Grip className="h-5 w-5" />,
      label: "Home",
    },
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

  const NavContent = () => (
    <div className="h-full flex flex-col p-4">
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
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 justify-start px-2 py-2 rounded-xl text-sm transition-colors ${isActive
                ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100 shadow-sm"
                : "text-gray-700 hover:bg-gray-50"
                }`}
              aria-current={isActive ? "page" : undefined}
              title={link.label}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-900">Agent Panel</span>
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

      <div className="flex flex-1 overflow-hidden bg-gray-50/60">
        {/* Desktop Sidebar */}
        <nav
          className="hidden md:block w-72 border-r flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 bg-white/80 backdrop-blur"
          aria-label="Agent navigation"
        >
          <NavContent />
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-6 md:p-8">{children}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
