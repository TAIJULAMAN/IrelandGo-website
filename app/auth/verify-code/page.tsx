"use client";

import { Header2 } from "@/components/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function VerifyCode() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        const newCode = [...code];

        for (let i = 0; i < pastedData.length; i++) {
            if (i < 6) {
                newCode[i] = pastedData[i];
            }
        }
        setCode(newCode);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header2 />

            <main className="pt-32 pb-16">
                <div className="container mx-auto px-5 md:px-0">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-green-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Verify Your Email
                                </h1>
                                <p className="text-gray-600">
                                    We've sent a 6-digit verification code to
                                </p>
                                <p className="text-blue-600 font-medium mt-1">
                                    your@email.com
                                </p>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                                        Enter Verification Code
                                    </label>
                                    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                                        {code.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => {
                                                    inputRefs.current[index] = el;
                                                }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <Link href="/auth/reset-password">
                                    <Button
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold"
                                        disabled={code.some(digit => !digit)}
                                    >
                                        Verify Code
                                    </Button>
                                </Link>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Didn't receive the code?{" "}
                                    <button className="text-blue-600 hover:text-blue-700 font-semibold">
                                        Resend
                                    </button>
                                </p>
                            </div>

                            <div className="mt-6 text-center">
                                <Link href="/auth/forgot-password" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to forgot password
                                </Link>
                            </div>

                            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <p className="text-sm text-yellow-800">
                                    <strong>⏱️ Code expires in:</strong> 9:45
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
