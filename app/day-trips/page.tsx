import { Metadata } from "next";
import dynamic from "next/dynamic";

const Expectations = dynamic(() => import("@/components/day-trips/expectations"));
const FAQ = dynamic(() => import("@/app/settings/faq/faq"));
const Memories = dynamic(() => import("@/components/day-trips/memories"));
const TripCards = dynamic(() => import("@/components/day-trips/trip-cards"));
const Testimonials = dynamic(() => import("@/components/common/testimonials").then((m) => ({ default: m.Testimonials })));

export const metadata: Metadata = {
  title: "Ireland Day Trips | Private Day Tours | Tourenzo",
  description:
    "Explore the wonders of Ireland with our curated day trips and private tours. Enjoy comfortable rides, expert local drivers, and unforgettable memories.",
};

export default function DayTrips() {
  return (
    <main className="flex flex-col min-h-screen">
      <TripCards />
      <Expectations />
      <Memories />
      <Testimonials />
      <FAQ />
    </main>
  );
}
