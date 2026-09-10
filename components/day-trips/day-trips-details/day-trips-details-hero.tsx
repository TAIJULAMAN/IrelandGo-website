"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, Star, ChevronRight } from "lucide-react";

export default function DayTripsDetailsHero({ trip }: { trip: any }) {
  // Format duration
  const totalMinutes = trip?.travelTimeMinutes || 480;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const durationFormatted =
    hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;

  // Curated local Irish attraction photos as fallbacks so gallery always has 5 images
  const defaultImages = [
    "/attractions/1.jpg",
    "/attractions/2.webp",
    "/attractions/3.jpg",
    "/attractions/4.jpg",
    "/attractions/5.jpg",
  ];

  const rawImages =
    Array.isArray(trip?.images) && trip.images.length > 0
      ? trip.images
      : [trip?.image || "/details.png"];

  const allImages = [...rawImages];
  while (allImages.length < 5) {
    allImages.push(defaultImages[allImages.length % defaultImages.length]);
  }

  return (
    <section className="bg-white pt-24 sm:pt-28 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/day-trips" className="hover:text-blue-600 transition-colors">
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

        {/* Grid of Images */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 rounded-2xl overflow-hidden h-[300px] sm:h-[400px] md:h-[460px] shadow-sm border border-gray-100">
          {/* Main Large Image (Left 2 cols) */}
          <div className="md:col-span-2 relative h-full group overflow-hidden bg-gray-100 cursor-pointer">
            <Image
              src={allImages[0]}
              alt={trip?.title || "Day trip primary photo"}
              fill
              priority
              unoptimized={typeof allImages[0] === "string" && allImages[0].startsWith("http")}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>

          {/* 4 Smaller Images (Right 2 cols in 2x2 grid) */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 h-full">
            {allImages.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className="relative h-full group overflow-hidden bg-gray-100 cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`${trip?.title || "Day trip"} photo ${idx + 2}`}
                  fill
                  unoptimized={typeof img === "string" && img.startsWith("http")}
                  sizes="25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
