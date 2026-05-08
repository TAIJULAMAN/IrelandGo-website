"use client";

import { Suspense } from "react";

import { SearchHero } from "@/components/day-trips/search/search-hero";
import { LocationGroupedTrips } from "@/components/day-trips/search/location-grouped-trips";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";
import { Footer } from "@/components/layout/footer";

export default function DayTripSearchPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <SearchHero />
      <div className="container mx-auto py-12">
        <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading search results...</div>}>
          <LocationGroupedTrips />
        </Suspense>
      </div>
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
