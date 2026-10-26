"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { YourTripAtAGlance } from "@/components/common/your-trip-at-a-glance";

export default function TransferJourneyDetails() {
  const { isLoaded } = useGoogleMaps();

  const searchParams = useSearchParams();
  const transferRouteParam = searchParams.get("transferRoute");
  let transferRoute: any = null;
  try {
    if (transferRouteParam) {
      transferRoute = JSON.parse(transferRouteParam);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("current_transfer_route", transferRouteParam);
        const url = new URL(window.location.href);
        url.searchParams.delete("transferRoute");
        window.history.replaceState({}, "", url.toString());
      }
    } else if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("current_transfer_route");
      if (saved) transferRoute = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to parse transfer route", e);
  }

  const pickupParam = searchParams.get("pickup") || transferRoute?.from || "";
  const dropoffParam = searchParams.get("dropoff") || transferRoute?.to || "";

  const [distance, setDistance] = useState<number | null>(
    transferRoute?.distanceKm || null,
  );
  const [duration, setDuration] = useState<number | null>(
    transferRoute?.travelTimeMinutes || null,
  );
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(
    transferRoute?.price || null,
  );

  const cardRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  const calculateEstimatedPrice = (distKm: number) => {
    let rate = 0;
    let base = 0;

    if (distKm <= 25) {
      rate = 1.8;
      base = 50;
    } else if (distKm <= 50) {
      rate = 1.8;
      base = 40;
    } else if (distKm <= 100) {
      rate = 1.8;
      base = 30;
    } else if (distKm <= 150) {
      rate = 1.8;
      base = 15;
    } else {
      rate = 1.9;
      base = 0;
    }

    return Math.round(distKm * rate + base);
  };

  useEffect(() => {
    if (isLoaded && pickupParam && dropoffParam && !transferRoute?.distanceKm) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: pickupParam,
          destination: dropoffParam,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            const leg = result.routes[0].legs[0];
            const distKm = Math.round((leg.distance?.value || 0) / 1000);
            const durationMins = Math.round((leg.duration?.value || 0) / 60);

            setDistance(distKm);
            setDuration(durationMins);
            setEstimatedPrice(calculateEstimatedPrice(distKm));
          } else {
            const suppressedStatuses = [
              "ZERO_RESULTS",
              "NOT_FOUND",
              "INVALID_REQUEST",
            ];
            if (!suppressedStatuses.includes(status)) {
              console.error("Error fetching directions:", status);
            }
          }
        },
      );
    }
  }, [isLoaded, pickupParam, dropoffParam, transferRoute]);

  // Floating behavior matching trip-Itinerary.tsx
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        if (window.innerWidth < 768) {
          setTranslateY(0);
          return;
        }

        const parentGrid =
          cardRef.current.closest(".grid") || cardRef.current.parentElement;
        if (!parentGrid) return;

        const gridRect = parentGrid.getBoundingClientRect();
        const cardHeight = cardRef.current.offsetHeight;
        const maxTranslateY = Math.max(0, gridRect.height - cardHeight);

        // Pinned 100px from viewport top (below fixed navbar)
        const targetTop = 100;
        const currentOffset = targetTop - gridRect.top;

        if (currentOffset <= 0) {
          setTranslateY(0);
        } else if (currentOffset >= maxTranslateY) {
          setTranslateY(maxTranslateY);
        } else {
          setTranslateY(currentOffset);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    const parentGrid =
      cardRef.current?.closest(".grid") || cardRef.current?.parentElement;
    if (parentGrid && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        handleScroll();
      });
      resizeObserver.observe(parentGrid);
    }

    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        transform:
          translateY > 0 ? `translate3d(0, ${translateY}px, 0)` : undefined,
        willChange: translateY > 0 ? "transform" : undefined,
        transition: "transform 0.05s ease-out",
      }}
      className="w-full h-fit mt-10 md:mt-14"
    >
      <YourTripAtAGlance
        pickup={pickupParam || "Select Pickup Location"}
        dropoff={dropoffParam || "Select Dropoff Location"}
        duration={duration}
        distance={distance}
        estimatedPrice={estimatedPrice}
        onCtaClick={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      />
    </div>
  );
}
