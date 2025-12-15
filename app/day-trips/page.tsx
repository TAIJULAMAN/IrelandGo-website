import Hero from "@/components/day-trips/day-trips-hero";
import Expectations from "@/components/day-trips/expectations";
import FAQ from "@/components/day-trips/faq";
import Memories from "@/components/day-trips/memories";
import TripCards from "@/components/day-trips/trip-cards";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/common/testimonials";

export default function DayTrips() {

    return (
        <main>
            <Hero />
            <TripCards />
            <Expectations />
            <Memories />
            <Testimonials />
            <FAQ />
            <Footer />
        </main>
    )
}


