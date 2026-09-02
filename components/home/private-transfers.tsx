"use client";

import { useState } from "react";
import Link from "next/link";
import Loading from "@/components/common/loading";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Clock,
  Route,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useGetPrivateTransfersQuery } from "@/Redux/features/contents/contentsApi";
import { SectionHeader } from "../ui/section-header";
import { useRouter } from "next/navigation";

export function PrivateTransfers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: response,
    isLoading,
    isError,
  } = useGetPrivateTransfersQuery({});
  const transfers = response?.data || [];

  const goToPrevious = () => {
    if (transfers.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? transfers.length - 1 : prevIndex - 1,
    );
  };
  const goToNext = () => {
    if (transfers.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === transfers.length - 1 ? 0 : prevIndex + 1,
    );
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

  const showSlider = transfers.length > 4;
  const visibleTransfers = showSlider
    ? [
        transfers[currentIndex % transfers.length],
        transfers[(currentIndex + 1) % transfers.length],
        transfers[(currentIndex + 2) % transfers.length],
        transfers[(currentIndex + 3) % transfers.length],
      ].filter(Boolean)
    : transfers.slice(0, 4);

  if (isLoading) {
    return (
      <section className="relative px-5 md:px-0 py-10 md:py-16 bg-gray-50/50 overflow-hidden">
        <Loading />
      </section>
    );
  }

  if (isError || transfers.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 font-medium">
          No private transfers available at the moment.
        </p>
      </div>
    );
  }

  return (
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 2xl:px-0 pt-6 md:pt-8 pb-10 md:pb-12 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[5%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/80 blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50/80 blur-3xl mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-10 gap-6 relative">
          {showSlider && (
            <button
              onClick={goToPrevious}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:-translate-x-1"
              aria-label="Previous transfers"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="flex-1 w-full max-w-3xl mx-auto">
            <SectionHeader
              title="Private Transfers"
              subtitle="Reliable Chauffeur"
              description="Explore our most popular private transfers."
              alignment="center"
              className="mb-0"
            />
          </div>

          {showSlider && (
            <button
              onClick={goToNext}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:translate-x-1"
              aria-label="Next transfers"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {visibleTransfers.map((transfer: any, idx: number) => (
            <div key={transfer.id || idx} className="card-theme group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="card-image-wrapper z-10">
                <Image
                  src={transfer.images?.[0] || "/placeholder.svg"}
                  alt={`${transfer.from} to ${transfer.to}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1 relative z-10 justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3 gap-1 sm:gap-2">
                    <span
                      className="font-bold text-gray-900 text-sm sm:text-base md:text-lg truncate max-w-[80px] sm:max-w-[110px] md:max-w-[130px] group-hover:text-blue-600 transition-colors"
                      title={transfer.from}
                    >
                      {transfer.from}
                    </span>
                    <div className="flex items-center shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Image
                        src="/divider.png"
                        alt="to"
                        width={80}
                        height={12}
                        className="w-8 sm:w-12 md:w-16 h-auto"
                      />
                    </div>
                    <span
                      className="font-bold text-gray-900 text-sm sm:text-base md:text-lg truncate max-w-[80px] sm:max-w-[110px] md:max-w-[130px] group-hover:text-blue-600 transition-colors"
                      title={transfer.to}
                    >
                      {transfer.to}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                    <span className="card-badge text-xs whitespace-nowrap">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {renderDuration(transfer.travelTimeMinutes)}
                    </span>
                    <span className="card-badge-indigo text-xs whitespace-nowrap">
                      <Route className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {transfer.distanceKm} km
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <Link
                    href={`/transfers/${(transfer.from || "dublin").toLowerCase().replace(/\s+/g, "-")}-to-${(transfer.to || "destination").toLowerCase().replace(/\s+/g, "-")}/`}
                    onClick={() => {
                      try {
                        sessionStorage.setItem(
                          "current_transfer_route",
                          JSON.stringify(transfer),
                        );
                      } catch (e) {}
                    }}
                    className="btn-theme-primary w-full group/btn"
                  >
                    <span className="tracking-wide">Book Now</span>
                    <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
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
              aria-label="Previous transfers"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95 transition-all"
              aria-label="Next transfers"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
