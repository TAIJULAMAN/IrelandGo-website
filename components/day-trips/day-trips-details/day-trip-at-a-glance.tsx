"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, MapPin, Info } from "lucide-react";
import { DayTripPhotosModal } from "./day-trip-photos-modal";

interface DayTripAtAGlanceProps {
  trip: any;
  pickupLocation?: string;
  dropoffLocation?: string;
}

export function DayTripAtAGlance({
  trip,
  pickupLocation,
}: DayTripAtAGlanceProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const startCity = pickupLocation || trip?.from || "Dublin";

  const rawImages = (
    Array.isArray(trip?.images) && trip.images.length > 0
      ? trip.images
      : trip?.image
        ? [trip.image]
        : []
  ).filter((img: any) => typeof img === "string" && img.trim().length > 0);

  const fallbackAttractionImages = [
    "/attractions/2.webp",
    "/attractions/3.jpg",
    "/attractions/4.jpg",
    "/attractions/5.jpg",
    "/attractions/6.webp",
    "/details.png",
    "/day-trips.jpg",
  ];

  const allTripImages = [...rawImages];
  for (const fallback of fallbackAttractionImages) {
    if (allTripImages.length >= 6) break;
    if (!allTripImages.includes(fallback)) {
      allTripImages.push(fallback);
    }
  }

  // Calculate stop duration
  const totalMinutes = trip?.travelTimeMinutes || 480;
  const stopMinutes = Math.max(120, totalMinutes - 120);
  const stopHours = Math.floor(stopMinutes / 60);
  const stopMins = stopMinutes % 60;
  const stopDurationStr =
    stopHours > 0
      ? `${stopHours} hour${stopHours > 1 ? "s" : ""}${
          stopMins > 0 ? ` ${stopMins} mins` : ""
        }`
      : `${stopMins} mins`;

  // Determine stops list
  const stops =
    Array.isArray(trip?.stops) && trip.stops.length > 0
      ? trip.stops
      : [
          {
            name: trip?.to || "Cliffs of Moher",
            description: "Feel free to explore at your own pace and discover",
            duration: stopDurationStr,
            admission: "admission not included",
            openingHours: "Open daily • Regular visiting hours",
            images: allTripImages.slice(0, 2),
            allImages: allTripImages,
          },
        ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        Your trip at a glance
      </h2>

      <div className="space-y-0">
        {/* 1. Start Point */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Left Track: Marker + Vertical Line */}
          <div className="flex flex-col items-center shrink-0 self-stretch">
            <div className="w-5 h-5 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
            </div>
            <div className="w-0.5 bg-blue-200/90 flex-1 my-1.5" />
          </div>

          {/* Right Content */}
          <div className="pb-8 min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Start in {startCity}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              You choose the pickup spot. We'll meet you there.
            </p>
          </div>
        </div>

        {/* 2. Stops */}
        {stops.map((stop: any, idx: number) => {
          const stopPhotos = stop.images || allTripImages.slice(0, 2);

          return (
            <div key={idx} className="flex items-start gap-3.5 sm:gap-4">
              {/* Left Track: Marker + Vertical Line */}
              <div className="flex flex-col items-center shrink-0 self-stretch">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  {idx + 1}
                </div>
                <div className="w-0.5 bg-blue-200/90 flex-1 my-1.5" />
              </div>

              {/* Right Content */}
              <div className="pb-8 min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  {stop.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                  {stop.description ||
                    "Feel free to explore at your own pace and discover"}
                </p>

                {/* Stop duration & admission */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 font-medium mt-2">
                  <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>
                    Stop: {stop.duration || stopDurationStr} - admission not
                    included
                  </span>
                </div>

                {/* Opening hours */}
                <div className="mt-1">
                  <span className="text-xs sm:text-sm text-gray-800 font-semibold block">
                    Opening hours
                  </span>
                </div>

                {/* Stop Images (2 side-by-side) */}
                <div className="grid grid-cols-2 gap-3 max-w-md sm:max-w-lg mt-3">
                  {stopPhotos
                    .slice(0, 2)
                    .map((imgUrl: string, imgIdx: number) => (
                      <div
                        key={imgIdx}
                        onClick={() => {
                          setSelectedPhotoIndex(imgIdx);
                          setIsDetailsOpen(true);
                        }}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-xs border border-gray-100 group cursor-pointer"
                      >
                        <Image
                          src={imgUrl}
                          alt={`${stop.name} photo ${imgIdx + 1}`}
                          fill
                          unoptimized={
                            typeof imgUrl === "string" &&
                            imgUrl.startsWith("http")
                          }
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                </div>

                {/* More details & photos Link */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhotoIndex(null);
                    setIsDetailsOpen(true);
                  }}
                  className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline mt-2.5 inline-block text-left cursor-pointer"
                >
                  More details & photos
                </button>
              </div>
            </div>
          );
        })}

        {/* 3. Return Point */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Left Track: Marker only (no line underneath) */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-blue-600 mt-0.5">
              <MapPin className="w-5 h-5 text-blue-600 fill-blue-600" />
            </div>
          </div>

          {/* Right Content */}
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Back to {startCity}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              We'll take you back to your starting point.
            </p>
          </div>
        </div>
      </div>

      {/* Duration of stops notice banner */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 sm:p-4 flex items-center gap-3 text-xs sm:text-sm text-gray-800 font-medium mt-6">
        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
          <Info className="w-3.5 h-3.5 text-white" />
        </div>
        <span>
          Duration of the stops can be changed upon request after booking
        </span>
      </div>

      {/* Details & Photos Modal with responsive grid and lightbox */}
      <DayTripPhotosModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        trip={trip}
        allImages={allTripImages}
        initialPhotoIndex={selectedPhotoIndex}
      />
    </div>
  );
}
