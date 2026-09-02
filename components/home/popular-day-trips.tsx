"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/common/loading";
import { useGetPopularTripsQuery } from "@/Redux/features/contents/contentsApi";
import { SectionHeader } from "@/components/ui/section-header";

export function PopularDayTrips() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: response, isLoading, isError } = useGetPopularTripsQuery({});
  const trips = response?.data || [];
  console.log("trip of aaaaaaaaaaaaaaaaaaaaaa", trips);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const renderDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return (
        <span>
          {hours}h
          {mins > 0 && <span className="hidden sm:inline"> {mins}m</span>}
        </span>
      );
    }
    return <span>{mins}m</span>;
  };

  if (isLoading) {
    return (
      <section className="relative px-5 md:px-0 py-10 md:py-16 bg-gray-50/50 overflow-hidden">
        <Loading />
      </section>
    );
  }

  if (isError || trips.length === 0) return null;

  return (
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-8 md:py-10 xl:py-12 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-violet-50/40 blur-3xl opacity-50 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header row with arrows */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-6 md:mb-10 gap-6 relative">
          {/* Left arrow */}
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
              subtitle="Explore Ireland"
              description="Discover our most breathtaking day trip destinations, carefully curated for you."
              alignment="center"
              className="mb-0"
            />
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:translate-x-1 shrink-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {trips.slice(0, 4).map((trip: any, idx: number) => (
            <div key={trip.id || idx} className="card-theme group">
              {/* Subtle Glow Behind Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="card-image-wrapper z-10">
                <Image
                  src={trip.images?.[0] || "/placeholder.svg"}
                  alt={trip.to}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-70" />
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1 relative z-10 justify-between gap-3">
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
                    {trip.from} to {trip.to}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                    {trip.description?.replace(/<[^>]*>?/gm, "")}
                  </p>

                  <div className="flex items-center gap-1.5 sm:gap-2 mb-3">
                    <span className="card-badge">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {renderDuration(trip.travelTimeMinutes)}
                    </span>
                    {trip.groupType && (
                      <span className="card-badge-indigo">
                        <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {trip.groupType}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <div className="flex items-center justify-between mb-3 pt-2 border-t border-gray-100">
                    <span className="text-xs sm:text-sm font-medium text-gray-500">
                      Starts from
                    </span>
                    <span className="text-blue-600 font-extrabold text-sm sm:text-lg">
                      €
                      {trip.price ??
                        (trip.vehicles?.length
                          ? Math.min(...trip.vehicles.map((v: any) => v.price))
                          : 0)}
                    </span>
                  </div>

                  <Button asChild className="w-full">
                    <Link
                      href={`/day-trips/day-trip-details/${trip.id}`}
                      className="group/btn"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile arrow buttons */}
        <div className="flex md:hidden items-center justify-center gap-6 mt-8">
          <button
            onClick={() => scroll("left")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
