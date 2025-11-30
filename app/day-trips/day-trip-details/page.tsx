import DayTripsDetailsHero from "@/components/day-trips/day-trips-details/day-trips-details-hero";
import TripItinerary from "@/components/day-trips/day-trips-details/trip-Itinerary";
import FAQ from "@/components/day-trips/faq";
import { Testimonials } from "@/components/testimonials";

export default function DayTripDetails() {
  return (
    <main>
      <DayTripsDetailsHero />
      <TripItinerary />
      <Testimonials />
      <FAQ />
    </main>
  );
}
