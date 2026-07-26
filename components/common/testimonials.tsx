"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
  const { data, isLoading } = useGetAllReviewQuery(undefined);
  const reviews: Review[] = data?.data || [];

  const goToPrevious = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const showSlider = reviews.length >= 3;
  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    if (!showSlider) return reviews;
    return [
      reviews[currentIndex % reviews.length],
      reviews[(currentIndex + 1) % reviews.length],
      reviews[(currentIndex + 2) % reviews.length],
    ];
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {visibleReviews.map((review, idx) => (
            <div
              key={review.id}
              className={`group bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-white h-full flex flex-col transition-all duration-500 hover:-translate-y-1 overflow-hidden relative ${showSlider && idx === 1 ? "hidden md:flex" : ""} ${showSlider && idx === 2 ? "hidden lg:flex" : ""}`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                <Quote className="w-16 h-16 text-blue-600" />
              </div>

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 md:w-5 md:h-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed flex-grow relative z-10 group-hover:text-gray-800 transition-colors duration-300 italic">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
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
                <div>
                  <p className="font-bold text-gray-900 text-sm md:text-base group-hover:text-blue-700 transition-colors duration-300">
                    {review.user?.fullName || "Traveler"}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
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
