import Hero from "@/components/tours/hero";
import { PopularDayTrips } from "@/components/popular-day-trips";
import { PopularMultiDayTours } from "@/components/popular-multi-day-tours";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/layout/footer";

export default function ToursPage() {
    return (
        <main>
            <Hero />
            <PopularDayTrips />
            <PopularMultiDayTours />
            <Testimonials />
            <Footer />
        </main>
    )
}
