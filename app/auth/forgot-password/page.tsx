"use client";

import { Header2 } from "@/components/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header2 />

            <main className="pt-32 pb-16">
                <div className="container mx-auto px-5 md:px-0">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-blue-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Forgot Password?
                                </h1>
                                <p className="text-gray-600">
                                    No worries! Enter your email and we'll send you a verification code to reset your password.
                                </p>
                            </div>

                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <Link href="/auth/verify-code">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold">
                                        Send Verification Code
                                    </Button>
                                </Link>
                            </form>

                            <div className="mt-6 text-center">
                                <Link href="/auth/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to login
                                </Link>
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> The verification code will be sent to your registered email address and will expire in 10 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
