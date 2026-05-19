"use client";

import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserPaymentMethodsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col pb-10 w-full bg-white min-h-screen">
      {/* Header */}
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

      {/* Main Content */}
      <div className="flex flex-col gap-6 px-6 pt-6 max-w-5xl">
        {/* Banner */}
        <div className="bg-[#F4F8FA] border border-[#E5EDF4] rounded-xl p-5">
          <h2 className="text-blue-600 font-medium text-[15px] mb-1">
            Setup Payout Method
          </h2>
          <p className="text-[14px] text-[#4B5563]">
            Connect your payout to complete payments.
          </p>
        </div>

        {/* Stripe Card */}
        <div className="rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="p-6">
            {/* Card Header section */}
            <div className="flex items-center gap-4 mb-20">
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

            {/* Card Footer section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-[14px] text-[#6B7280]">
                Connect your Stripe account to start receiving payments
                automatically.
              </p>
              <Button className="bg-blue-600 text-white font-medium rounded-lg px-5 py-2.5 h-auto transition-colors">
                Connect Stripe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
