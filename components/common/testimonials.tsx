"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useGetAllReviewQuery } from "@/Redux/features/review/reviewApi";
import { SectionHeader } from "../ui/section-header";
import Image from "next/image";

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
  console.log("review data", data);

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
  // Get up to 3 visible testimonials based on current index
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

  // Generate initials from name as fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="px-5 md:px-0 py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeader
            title="What Our Customers Say"
            subtitle="Testimonials"
            description="Trusted by happy travelers worldwide for our premium service and local expertise."
            alignment="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100 animate-pulse ${i > 1 ? "hidden md:block" : ""} ${i > 2 ? "hidden lg:block" : ""}`}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={j}
                      className="w-4 h-4 md:w-5 md:h-5 bg-gray-200 rounded"
                    />
                  ))}
                </div>
                <div className="space-y-2 mb-8">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full" />
                  <div className="space-y-1.5">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="px-5 md:px-0 py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
          {showSlider && (
            <button
              onClick={goToPrevious}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <SectionHeader
            title="What Our Customers Say"
            subtitle="Testimonials"
            description="Trusted by happy travelers worldwide for our premium service and local expertise."
            alignment="center"
            className="mb-0"
          />

          {showSlider && (
            <button
              onClick={goToNext}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review, idx) => (
            <div
              key={review.id}
              className={`bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100 h-full flex flex-col ${showSlider && idx === 1 ? "hidden md:flex" : ""} ${showSlider && idx === 2 ? "hidden lg:flex" : ""}`}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 md:w-5 md:h-5 ${i < review.rating ? "fill-blue-600 text-blue-600" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-blue-100" />
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed flex-grow">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs md:text-sm relative">
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
                  <p className="font-bold text-gray-900 text-sm md:text-base">
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
          <div className="flex md:hidden items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
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
