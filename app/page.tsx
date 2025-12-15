import { Header } from "@/components/common/header"
import { Hero } from "@/components/home/hero"
import { PrivateTransfers } from "@/components/home/private-transfers"
import { HowItWorks } from "@/components/home/how-it-works"
import { PopularDayTrips } from "@/components/home/popular-day-trips"
import { PopularMultiDayTours } from "@/components/home/popular-multi-day-tours"
import { SafetyComfort } from "@/components/home/safety-comfort"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { Testimonials } from "@/components/common/testimonials"
import { Footer } from "@/components/layout/footer"
import { NewsLetter } from "@/components/home/news-letter"

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
