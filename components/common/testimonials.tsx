"use client";

import { useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  AlertCircle,
} from "lucide-react";
import { useGetAllReviewQuery } from "@/Redux/features/review/reviewApi";
import { SectionHeader } from "../ui/section-header";
import Image from "next/image";
import Loading from "./loading";

interface Review {
  id: string;
  userId: string;
  tripServiceId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    profileImage: string;
    contactNumber: string;
  };
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, error, isLoading } = useGetAllReviewQuery(undefined);
  const reviews: Review[] = data?.data || [];

  if (error) {
    return (
      <section className="relative px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 mb-12 flex justify-center">
          <SectionHeader
            title="What Our Customers Say"
            subtitle="Testimonials"
            description="Trusted by happy travelers worldwide for our premium service and local expertise."
            alignment="center"
            className="mb-0"
          />
        </div>
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-5">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Unable to Load Testimonials
          </h3>
          <p className="text-gray-500 mb-8 max-w-md">
            We're having trouble retrieving the latest reviews from our server
            right now. This is likely due to an authorization or network issue.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors shadow-sm active:scale-95"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const goToPrevious = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const showSlider = reviews.length > 4;
  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    if (!showSlider) return reviews.slice(0, 4);
    return [
      reviews[currentIndex % reviews.length],
      reviews[(currentIndex + 1) % reviews.length],
      reviews[(currentIndex + 2) % reviews.length],
      reviews[(currentIndex + 3) % reviews.length],
    ].filter(Boolean);
  };


  const visibleReviews = getVisibleReviews();
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section className="relative px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-16 md:py-24 bg-gray-50/50 overflow-hidden">
        <Loading />
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="relative px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-100/40 blur-3xl opacity-50 mix-blend-multiply" />
        <div className="absolute top-[30%] left-[30%] w-[30%] h-[30%] rounded-full bg-indigo-50/50 blur-3xl opacity-40 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          {showSlider && (
            <button
              onClick={goToPrevious}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-lg hover:-translate-x-1 transition-all duration-300 z-10"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="flex-1 flex justify-center">
            <SectionHeader
              title="What Our Customers Say"
              subtitle="Testimonials"
              description="Trusted by happy travelers worldwide for our premium service and local expertise."
              alignment="center"
              className="mb-0"
            />
          </div>

          {showSlider && (
            <button
              onClick={goToNext}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-lg hover:translate-x-1 transition-all duration-300 z-10"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative">
          {visibleReviews.map((review, idx) => (
            <div
              key={review.id || idx}
              className="group bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-6 md:p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-white h-full flex flex-col transition-all duration-500 hover:-translate-y-1 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-3 sm:p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                <Quote className="w-8 h-8 sm:w-16 sm:h-16 text-blue-600" />
              </div>

              <div className="flex items-center justify-between mb-3 sm:mb-6 relative z-10">
                <div className="flex gap-0.5 sm:gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-8 leading-relaxed flex-grow relative z-10 group-hover:text-gray-800 transition-colors duration-300 italic line-clamp-3 sm:line-clamp-none">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-2 sm:gap-4 relative z-10 mt-auto">
                <div className="relative shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md ring-1 sm:ring-2 ring-white">
                  {review.user?.profileImage ? (
                    <Image
                      src={review.user.profileImage}
                      alt={review.user.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    getInitials(review.user?.fullName || "Traveler")
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-xs sm:text-sm md:text-base group-hover:text-blue-700 transition-colors duration-300 truncate">
                    {review.user?.fullName || "Traveler"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {formatDate(review.createdAt)}
                  </p>
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
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all active:scale-95"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all active:scale-95"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
