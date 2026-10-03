"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Loading from "@/components/common/loading";
import { useGetPopularMultiDayToursQuery } from "@/Redux/features/contents/contentsApi";
import { SectionHeader } from "@/components/ui/section-header";
import PopularMultiDayTourGrid from "./popular-multi-day-tour-grid";

export function PopularMultiDayTours() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);
  const {
    data: response,
    isLoading,
    isError,
  } = useGetPopularMultiDayToursQuery({});

  const tours = response?.data || [];

  const handleMobileExploreMore = () => {
    if (mobileVisibleCount < tours.length) {
      setMobileVisibleCount((prev) => prev + 4);
    } else {
      router.push("/multi-day-tours");
    }
  };

  const goToPrevious = () => {
    if (tours.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tours.length - 1 : prevIndex - 1,
    );
  };
  const goToNext = () => {
    if (tours.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === tours.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const showSlider = tours.length > 4;
  const visibleTours = showSlider
    ? [
        tours[currentIndex % tours.length],
        tours[(currentIndex + 1) % tours.length],
        tours[(currentIndex + 2) % tours.length],
        tours[(currentIndex + 3) % tours.length],
      ].filter(Boolean)
    : tours.slice(0, 4);

  if (isLoading) {
    return (
      <section className="relative px-5 md:px-0 py-10 md:py-16 bg-white overflow-hidden">
        <Loading />
      </section>
    );
  }

  if (isError || tours.length === 0) {
    return null;
  }

  return (
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-6 md:py-8 lg:py-10 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/80 blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50/80 blur-3xl mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6 gap-4 md:gap-6 relative">
          {showSlider && (
            <button
              onClick={goToPrevious}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:-translate-x-1 shrink-0"
              aria-label="Previous tours"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="flex-1 w-full max-w-3xl mx-auto">
            <SectionHeader
              title="Popular Multi-Day Tours"
              description="Discover Ireland's most breathtaking destinations with our carefully curated multi-day experiences."
              alignment="center"
              className="mb-0"
            />
          </div>

          {showSlider && (
            <button
              onClick={goToNext}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:translate-x-1 shrink-0"
              aria-label="Next tours"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        <PopularMultiDayTourGrid
          tours={tours}
          visibleTours={visibleTours}
          mobileVisibleCount={mobileVisibleCount}
          handleMobileExploreMore={handleMobileExploreMore}
        />
      </div>
    </section>
  );
}
