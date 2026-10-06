"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SingleStoppageModal } from "./components/SingleStoppageModal";
import { BookingProgress } from "./components/BookingProgress";
import { ItinerarySidebar } from "./components/ItinerarySidebar";
import { StopsMainContent } from "./components/StopsMainContent";
import { calculateStopPrice } from "./utils/stopUtils";
import { useBookingParams } from "./hooks/useBookingParams";
import { useVehiclePricing } from "./hooks/useVehiclePricing";
import { usePopularStopsRouting } from "./hooks/usePopularStopsRouting";
import { useStopsData } from "./hooks/useStopsData";

export default function Stops() {
  const {
    session,
    pickupParam,
    dropoffParam,
    dateParam,
    timeParam,
    adults,
    children,
    extraBags,
    distanceKm,
    fromLat,
    fromLng,
    toLat,
    toLng,
    sessionCarPrice,
    serviceType,
    vehicleId,
  } = useBookingParams();

  const {
    isLoaded,
    stopsData,
    popularStopDistances,
    baseRideDurationMins,
    baseDistanceKm,
    isLoading,
    error,
  } = usePopularStopsRouting({
    pickupParam,
    dropoffParam,
    fromLat,
    fromLng,
    toLat,
    toLng,
    distanceKm,
  });

  const [selectedStops, setSelectedStops] = useState<any[]>([]);
  const [selectedModalStopId, setSelectedModalStopId] = useState<string | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    if (serviceType === "DAY_TRIP" || serviceType === "BY_THE_HOUR") {
      router.replace("/booking/user-info");
    }
  }, [serviceType, router]);

  const { transportPrice, vehicleName, pricePerKmSumForStops } =
    useVehiclePricing(vehicleId, distanceKm, sessionCarPrice);

  const calculatePrice = (stop: any, durationMinutes?: number) => {
    return calculateStopPrice(
      stop,
      durationMinutes,
      pricePerKmSumForStops,
      popularStopDistances,
    );
  };

  const {
    stops,
    mostPopularId,
    recommendedId,
    toggleStop,
    handleUpdateStop,
    stopsCost,
    totalPrice,
    formattedDate,
    dropoffTimeStr,
  } = useStopsData({
    stopsData,
    selectedStops,
    setSelectedStops,
    calculatePrice,
    transportPrice,
    dateParam,
    timeParam,
    baseRideDurationMins,
    distanceKm,
  });

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col pt-20">
      <div className="flex-1 py-10 max-w-7xl w-full mx-auto px-5">
        {/* Step progress */}
        <BookingProgress />

        {/* Heading */}
        <div className="mb-6 sm:mb-8 mt-4 sm:mt-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
            Step 3: Add Stops
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Select your stops for a fully personalized experience. Choose where
            you want to go, and we'll handle the rest.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3 mb-6 sm:mb-8 lg:mb-10">
          <StopsMainContent
            isLoading={isLoading}
            error={error}
            stops={stops}
            selectedStops={selectedStops}
            mostPopularId={mostPopularId}
            recommendedId={recommendedId}
            toggleStop={toggleStop}
            setSelectedModalStopId={setSelectedModalStopId}
            isLoaded={isLoaded}
            fromLat={fromLat}
            fromLng={fromLng}
            toLat={toLat}
            toLng={toLng}
            distanceKm={distanceKm}
            baseDistanceKm={baseDistanceKm}
            calculatePrice={calculatePrice}
            setSelectedStops={setSelectedStops}
            session={session}
          />

          <ItinerarySidebar
            formattedDate={formattedDate}
            pickupParam={pickupParam}
            timeParam={timeParam}
            dropoffParam={dropoffParam}
            dropoffTimeStr={dropoffTimeStr}
            selectedStops={selectedStops}
            toggleStop={toggleStop}
            adults={adults}
            children={children}
            extraBags={extraBags}
            vehicleName={vehicleName}
            transportPrice={transportPrice}
            stopsCost={stopsCost}
            totalPrice={totalPrice}
          />
        </div>
      </div>
      {selectedModalStopId && (
        <SingleStoppageModal
          stopId={selectedModalStopId}
          onClose={() => setSelectedModalStopId(null)}
          baseStop={stops.find((s: any) => s.id === selectedModalStopId) || {}}
          existingStop={selectedStops.find(
            (s: any) => s.id === selectedModalStopId,
          )}
          onAddOrUpdate={handleUpdateStop}
          onRemove={toggleStop}
          calculatePrice={(stopOrDuration: any, maybeDuration?: number) => {
            if (
              typeof stopOrDuration === "number" &&
              maybeDuration === undefined
            ) {
              const currentStop =
                stops.find((s: any) => s.id === selectedModalStopId) || {};
              return calculatePrice(currentStop, stopOrDuration);
            }
            return calculatePrice(stopOrDuration, maybeDuration);
          }}
        />
      )}

      <style jsx>{`
        .vehicle-scroll {
          scrollbar-width: none;
        }
        .vehicle-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <style>{`
        .pac-max-w-7xl {
          z-index: 999999 !important;
          border-radius: 12px !important;
          border: 1px solid #e5e7eb !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          font-family: inherit !important;
          margin-top: 4px !important;
        }
        .pac-item {
          padding: 10px 14px !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
        }
        .pac-item:hover {
          background-color: #f3f4f6 !important;
        }
        .pac-item-query {
          font-size: 14px !important;
          color: #1f2937 !important;
        }
        .pac-matched {
          font-weight: 600 !important;
        }
      `}</style>
    </section>
  );
}
