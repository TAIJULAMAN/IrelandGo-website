"use client";

import { LogOut, LayoutDashboard, ChevronDown, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi";
import { logout as reduxLogout } from "@/Redux/Slice/authSlice";
import { useRouter } from "next/navigation";

export function UserAvatar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const token = useAppSelector((state) => state.auth.token);
    const isAuthenticated = !!token;

    const { data: profileData } = useGetProfileQuery(undefined, {
        skip: !isAuthenticated,
    });

    const user = profileData?.data;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch(reduxLogout());
        setIsOpen(false);
        router.push("/");
    };

    if (!isAuthenticated || !user) return null;

    const dashboardLink = user.role?.toLowerCase() === "agent" ? "/agent" : "/user";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20 group"
            >
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-md transition-transform duration-200 group-hover:scale-105">
                    {user?.profileImage ? (
                        <Image
                            src={user?.profileImage}
                            alt={user?.fullName}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                            <Image
                                src="/avatar.png"
                                alt="user avatar"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
                <div className="hidden lg:flex flex-col items-start mr-1">
                    <p className="text-sm font-bold text-white">
                        {user?.fullName}
                    </p>
                    <span className="text-[10px] items-center py-0 px-2 rounded-full bg-blue-600 text-white font-semibold uppercase tracking-tighter">
                        {user?.role}
                    </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                    <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50 rounded-t-2xl mb-1">
                        <p className="text-sm font-extrabold text-gray-900">{user?.fullName}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <Link
                        href={dashboardLink}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition-all text-gray-700 hover:text-blue-600 group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold">Dashboard</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 transition-all text-gray-600 hover:text-red-600 group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <LogOut className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold">Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}

