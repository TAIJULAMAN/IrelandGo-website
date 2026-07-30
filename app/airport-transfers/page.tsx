import AirportTransfersHero from "@/components/airport-transfers/airport-transfers-hero";
import AirportTransfersWhyChoose from "@/components/airport-transfers/airport-transfers-why-choose";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";

export default function AirportTransfers() {
  return (
    <>
      <AirportTransfersHero />
      <AirportTransfersWhyChoose />
      <Testimonials />
      <FAQ />
    </>
  );
}
