"use client";

import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getFromLocalStorage, setToLocalStorage, getRemoveLocalStorage } from "@/utils/local-storage";

import { useLogInMutation } from "@/Redux/features/auth/authApi";
import { useAppDispatch } from "@/Redux/hooks";
import { setUser } from "@/Redux/Slice/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { decodeAuthToken } from "@/utils/decode-access-token";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const savedEmail = getFromLocalStorage("rememberedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);
    const [logIn, { isLoading }] = useLogInMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);
        const emailValue = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Handle Remember Me
        if (rememberMe) {
            setToLocalStorage("rememberedEmail", emailValue);
        } else {
            getRemoveLocalStorage("rememberedEmail");
        }

        try {
            const response = await logIn({ email: emailValue, password }).unwrap();

            console.log("Login Response:", response);

            if (response?.success) {
                const { accessToken, refreshToken } = response?.data;
                const decodedUser = decodeAuthToken<any>(accessToken);
                console.log("Decoded User:", decodedUser);

                if (decodedUser) {
                    dispatch(setUser({
                        user: {
                            ...decodedUser,
                            ...response?.data?.user
                        },
                        token: accessToken,
                        refreshToken: refreshToken
                    }));

                    toast.success("Logged in successfully");

                    router.push("/dashboard");
                }
            } else {
                setError(response?.message || "Login failed");
                toast.error(response?.message || "Login failed");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            const errorMessage = err?.data?.message || err?.message || "An unexpected error occurred";
            setError(errorMessage);
            toast.error(errorMessage);
        }
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
                                    Welcome Back
                                </h1>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    Sign in to your IrelandGo account
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        {error}
                                    </div>
                                )}

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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
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
                                            disabled={isLoading}
                                            className="w-full pl-10 pr-11 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember me & Forgot */}
                                <div className="flex items-center justify-between pt-1">
                                    <label className="flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className="ml-2.5 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                                    </label>

                                    <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors underline underline-offset-2">
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-700/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Signing In...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                        </>
                                    )}
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

                            {/* Sign up link */}
                            <p className="text-center text-sm text-gray-500">
                                Don&apos;t have an account?{" "}
                                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                    Sign up
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
