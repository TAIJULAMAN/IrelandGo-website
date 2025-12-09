"use client";

import { useAuth } from "@/contexts/AuthContext";
import { LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function UserAvatar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    const dashboardLink = user.role === "agent" ? "/agent" : "/user";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 hover:opacity-80 transition"
            >
                <img
                    src="https://avatar.iran.liara.run/public/11"
                    alt={user.name}
                    className="w-10 h-10 rounded-full shadow-md"
                />
                <div className="hidden md:flex flex-col items-end">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        {user.role === "agent" ? "Agent" : "User"}
                    </p>
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <a
                        href={dashboardLink}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="text-sm font-medium">Dashboard</span>
                    </a>

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition text-red-600"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}
