import { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PrivateTransfers } from "@/components/home/private-transfers";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Private Transfers & Chauffeur Service | Tourenzo",
  description:
    "Experience Ireland with premium private transfers, bespoke day trips, and multi-day tours. Book your professional driver today.",
  openGraph: {
    title: "IrelandGo | Premium Private Transfers & Day Tours",
    description:
      "Experience Ireland with premium private transfers, bespoke day trips, and multi-day tours.",
    type: "website",
  },
};

const HowItWorks = dynamic(() =>
  import("@/components/home/how-it-works").then((m) => ({
    default: m.HowItWorks,
  })),
);
const PopularDayTrips = dynamic(
  () =>
    import("@/components/home/popular-day-trips").then((m) => ({
      default: m.PopularDayTrips,
    })),
  {
    loading: () => (
      <section className="min-h-[500px] w-full animate-pulse bg-gray-50/20" />
    ),
  },
);
const PopularMultiDayTours = dynamic(
  () =>
    import("@/components/home/popular-multi-day-tours").then((m) => ({
      default: m.PopularMultiDayTours,
    })),
  {
    loading: () => (
      <section className="min-h-[500px] w-full animate-pulse bg-gray-50/20" />
    ),
  },
);
const SafetyComfort = dynamic(() =>
  import("@/components/home/safety-comfort").then((m) => ({
    default: m.SafetyComfort,
  })),
);
const WhyChooseUs = dynamic(() =>
  import("@/components/home/why-choose-us").then((m) => ({
    default: m.WhyChooseUs,
  })),
);
const Testimonials = dynamic(() =>
  import("@/components/common/testimonials").then((m) => ({
    default: m.Testimonials,
  })),
);
const RecentBlogs = dynamic(() =>
  import("@/components/home/recent-blogs").then((m) => ({
    default: m.RecentBlogs,
  })),
);
const NewsLetter = dynamic(() =>
  import("@/components/home/news-letter").then((m) => ({
    default: m.NewsLetter,
  })),
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden relative">
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
  );
}
