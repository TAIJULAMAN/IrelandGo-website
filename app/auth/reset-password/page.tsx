"use client";

import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");

    // Password strength checker
    const getPasswordStrength = () => {
        if (!password) return { strength: 0, label: "", color: "" };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        const labels = ["", "Weak", "Fair", "Good", "Strong"];
        const colors = ["", "text-red-600", "text-orange-600", "text-yellow-600", "text-green-600"];
        const barColors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];

        return { strength, label: labels[strength], color: colors[strength], barColor: barColors[strength] };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header2 />

            <main className="pt-24 pb-16 md:pt-28 md:pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white p-6 sm:p-8 lg:p-10 xl:p-12">
                            <div className="text-center lg:text-left mb-7">
                                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                                    <Lock className="w-7 h-7 text-purple-600" />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">
                                    Reset Password
                                </h1>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    Create a new strong password for your account
                                </p>
                            </div>

                            <form className="space-y-4">
                                {/* New Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-11 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {password && (
                                        <div className="mt-2.5">
                                            <div className="flex gap-1.5 mb-1.5">
                                                {[1, 2, 3, 4].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1 flex-1 rounded-full transition-all ${level <= passwordStrength.strength
                                                            ? passwordStrength.barColor
                                                            : "bg-gray-100"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className={`text-xs font-medium ${passwordStrength.color}`}>
                                                {passwordStrength.label}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            required
                                            className="w-full pl-10 pr-11 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                            placeholder="Confirm your new password"
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

                                {/* Password Requirements */}
                                <div className="bg-gray-50/70 rounded-xl p-4 space-y-2 border border-gray-100">
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2.5">Password Requirements</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {[
                                            { check: password.length >= 8, text: "At least 8 characters" },
                                            { check: /[a-z]/.test(password) && /[A-Z]/.test(password), text: "Upper & lowercase letters" },
                                            { check: /\d/.test(password), text: "At least one number" },
                                            { check: /[^a-zA-Z0-9]/.test(password), text: "One special character" },
                                        ].map((req) => (
                                            <div key={req.text} className="flex items-center gap-2">
                                                <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${req.check ? "text-green-500" : "text-gray-300"}`} />
                                                <span className={`text-xs transition-colors ${req.check ? "text-green-700" : "text-gray-500"}`}>
                                                    {req.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit */}
                                <Link href="/auth/login">
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30 transition-all active:scale-[0.98] group mt-2">
                                        Reset Password
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                    </Button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
