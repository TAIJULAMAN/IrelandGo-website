"use client";

import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCreateOnboardingMutation } from "@/Redux/features/settings/onboardingApi";
import { useGetProfileQuery } from "@/Redux/features/settings/profileApi";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserPaymentMethodsPage() {
  const router = useRouter();
  const { data: profileRes, isLoading: isProfileLoading } = useGetProfileQuery();
  const [createOnboarding, { isLoading }] = useCreateOnboardingMutation();

  const profile = profileRes?.data;

  const isStripeConnected =
    profile?.isStripeConnected === true ||
    profile?.stripeConnected === true ||
    profile?.stripeOnboarded === true ||
    profile?.stripeOnboardingCompleted === true ||
    !!profile?.stripeAccountId;

  // console.log("isStripeConnected", isStripeConnected);

  const handleConnectStripe = async () => {
    try {
      const res = await createOnboarding().unwrap();
      const url = res?.data?.onboardingLink;
      if (url) {
        toast.success("Redirecting to Stripe onboarding...");
        window.location.href = url;
      } else {
        toast.error("No onboarding URL returned. Please try again.");
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to start Stripe onboarding. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col pb-10 w-full bg-white min-h-screen">
      <div className="flex items-center gap-3 py-5 px-6 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="p-1 hover:bg-gray-50 rounded-full transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" strokeWidth={2} />
        </button>
        <h1 className="text-[17px] font-semibold text-[#1F2937]">
          Payment Onboarding
        </h1>
      </div>
      <div className="flex flex-col gap-6 px-6 pt-6 max-w-5xl">
        {/* Banner */}
        <div className="bg-[#F4F8FA] border border-[#E5EDF4] rounded-lg p-5">
          <h2 className="text-blue-600 font-medium text-[15px] mb-1">
            Setup Payout Method
          </h2>
          <p className="text-[14px] text-[#4B5563]">
            Connect your payout to complete payments.
          </p>
        </div>

        {/* Stripe Card */}
        <div className="rounded-lg bg-white border border-[#E5E7EB] shadow-sm">
          <div className="p-6">
            {isProfileLoading ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-14">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
              </div>
            ) : (
              <>
                {/* Card Header section */}
                <div className="flex items-center justify-between gap-4 mb-20">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <CreditCard
                        className="h-[22px] w-[22px] text-blue-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 text-[17px] tracking-tight">
                        Stripe
                      </span>
                      <span className="text-[13px] text-gray-500 mt-0.5">
                        Recommended for fastest payouts.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <p className="text-[14px] text-[#6B7280]">
                    {isStripeConnected
                      ? "Your Stripe account is active and connected. Payouts will be processed automatically."
                      : "Connect your Stripe account to start receiving payments automatically."}
                  </p>
                  <Button
                    onClick={handleConnectStripe}
                    disabled={isLoading || isStripeConnected || profile?.status === "verified"}
                    className={`font-medium rounded-lg px-5 py-2.5 h-auto transition-colors flex items-center gap-2 ${isStripeConnected || profile?.status === "verified"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-default opacity-100"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                  >
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isLoading
                      ? "Connecting..."
                      : (isStripeConnected || profile?.status === "verified")
                        ? "Connected"
                        : "Connect Stripe"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
