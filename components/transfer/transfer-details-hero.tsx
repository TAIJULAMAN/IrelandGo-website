"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Users,
  Star,
  ChevronRight,
  ChevronLeft,
  ImageIcon,
  Route as RouteIcon,
} from "lucide-react";
import { DayTripPhotosModal } from "@/components/day-trips/day-trips-details/day-trip-photos-modal";

interface TransferDetailsHeroProps {
  transferRoute?: any;
}

export default function TransferDetailsHero({
  transferRoute,
}: TransferDetailsHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );

  const fromCity = transferRoute?.from || "Dublin";
  const toCity = transferRoute?.to || "Destination";
  const displayTitle =
    transferRoute?.h1 ||
    transferRoute?.title?.replace(/\s*\|\s*Tourenzo\s*$/i, "") ||
    `Private Transfer from ${fromCity} to ${toCity}`;

  const displayDescription =
    transferRoute?.description ||
    `Experience a direct, comfortable private chauffeur transfer from ${fromCity} to ${toCity} with professional drivers, luggage assistance, and transparent pricing.`;

  // Calculate Duration
  const totalMinutes = transferRoute?.travelTimeMinutes || 90;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const durationFormatted =
    hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;

  const rawImages: string[] = (
    Array.isArray(transferRoute?.images) && transferRoute.images.length > 0
      ? transferRoute.images
      : transferRoute?.image
        ? [transferRoute.image]
        : []
  ).filter((img: any) => typeof img === "string" && img.trim().length > 0);

  const fallbackImages = [
    "/attractions/2.webp",
    "/by-the-hour.jpg",
    "/attractions/3.jpg",
    "/attractions/4.jpg",
    "/attractions/5.jpg",
    "/attractions/6.webp",
    "/details.png",
  ];

  const allImages =
    rawImages.length >= 5
      ? rawImages
      : [
          ...rawImages,
          ...fallbackImages.filter((img) => !rawImages.includes(img)),
        ].slice(0, Math.max(5, rawImages.length));

  // Auto-play slideshow on mobile
  useEffect(() => {
    if (isPaused || allImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, allImages.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    setTouchStart(null);
  };

  return (
    <section className="bg-white pt-24 sm:pt-28 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link
            href="/transfer"
            className="hover:text-blue-600 transition-colors"
          >
            Transfers
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">
            {fromCity} to {toCity}
          </span>
        </nav>

        {/* Heading & Subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3">
            {displayTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            {displayDescription}
          </p>

          {/* Quick Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100 shadow-xs">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              {durationFormatted}
            </span>

            {transferRoute?.distanceKm && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-xs">
                <RouteIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                {transferRoute.distanceKm} km
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-200/70 shadow-xs">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
              {fromCity} to {toCity}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-xs">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
              Private Chauffeur Service
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
              {transferRoute?.ratings || "5.0"} (Top Rated)
            </span>
          </div>
        </div>

        {/* Mobile View: Slide Carousel with Left & Right Buttons (< lg) */}
        <div
          className="block lg:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100 h-[280px] sm:h-[360px] md:h-[400px] touch-pan-y select-none"
            onTouchStart={allImages.length > 1 ? handleTouchStart : undefined}
            onTouchEnd={allImages.length > 1 ? handleTouchEnd : undefined}
          >
            {allImages.length === 1 ? (
              <div className="relative w-full h-full">
                <Image
                  src={allImages[0]}
                  alt={`${fromCity} to ${toCity} photo`}
                  fill
                  priority
                  unoptimized={
                    typeof allImages[0] === "string" &&
                    allImages[0].startsWith("http")
                  }
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <>
                {/* Sliding Track */}
                <div
                  className="flex h-full transition-transform duration-500 ease-out"
                  style={{
                    width: `${allImages.length * 100}%`,
                    transform: `translateX(-${(currentIndex * 100) / allImages.length}%)`,
                  }}
                >
                  {allImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-full shrink-0"
                      style={{ width: `${100 / allImages.length}%` }}
                    >
                      <Image
                        src={img}
                        alt={`${fromCity} to ${toCity} photo ${idx + 1}`}
                        fill
                        priority={idx === 0}
                        unoptimized={
                          typeof img === "string" && img.startsWith("http")
                        }
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                    </div>
                  ))}
                </div>

                {/* Left & Right Controls */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white active:scale-90 text-gray-900 shadow-[0_4px_16px_rgba(0,0,0,0.22)] border border-gray-200/90 flex items-center justify-center transition-all z-20 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-900 -ml-0.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white active:scale-90 text-gray-900 shadow-[0_4px_16px_rgba(0,0,0,0.22)] border border-gray-200/90 flex items-center justify-center transition-all z-20 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900 -mr-0.5" />
                </button>

                {/* Bottom Overlay: Dots & Counter */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  <div className="flex items-center gap-1.5 pointer-events-auto">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIndex === idx
                            ? "w-6 bg-white shadow-sm"
                            : "w-2 bg-white/60 hover:bg-white/90"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-xs shadow-md">
                    {currentIndex + 1} / {allImages.length}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop View: 5-Image Grid Design (>= lg) */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 rounded-xl h-[380px] lg:h-[460px]">
            {/* Main Large Image (Left 2 cols) */}
            <div
              onClick={() => {
                setSelectedPhotoIndex(0);
                setIsPhotosModalOpen(true);
              }}
              className="md:col-span-2 relative h-full group overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
            >
              <Image
                src={allImages[0]}
                alt={`${fromCity} to ${toCity} primary photo`}
                fill
                priority
                unoptimized={
                  typeof allImages[0] === "string" &&
                  allImages[0].startsWith("http")
                }
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* 4 Smaller Images (Right 2 cols in 2x2 grid) */}
            <div className="md:col-span-2 grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 h-full">
              {allImages.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedPhotoIndex(idx + 1);
                    setIsPhotosModalOpen(true);
                  }}
                  className="relative h-full group overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`${fromCity} to ${toCity} photo ${idx + 2}`}
                    fill
                    unoptimized={
                      typeof img === "string" && img.startsWith("http")
                    }
                    sizes="25vw"
                    className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* "Show all X photos" Frosted-Glass Pill Button */}
          <button
            type="button"
            onClick={() => {
              setSelectedPhotoIndex(null);
              setIsPhotosModalOpen(true);
            }}
            className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-neutral-900/60 hover:bg-neutral-900/80 text-white backdrop-blur-md border border-white/25 shadow-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 shrink-0 text-white" />
            <span>Show all {allImages.length} photos</span>
          </button>
        </div>
      </div>

      {/* Photos & Details Modal */}
      <DayTripPhotosModal
        isOpen={isPhotosModalOpen}
        onClose={() => setIsPhotosModalOpen(false)}
        trip={{
          title: `${fromCity} to ${toCity}`,
          to: toCity,
          shortDescription: displayDescription,
        }}
        allImages={allImages}
        initialPhotoIndex={selectedPhotoIndex}
      />
    </section>
  );
}
