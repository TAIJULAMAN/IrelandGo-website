import AirportTransfersWhyChoose from "@/components/airport-transfers/airport-transfers-why-choose";
import FAQ from "@/components/day-trips/faq";
import { Footer } from "@/components/layout/footer";
import DreamTour from "@/components/transfer/dream-tour";
import TransfersHero from "@/components/transfer/transfer-hero";

export default function Transfer() {
  return (
    <div>
      <TransfersHero />
      <AirportTransfersWhyChoose />
      <DreamTour />
      <FAQ />
      <Footer />
    </div>
  );
}
