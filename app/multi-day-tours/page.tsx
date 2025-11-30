import FAQ from "@/components/day-trips/faq";
import { Footer } from "@/components/layout/footer";
import MultiDayToursHero from "@/components/multi-day-tours/multi-day-tours-hero";
import MultiDayToursJourneyBegins from "@/components/multi-day-tours/multi-day-tours-journey-begins";
import MultiDayToursOurMultiDayTours from "@/components/multi-day-tours/multi-day-tours-our-multi-day-tours";
import { Testimonials } from "@/components/testimonials";

export default function MultiDayTours() {
  return (
    <main>
      <MultiDayToursHero />
      <MultiDayToursJourneyBegins />
      <MultiDayToursOurMultiDayTours />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
