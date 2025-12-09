"use client";

import { Header2 } from "@/components/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
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

        return { strength, label: labels[strength], color: colors[strength] };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header2 />

            <main className="pt-32 pb-16">
                <div className="container mx-auto px-5 md:px-0">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Lock className="w-8 h-8 text-purple-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Reset Password
                                </h1>
                                <p className="text-gray-600">
                                    Create a new strong password for your account
                                </p>
                            </div>

                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {password && (
                                        <div className="mt-2">
                                            <div className="flex gap-1 mb-1">
                                                {[1, 2, 3, 4].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1 flex-1 rounded ${level <= passwordStrength.strength
                                                                ? passwordStrength.strength === 1
                                                                    ? "bg-red-500"
                                                                    : passwordStrength.strength === 2
                                                                        ? "bg-orange-500"
                                                                        : passwordStrength.strength === 3
                                                                            ? "bg-yellow-500"
                                                                            : "bg-green-500"
                                                                : "bg-gray-200"
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

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            required
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            placeholder="Confirm your new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Password Requirements */}
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs">
                                            <CheckCircle className={`w-4 h-4 ${password.length >= 8 ? "text-green-500" : "text-gray-300"}`} />
                                            <span className={password.length >= 8 ? "text-green-700" : "text-gray-500"}>
                                                At least 8 characters
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <CheckCircle className={`w-4 h-4 ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                                            <span className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? "text-green-700" : "text-gray-500"}>
                                                Uppercase and lowercase letters
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <CheckCircle className={`w-4 h-4 ${/\d/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                                            <span className={/\d/.test(password) ? "text-green-700" : "text-gray-500"}>
                                                At least one number
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <CheckCircle className={`w-4 h-4 ${/[^a-zA-Z0-9]/.test(password) ? "text-green-500" : "text-gray-300"}`} />
                                            <span className={/[^a-zA-Z0-9]/.test(password) ? "text-green-700" : "text-gray-500"}>
                                                At least one special character
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/auth/login">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold">
                                        Reset Password
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
