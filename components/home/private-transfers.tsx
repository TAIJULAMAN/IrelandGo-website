"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/loading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetPrivateTransfersQuery } from "@/Redux/features/contents/contentsApi";
import { SectionHeader } from "../ui/section-header";
import PrivateTransferGrid from "./private-transfer-grid";

export function PrivateTransfers() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);
  const {
    data: response,
    isLoading,
    isError,
  } = useGetPrivateTransfersQuery({});
  const transfers = response?.data || [];

  const handleMobileExploreMore = () => {
    if (mobileVisibleCount < transfers.length) {
      setMobileVisibleCount((prev) => prev + 4);
    } else {
      router.push("/transfers");
    }
  };

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
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 2xl:px-0 pt-6 md:pt-8 pb-10 md:pb-12 bg-gray-100 overflow-hidden">
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

        <PrivateTransferGrid
          transfers={transfers}
          visibleTransfers={visibleTransfers}
          mobileVisibleCount={mobileVisibleCount}
          handleMobileExploreMore={handleMobileExploreMore}
        />
      </div>
    </section>
  );
}
