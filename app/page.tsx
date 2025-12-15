import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PrivateTransfers } from "@/components/private-transfers"
import { HowItWorks } from "@/components/how-it-works"
import { PopularDayTrips } from "@/components/popular-day-trips"
import { PopularMultiDayTours } from "@/components/popular-multi-day-tours"
import { SafetyComfort } from "@/components/safety-comfort"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/layout/footer"
import { NewsLetter } from "@/components/news-letter"

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <PrivateTransfers />
      <HowItWorks />
      <PopularDayTrips />
      <PopularMultiDayTours />
      <SafetyComfort />
      <WhyChooseUs />
      <Testimonials />
      <NewsLetter />
      <Footer />
    </main>
  )
}
