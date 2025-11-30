import FAQ from "@/components/day-trips/faq";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/testimonials";
import SightsAlongTheWay from "@/components/transfer/sights-along-the-way";
import TransferJourneyDetails from "@/components/transfer/transfer-journey-details";
import TransferSearchHero from "@/components/transfer/transfer-search-hero";
import TravelTips from "@/components/transfer/travel-tips";

export default function PrivateCarTransfer() {
  return (
    <div>
      <TransferSearchHero />
      <TransferJourneyDetails />
      <SightsAlongTheWay />
      <TravelTips />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
