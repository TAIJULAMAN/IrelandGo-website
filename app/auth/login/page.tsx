"use client";

import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
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

                    const role = decodedUser?.role?.toLowerCase();
                    if (role === "USER") {
                        router.push("/dashboard/user");
                    } else if (role === "AGENT") {
                        router.push("/dashboard/agent");
                    } else {
                        router.push("/");
                    }
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

            <main className="pt-32 pb-16">
                <div className="container mx-auto px-5 md:px-0">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Welcome Back
                                </h1>
                                <p className="text-gray-600">
                                    Sign in to your IrelandGo account
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="you@example.com"
                                        />

                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            required
                                            disabled={isLoading}
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                    </label>

                                    <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Signing In...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                                        Sign up
                                    </Link>
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

