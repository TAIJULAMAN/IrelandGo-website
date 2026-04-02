import AirportTransfersHero from "@/components/airport-transfers/airport-transfers-hero";
import AirportTransfersWhyChoose from "@/components/airport-transfers/airport-transfers-why-choose";
import FAQ from "@/app/settings/faq/faq";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/common/testimonials";

export default function AirportTransfers() {
  return (
    <div>
      <AirportTransfersHero />
      <AirportTransfersWhyChoose />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
