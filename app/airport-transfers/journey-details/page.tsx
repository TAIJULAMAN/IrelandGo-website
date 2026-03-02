import JourneyDetailsHero from "@/components/airport-transfers/journey-details/journey-details-hero";
import YourJourneyDetails from "@/components/airport-transfers/journey-details/your-journey-details";
import FAQ from "@/app/settings/faq/faq";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/common/testimonials";

export default function JourneyDetails() {
  return (
    <div>
      <JourneyDetailsHero />
      <YourJourneyDetails />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
