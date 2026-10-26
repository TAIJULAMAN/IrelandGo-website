import { Suspense } from "react";
import { SignupContent } from "@/components/auth/signup-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Tourenzo",
  description: "Join Tourenzo today. Create your account to book private transfers, exciting day trips, and unforgettable multi-day tours across Ireland.",
};

export default function Signup() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <SignupContent />
        </Suspense>
    );
}
