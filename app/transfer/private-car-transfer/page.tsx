import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";
import TransferJourneyDetails from "@/components/transfer/transfer-journey-details";
import PrivateCarTransferHero from "@/components/private-car-transfer/private-car-transfer-hero";
import TravelTips from "@/components/transfer/travel-tips";
import { Suspense } from "react";

export default function PrivateCarTransfer() {
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen bg-gray-100" />}>
        <PrivateCarTransferHero />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-7xl mx-auto items-start px-4">
        <div className="md:col-span-3">
          <TravelTips />
        </div>
        <div className="md:col-span-1">
          <Suspense fallback={<div className="min-h-[400px] bg-gray-50" />}>
            <TransferJourneyDetails />
          </Suspense>
        </div>
      </div>
      <Testimonials />
      <FAQ />    </div>
  );
}
