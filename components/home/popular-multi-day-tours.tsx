"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/common/loading";
import { useGetPopularMultiDayToursQuery } from "@/Redux/features/contents/contentsApi";
import { SectionHeader } from "@/components/ui/section-header";

export function PopularMultiDayTours() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: response,
    isLoading,
    isError,
  } = useGetPopularMultiDayToursQuery({});

  const tours = response?.data || [];
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
  const stripHtml = (html: string) => {
    return html?.replace(/<[^>]*>?/gm, "") || "";
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
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-8 md:py-12 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/80 blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50/80 blur-3xl mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-10 gap-6 relative">
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
              subtitle="Curated Experiences"
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {visibleTours.map((tour: any, idx: number) => (
            <div
              key={tour.id || idx}
              className="card-theme group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="card-image-wrapper z-10">
                <Image
                  src={tour.images?.[0] || "/placeholder.svg"}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60" />

                {tour.tourDays && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-blue-700 shadow-sm border border-white/20">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {tour.tourDays} Day{tour.tourDays > 1 ? "s" : ""}
                  </span>
                )}
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold shadow-sm border border-white/10">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-yellow-400" />{" "}
                  {tour.ratings || "5.0"}
                </span>
              </div>

              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 relative z-10 justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
                    {tour.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                    {stripHtml(tour.description)}
                  </p>
                </div>

                <div className="mt-auto pt-2">
                  <Link href={`/multi-day-tours/${tour.id}`} className="block w-full">
                    <div className="btn-theme-primary w-full group/btn">
                      <span className="tracking-wide">View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Mobile Navigation Buttons */}
        {showSlider && (
          <div className="flex md:hidden items-center justify-center gap-6 mt-10">
            <button
              onClick={goToPrevious}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95 transition-all"
              aria-label="Previous tours"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95 transition-all"
              aria-label="Next tours"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
