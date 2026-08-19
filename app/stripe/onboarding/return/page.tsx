"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCreateOnboardingMutation } from "@/Redux/features/settings/onboardingApi";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function StripeReturnPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accountId = searchParams.get("accountId");
  const [createOnboarding] = useCreateOnboardingMutation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const hasVerified = useRef(false);

  useEffect(() => {
    // Prevent strict mode double calls from messing up the redirection logic
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verifyStripe = async () => {
      try {
        const res = await createOnboarding().unwrap();
        const dataStatus = res?.data?.status;

        if (dataStatus === "verified") {
          setStatus("success");
          toast.success("Stripe Account Connected successfully!");
          setTimeout(() => {
            router.push("/dashboard/payment-methods");
          }, 2000);
        } else if (res?.data?.onboardingLink) {
          // If the account has missing requirements and returns a link
          toast.info("Continuing onboarding...");
          window.location.href = res.data.onboardingLink;
        } else {
          setStatus("error");
          toast.error("Failed to verify Stripe account.");
        }
      } catch (err: any) {
        setStatus("error");
        toast.error(err?.data?.message || "Something went wrong while verifying.");
      }
    };

    verifyStripe();
  }, [createOnboarding, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center">
        {status === "loading" && (
          <>
            <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Verifying Connection</h2>
            <p className="text-gray-500 text-[15px]">Please wait while we confirm your Stripe account setup...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Stripe Connected!</h2>
            <p className="text-gray-500 text-[15px]">You are being redirected to your dashboard...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-500 text-[15px] mb-8">We couldn't verify your Stripe connection. Please try again.</p>
            <Button onClick={() => router.push("/dashboard/payment-methods")} className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-xl py-6">
              Return to Dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
