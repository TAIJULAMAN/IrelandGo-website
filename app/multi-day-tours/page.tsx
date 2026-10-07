import MultiDayToursHero from "@/components/multi-day-tours/multi-day-tours-hero";
import MultiDayToursJourneyBegins from "@/components/multi-day-tours/multi-day-tours-journey-begins";
import MultiDayToursOurMultiDayTours from "@/components/multi-day-tours/multi-day-tours-our-multi-day-tours";
import { Testimonials } from "@/components/common/testimonials";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Day Tours Ireland | Private Guided Tours | Tourenzo",
  description: "Explore the best of Ireland with our private multi-day tours. Enjoy guided experiences, tailored itineraries, and unforgettable memories across the Emerald Isle.",
};

export default function MultiDayTours() {
  return (
    <>
      <MultiDayToursHero />
      <MultiDayToursOurMultiDayTours />
      <MultiDayToursJourneyBegins />
      <Testimonials />
    </>
  );
}
