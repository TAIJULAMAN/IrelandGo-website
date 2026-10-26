"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

interface DayTripPhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: any;
  allImages: string[];
  initialPhotoIndex?: number | null;
}

export function DayTripPhotosModal({
  isOpen,
  onClose,
  trip,
  allImages,
  initialPhotoIndex = null,
}: DayTripPhotosModalProps) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    initialPhotoIndex,
  );

  useEffect(() => {
    if (isOpen) {
      setActiveLightboxIndex(initialPhotoIndex);
    } else {
      setActiveLightboxIndex(null);
    }
  }, [isOpen, initialPhotoIndex]);

  const tripTitle = trip?.title || trip?.to || "Day Trip";
  const tripDescription =
    trip?.shortDescription ||
    `Explore ${tripTitle} at your own pace. Your private chauffeur will drop you off right at the main entrance, share helpful local insights, and wait for you while you discover the sights.`;

  const totalPhotos = allImages.length;

  const nextLightbox = useCallback(() => {
    if (activeLightboxIndex === null || totalPhotos <= 1) return;
    setActiveLightboxIndex((prev) =>
      prev === null ? 0 : (prev + 1) % totalPhotos,
    );
  }, [activeLightboxIndex, totalPhotos]);

  const prevLightbox = useCallback(() => {
    if (activeLightboxIndex === null || totalPhotos <= 1) return;
    setActiveLightboxIndex((prev) =>
      prev === null ? 0 : prev === 0 ? totalPhotos - 1 : prev - 1,
    );
  }, [activeLightboxIndex, totalPhotos]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex !== null) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          nextLightbox();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prevLightbox();
        } else if (e.key === "Escape") {
          e.preventDefault();
          setActiveLightboxIndex(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeLightboxIndex, nextLightbox, prevLightbox]);

  return (
    <>
      {/* Main Details & Photos Modal (Exact 2-column image layout) */}
      <Dialog
        open={isOpen && activeLightboxIndex === null}
        onOpenChange={(open) => !open && onClose()}
      >
        <DialogContent className="sm:max-w-2xl max-h-[70vh] overflow-y-auto p-6 rounded-2xl bg-white shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {tripTitle} – Details & Photos
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <p className="text-sm text-gray-600 leading-relaxed">
              {tripDescription}
            </p>

            {/* Exact 2-Column Grid Image Layout */}
            <div className="grid grid-cols-2 gap-3">
              {allImages.map((img: string, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-xs cursor-pointer group"
                >
                  <Image
                    src={img}
                    alt={`${tripTitle} photo ${idx + 1}`}
                    fill
                    unoptimized={
                      typeof img === "string" && img.startsWith("http")
                    }
                    sizes="(max-width: 640px) 50vw, 350px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enlarged Photo Lightbox when an image is clicked */}
      {activeLightboxIndex !== null && (
        <Dialog
          open={activeLightboxIndex !== null}
          onOpenChange={(open) => !open && setActiveLightboxIndex(null)}
        >
          <DialogContent
            showCloseButton={false}
            className="sm:max-w-4xl p-2 bg-black/95 border-0 rounded-2xl overflow-hidden flex flex-col gap-0"
          >
            <DialogTitle className="sr-only">
              {tripTitle} enlarged photo {activeLightboxIndex + 1}
            </DialogTitle>

            <div className="flex items-center justify-between px-4 py-2.5 text-white/90 text-xs sm:text-sm font-medium z-10">
              <span>
                {activeLightboxIndex + 1} / {totalPhotos}
              </span>
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Back to grid"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full h-[65vh] max-h-[550px] flex items-center justify-center">
              <Image
                src={allImages[activeLightboxIndex]}
                alt={`${tripTitle} enlarged photo`}
                fill
                priority
                unoptimized={
                  typeof allImages[activeLightboxIndex] === "string" &&
                  allImages[activeLightboxIndex].startsWith("http")
                }
                className="object-contain"
              />

              {totalPhotos > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevLightbox();
                    }}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-transform active:scale-95 cursor-pointer z-20"
                  >
                    <ChevronLeftIcon className="w-5 h-5 -ml-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextLightbox();
                    }}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-transform active:scale-95 cursor-pointer z-20"
                  >
                    <ChevronRightIcon className="w-5 h-5 -mr-0.5" />
                  </button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
