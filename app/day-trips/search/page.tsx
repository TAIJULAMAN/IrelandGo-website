"use client";

import { Suspense } from "react";

import { SearchHero } from "@/components/day-trips/search/search-hero";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";
import { Footer } from "@/components/layout/footer";

export default function DayTripSearchPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <SearchHero />
      <div className="container mx-auto py-12">
      </div>
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
