"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import PopularDayTripGrid from "./popular-day-trip-grid";

export function PopularDayTripsClient({ trips }: { trips: any[] }) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);

  const handleMobileExploreMore = () => {
    if (mobileVisibleCount < trips.length) {
      setMobileVisibleCount((prev) => prev + 4);
    } else {
      router.push("/day-trips");
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!trips || trips.length === 0) return null;

  return (
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-8 md:py-10 xl:py-12 bg-gray-100 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-violet-50/40 blur-3xl opacity-50 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-6 md:mb-10 gap-6 relative">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:-translate-x-1 shrink-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 w-full max-w-3xl mx-auto">
            <SectionHeader
              title="Popular Day Trips"
              description="Discover our most breathtaking day trip destinations, carefully curated for you."
              alignment="center"
              className="mb-0"
            />
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:translate-x-1 shrink-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <PopularDayTripGrid
          trips={trips}
          mobileVisibleCount={mobileVisibleCount}
          handleMobileExploreMore={handleMobileExploreMore}
        />
      </div>
    </section>
  );
}
