import AirportTransfersWhyChoose from "@/components/airport-transfers/airport-transfers-why-choose";
import FAQ from "@/app/settings/faq/faq";
import DreamTour from "@/components/transfer/dream-tour";
import TransfersHero from "@/components/transfer/transfer-hero";

export default function Transfer() {
  return (
    <>
      <TransfersHero />
      <AirportTransfersWhyChoose />
      <DreamTour />
      <FAQ />
    </>
  );
}
