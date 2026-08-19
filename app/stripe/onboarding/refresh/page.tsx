"use client";

import { useCreateOnboardingMutation } from "@/Redux/features/settings/onboardingApi";
import { RefreshCcw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StripeRefreshPage() {
  const [createOnboarding, { isLoading }] = useCreateOnboardingMutation();
  const router = useRouter();

  const handleRetry = async () => {
    try {
      const res = await createOnboarding().unwrap();
      const url = res?.data?.onboardingLink;
      if (url) {
        window.location.href = url;
      } else {
        toast.error("Could not generate a new link. Please try again later.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to restart Stripe connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-orange-50 flex items-center justify-center mb-6">
          <RefreshCcw className="h-8 w-8 text-orange-500" />
        </div>
        <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Session Expired</h2>
        <p className="text-gray-500 text-[15px] mb-8">
          It looks like your Stripe connection session was interrupted or has expired. Don't worry, you can easily resume right where you left off.
        </p>
        <div className="flex flex-col w-full gap-3">
          <Button 
            onClick={handleRetry} 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 rounded-xl"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Connecting...
              </span>
            ) : (
              "Retry Stripe Connection"
            )}
          </Button>
          <Button 
            variant="outline"
            onClick={() => router.push("/dashboard/payment-methods")}
            disabled={isLoading}
            className="w-full py-6 rounded-xl"
          >
            Cancel and Return
          </Button>
        </div>
      </div>
    </div>
  );
}
