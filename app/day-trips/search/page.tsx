import { Metadata } from "next";
import { SearchHero } from "@/components/day-trips/search/search-hero";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";

export const metadata: Metadata = {
  title: "Ireland Day Trips | Private Day Tours | Tourenzo",
  description:
    "Discover the best of Ireland with our private day trips. Experience breathtaking landscapes, historic sites, and unforgettable adventures with Tourenzo.",
};

export default function DayTripSearchPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <SearchHero />
      <div className="max-w-7xl mx-auto py-12"></div>
      <Testimonials />
      <FAQ />
    </main>
  );
}
