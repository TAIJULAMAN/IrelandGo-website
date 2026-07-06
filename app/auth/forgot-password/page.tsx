"use client";

import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pt-24 pb-16 md:pt-28 md:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white p-6 sm:p-8 lg:p-10 xl:p-12">
                            <div className="text-center lg:text-left mb-7">
                                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mx-auto lg:mx-0 mb-4">
                                    <Mail className="w-7 h-7 text-blue-600" />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">
                                    Forgot Password?
                                </h1>
                                <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto lg:mx-0">
                                    No worries! Enter your email and we&apos;ll send you a verification code to reset your password.
                                </p>
                            </div>

                            <form className="space-y-4">
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
                                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all text-sm"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Submit */}
                                <Link href="/auth/verify-code">
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-lg shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30 transition-all active:scale-[0.98] group mt-2">
                                        Send Verification Code
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                    </Button>
                                </Link>
                            </form>

                            {/* Back link */}
                            <div className="mt-6 text-center lg:text-left">
                                <Link href="/auth/login" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors group">
                                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                                    Back to login
                                </Link>
                            </div>

                            {/* Info note */}
                            <div className="mt-6 p-4 bg-blue-50/70 rounded-lg border border-blue-100/80 flex items-start gap-3">
                                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-xs sm:text-sm text-blue-700/80 leading-relaxed">
                                    The verification code will be sent to your registered email address and will expire in 10 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>        </div>
    );
}
