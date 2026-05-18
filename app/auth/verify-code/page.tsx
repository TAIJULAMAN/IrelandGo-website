"use client";

import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function VerifyCode() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

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

    const isCodeComplete = code.every(digit => digit !== "");

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pt-24 pb-16 md:pt-28 md:pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white p-6 sm:p-8 lg:p-10 xl:p-12">
                            <div className="text-center lg:text-left mb-7">
                                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                                    <Shield className="w-7 h-7 text-green-600" />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5">
                                    Verify Your Email
                                </h1>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    We&apos;ve sent a 6-digit verification code to
                                </p>
                                <p className="text-blue-600 font-semibold text-sm sm:text-base mt-1">
                                    your@email.com
                                </p>
                            </div>

                            <form className="space-y-5">
                                {/* Code Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center lg:text-left">
                                        Enter Verification Code
                                    </label>
                                    <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start" onPaste={handlePaste}>
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
                                                className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-lg sm:text-xl font-bold border-2 rounded-xl outline-none transition-all ${digit
                                                    ? "border-blue-500 bg-blue-50/50 text-blue-700"
                                                    : "border-gray-200 bg-gray-50/50 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Submit */}
                                <Link href="/auth/reset-password">
                                    <Button
                                        className={`w-full py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-xl transition-all active:scale-[0.98] group mt-1 ${isCodeComplete
                                            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                        disabled={!isCodeComplete}
                                    >
                                        Verify Code
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                    </Button>
                                </Link>
                            </form>

                            {/* Back link */}
                            <div className="mt-4 text-center lg:text-left">
                                <Link href="/auth/forgot-password" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors group">
                                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
                                    Back to forgot password
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>        </div>
    );
}
