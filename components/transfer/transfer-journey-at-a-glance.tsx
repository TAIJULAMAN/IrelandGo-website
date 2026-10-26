"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, MapPin, Info, ShieldCheck } from "lucide-react";
import { DayTripPhotosModal } from "@/components/day-trips/day-trips-details/day-trip-photos-modal";

interface TransferJourneyAtAGlanceProps {
  transferRoute?: any;
  pickupLocation?: string;
  dropoffLocation?: string;
}

export function TransferJourneyAtAGlance({
  transferRoute,
  pickupLocation,
  dropoffLocation,
}: TransferJourneyAtAGlanceProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const startCity = pickupLocation || transferRoute?.from || "Dublin";
  const endCity = dropoffLocation || transferRoute?.to || "Destination";

  const rawImages = (
    Array.isArray(transferRoute?.images) && transferRoute.images.length > 0
      ? transferRoute.images
      : transferRoute?.image
        ? [transferRoute.image]
        : []
  ).filter((img: any) => typeof img === "string" && img.trim().length > 0);

  const fallbackAttractionImages = [
    "/attractions/2.webp",
    "/by-the-hour.jpg",
    "/attractions/3.jpg",
    "/attractions/4.jpg",
    "/attractions/5.jpg",
    "/attractions/6.webp",
    "/details.png",
  ];

  const allTripImages = [...rawImages];
  for (const fallback of fallbackAttractionImages) {
    if (allTripImages.length >= 6) break;
    if (!allTripImages.includes(fallback)) {
      allTripImages.push(fallback);
    }
  }

  // Format Duration
  const totalMinutes = transferRoute?.travelTimeMinutes || 90;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const durationFormatted =
    hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}m` : ""}` : `${mins}m`;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        Your journey at a glance
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
              Pickup in {startCity}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              You choose the pickup spot (airport, hotel, or private address).
              We'll meet you there.
            </p>
          </div>
        </div>

        {/* 2. Direct Chauffeur Transfer Leg */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Left Track: Marker + Vertical Line */}
          <div className="flex flex-col items-center shrink-0 self-stretch">
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              1
            </div>
            <div className="w-0.5 bg-blue-200/90 flex-1 my-1.5" />
          </div>

          {/* Right Content */}
          <div className="pb-8 min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Direct Chauffeur Drive to {endCity}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Relax in an executive air-conditioned vehicle with complimentary
              bottled water and luggage handling.
            </p>

            {/* Duration info */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 font-medium mt-2">
              <Clock className="w-4 h-4 text-gray-500 shrink-0" />
              <span>
                Estimated Travel Time: {durationFormatted}
                {transferRoute?.distanceKm
                  ? ` • ${transferRoute.distanceKm} km`
                  : ""}
              </span>
            </div>

            {/* Route Images (2 side-by-side) */}
            <div className="grid grid-cols-2 gap-3 max-w-md sm:max-w-lg mt-3">
              {allTripImages
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
                      alt={`${startCity} to ${endCity} preview ${imgIdx + 1}`}
                      fill
                      unoptimized={
                        typeof imgUrl === "string" && imgUrl.startsWith("http")
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

        {/* 3. Destination Point */}
        <div className="flex items-start gap-3.5 sm:gap-4">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-5 h-5 flex items-center justify-center shrink-0 text-blue-600 mt-0.5">
              <MapPin className="w-5 h-5 text-blue-600 fill-blue-600" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              Drop-off in {endCity}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Direct drop-off at your hotel, home, or chosen drop-off location.
            </p>
          </div>
        </div>
      </div>

      {/* Details & Photos Modal with exact 2-column image layout */}
      <DayTripPhotosModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        trip={{
          title: `${startCity} to ${endCity}`,
          to: endCity,
          shortDescription: `Private chauffeur transfer from ${startCity} to ${endCity}.`,
        }}
        allImages={allTripImages}
        initialPhotoIndex={selectedPhotoIndex}
      />
    </div>
  );
}
