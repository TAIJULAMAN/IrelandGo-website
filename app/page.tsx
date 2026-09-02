import { Hero } from "@/components/home/hero"
import { PrivateTransfers } from "@/components/home/private-transfers"
import dynamic from "next/dynamic"

const HowItWorks = dynamic(() => import("@/components/home/how-it-works").then(m => ({ default: m.HowItWorks })))
const PopularDayTrips = dynamic(() => import("@/components/home/popular-day-trips").then(m => ({ default: m.PopularDayTrips })))
const PopularMultiDayTours = dynamic(() => import("@/components/home/popular-multi-day-tours").then(m => ({ default: m.PopularMultiDayTours })))
const SafetyComfort = dynamic(() => import("@/components/home/safety-comfort").then(m => ({ default: m.SafetyComfort })))
const WhyChooseUs = dynamic(() => import("@/components/home/why-choose-us").then(m => ({ default: m.WhyChooseUs })))
const Testimonials = dynamic(() => import("@/components/common/testimonials").then(m => ({ default: m.Testimonials })))
const RecentBlogs = dynamic(() => import("@/components/home/recent-blogs").then(m => ({ default: m.RecentBlogs })))
const NewsLetter = dynamic(() => import("@/components/home/news-letter").then(m => ({ default: m.NewsLetter })))

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
      <RecentBlogs />
      <NewsLetter />
    </main>
  )
}
