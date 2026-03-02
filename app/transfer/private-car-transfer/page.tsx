import FAQ from "@/app/settings/faq/faq";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/common/testimonials";
import SightsAlongTheWay from "@/components/transfer/sights-along-the-way";
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
      <Suspense fallback={<div className="min-h-[400px] bg-gray-50" />}>
        <TransferJourneyDetails />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px] bg-gray-50" />}>
        <SightsAlongTheWay />
      </Suspense>
      <TravelTips />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
