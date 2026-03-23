"use client";

import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Phone, Eye, EyeOff, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState("user");
    const { signup } = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const userData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            password: formData.get("password") as string,
            role: role as "user" | "agent",
        };

        signup(userData);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header2 />

            <main className="pt-24 pb-16 md:pt-28 md:pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white p-6 sm:p-8 lg:p-10 xl:p-12">
                            <div className="text-center lg:text-left mb-7">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">
                                    Create Account
                                </h1>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    Join thousands of happy travelers today
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Name & Phone - side by side on sm+ */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                                placeholder="+353 1 234 5678"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Role Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        I am a
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setRole("user")}
                                            className={`relative px-4 py-2.5 sm:py-3 border-2 rounded-xl font-medium transition-all text-sm ${role === "user"
                                                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-500/10"
                                                : "border-gray-200 bg-gray-50/50 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <User className="w-4 h-4" />
                                                Traveler
                                            </span>
                                            {role === "user" && (
                                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </span>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole("agent")}
                                            className={`relative px-4 py-2.5 sm:py-3 border-2 rounded-xl font-medium transition-all text-sm ${role === "agent"
                                                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-500/10"
                                                : "border-gray-200 bg-gray-50/50 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <Shield className="w-4 h-4" />
                                                Agent
                                            </span>
                                            {role === "agent" && (
                                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Password & Confirm - side by side on sm+ */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                required
                                                className="w-full pl-10 pr-11 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                                placeholder="Strong password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                required
                                                className="w-full pl-10 pr-11 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                                placeholder="Re-enter password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms */}
                                <div className="flex items-start pt-1">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        required
                                        className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                    />
                                    <label htmlFor="terms" className="ml-2.5 text-xs sm:text-sm text-gray-500 leading-relaxed">
                                        I agree to the{" "}
                                        <Link href="/settings/terms-of-service" className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/settings/privacy-policy" className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                {/* Submit */}
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30 transition-all active:scale-[0.98] group">
                                    Create Account
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </Button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100" />
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="bg-white px-4 text-gray-400">or</span>
                                </div>
                            </div>

                            {/* Sign in link */}
                            <p className="text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
