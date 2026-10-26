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
} from "lucide-react";
import { DayTripPhotosModal } from "./day-trip-photos-modal";

export default function DayTripsDetailsHero({ trip }: { trip: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );
  // Format duration
  const totalMinutes = trip?.travelTimeMinutes || 480;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const durationFormatted =
    hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;

  const rawImages: string[] = (
    Array.isArray(trip?.images) && trip.images.length > 0
      ? trip.images
      : trip?.image
        ? [trip.image]
        : ["/details.png"]
  ).filter((img: any) => typeof img === "string" && img.trim().length > 0);

  const allImages = rawImages.length > 0 ? rawImages : ["/details.png"];

  // Auto-play slideshow on mobile every 3.5s (only if multiple images)
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
            href="/day-trips"
            className="hover:text-blue-600 transition-colors"
          >
            Day Trips
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md">
            {trip?.title}
          </span>
        </nav>

        {/* Heading & Subtitle */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3">
            {trip?.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            {trip?.shortDescription ||
              "Explore gorgeous coastal scenery and charming Irish towns on a private, guided day tour."}
          </p>

          {/* Quick Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100 shadow-xs">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              {durationFormatted}
            </span>

            {trip?.from && trip?.to && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-200/70 shadow-xs">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                {trip.from} to {trip.to}
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-xs">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
              {trip?.groupType || "Private Guided Tour"}
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
              {trip?.ratings || "5.0"} (Top Rated)
            </span>
          </div>
        </div>

        {/* Mobile View: Slide Carousel with Left & Right Change Buttons (< lg) */}
        <div
          className="block lg:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Slide Frame */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100 h-[280px] sm:h-[360px] md:h-[400px] touch-pan-y select-none"
            onTouchStart={allImages.length > 1 ? handleTouchStart : undefined}
            onTouchEnd={allImages.length > 1 ? handleTouchEnd : undefined}
          >
            {allImages.length === 1 ? (
              <div className="relative w-full h-full">
                <Image
                  src={allImages[0]}
                  alt={trip?.title || "Day trip photo"}
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
                        alt={`${trip?.title || "Day trip"} photo ${idx + 1}`}
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

                {/* Change Buttons (Left & Right) */}
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

                {/* Bottom Overlay: Dots and Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                  {/* Dots */}
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

                  {/* Counter Badge */}
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-xs shadow-md">
                    {currentIndex + 1} / {allImages.length}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop View (>= lg) */}
        <div className="hidden lg:block relative">
          {allImages.length >= 5 ? (
            /* Exact 5-Image Grid Design */
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
                  alt={trip?.title || "Day trip primary photo"}
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
                      alt={`${trip?.title || "Day trip"} photo ${idx + 2}`}
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
          ) : (
            /* Fewer than 5 images: show actual count without demo filler */
            <div>
              {allImages.length === 1 && (
                <div
                  onClick={() => {
                    setSelectedPhotoIndex(0);
                    setIsPhotosModalOpen(true);
                  }}
                  className="relative w-full h-[380px] lg:h-[460px] rounded-xl overflow-hidden group bg-gray-100 cursor-pointer"
                >
                  <Image
                    src={allImages[0]}
                    alt={trip?.title || "Day trip primary photo"}
                    fill
                    priority
                    unoptimized={
                      typeof allImages[0] === "string" &&
                      allImages[0].startsWith("http")
                    }
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
              )}

              {allImages.length === 2 && (
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 rounded-xl h-[380px] lg:h-[460px]">
                  {allImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedPhotoIndex(idx);
                        setIsPhotosModalOpen(true);
                      }}
                      className="relative h-full group overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
                    >
                      <Image
                        src={img}
                        alt={`${trip?.title || "Day trip"} photo ${idx + 1}`}
                        fill
                        priority={idx === 0}
                        unoptimized={
                          typeof img === "string" && img.startsWith("http")
                        }
                        sizes="50vw"
                        className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              )}

              {allImages.length === 3 && (
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 rounded-xl h-[380px] lg:h-[460px]">
                  <div
                    onClick={() => {
                      setSelectedPhotoIndex(0);
                      setIsPhotosModalOpen(true);
                    }}
                    className="col-span-2 relative h-full group overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
                  >
                    <Image
                      src={allImages[0]}
                      alt={trip?.title || "Day trip primary photo"}
                      fill
                      priority
                      unoptimized={
                        typeof allImages[0] === "string" &&
                        allImages[0].startsWith("http")
                      }
                      sizes="66vw"
                      className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="col-span-1 grid grid-rows-2 gap-2.5 sm:gap-3 md:gap-4 h-full">
                    {allImages.slice(1, 3).map((img, idx) => (
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
                          alt={`${trip?.title || "Day trip"} photo ${idx + 2}`}
                          fill
                          unoptimized={
                            typeof img === "string" && img.startsWith("http")
                          }
                          sizes="33vw"
                          className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {allImages.length === 4 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 md:gap-4 rounded-xl h-[380px] lg:h-[460px]">
                  {allImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedPhotoIndex(idx);
                        setIsPhotosModalOpen(true);
                      }}
                      className="relative h-full group overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
                    >
                      <Image
                        src={img}
                        alt={`${trip?.title || "Day trip"} photo ${idx + 1}`}
                        fill
                        priority={idx === 0}
                        unoptimized={
                          typeof img === "string" && img.startsWith("http")
                        }
                        sizes="50vw"
                        className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* "Show all X photos" Pill Button (Screenshot 1) */}
          <button
            type="button"
            onClick={() => {
              setSelectedPhotoIndex(null);
              setIsPhotosModalOpen(true);
            }}
            className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-neutral-900/60 hover:bg-neutral-900/80 text-white backdrop-blur-md border border-white/25 shadow-lg text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 shrink-0 text-white" />
            <span>
              {allImages.length > 1
                ? `Show all ${allImages.length} photos`
                : "Show photo"}
            </span>
          </button>
        </div>
      </div>

      {/* Photos & Details Modal */}
      <DayTripPhotosModal
        isOpen={isPhotosModalOpen}
        onClose={() => setIsPhotosModalOpen(false)}
        trip={trip}
        allImages={allImages}
        initialPhotoIndex={selectedPhotoIndex}
      />
    </section>
  );
}
