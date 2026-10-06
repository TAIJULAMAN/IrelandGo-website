"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  saveBookingSession,
  buildSemanticBookingUrl,
} from "@/utils/bookingSession";

import { useVehicleBookingParams } from "./hooks/useVehicleBookingParams";
import { useVehicleOptions } from "./hooks/useVehicleOptions";
import { PassengerPopover } from "./components/PassengerPopover";
import { VehicleSlider } from "./components/VehicleSlider";

export default function Vehicles() {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedVehicleName, setSelectedVehicleName] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const {
    session,
    serviceType,
    tripType,
    durationParam,
    dayTrip,
    localAdults,
    localChildren,
    localExtraBags,
    handleUpdate,
    totalPassengers,
    totalBags,
    distanceKm,
    coords,
  } = useVehicleBookingParams(setSelectedVehicleName);

  const { isLoading, vehicleOptions } = useVehicleOptions(
    serviceType,
    dayTrip,
    totalPassengers,
    totalBags,
  );

  return (
    <section className="relative bg-gray-50/50 min-h-screen flex flex-col pt-20 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>
      <div className="flex-1 py-10 px-5 md:px-0 relative z-10 max-w-7xl w-full mx-auto">
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold shrink-0">
                <Check className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline font-semibold text-blue-700">
                Trip Details
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-600 mx-1 sm:mx-2" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold shrink-0">
                2
              </div>
              <span className="hidden sm:inline font-semibold text-blue-700">
                Choose Vehicle
              </span>
            </div>
            {serviceType !== "BY_THE_HOUR" && serviceType !== "DAY_TRIP" && (
              <>
                <div className="flex-1 h-0.5 bg-gray-200 mx-1 sm:mx-2" />
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold shrink-0">
                    3
                  </div>
                  <span className="hidden sm:inline">Add Stops</span>
                </div>
              </>
            )}
            <div className="flex-1 h-0.5 bg-gray-200 mx-1 sm:mx-2" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold shrink-0">
                {serviceType === "BY_THE_HOUR" || serviceType === "DAY_TRIP"
                  ? "3"
                  : "4"}
              </div>
              <span className="hidden sm:inline">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-1 sm:mx-2" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold shrink-0">
                {serviceType === "BY_THE_HOUR" || serviceType === "DAY_TRIP"
                  ? "4"
                  : "5"}
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>
        <div className="mb-8 sm:mb-10 mt-6 sm:mt-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
            Choose Your Perfect Vehicle
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select the vehicle that best suits your journey. All vehicles are
            well-maintained and come with professional drivers.
          </p>
        </div>
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 px-4">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              <p className="text-sm font-semibold text-gray-700">
                Available Vehicles ({vehicleOptions.length})
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center shadow-sm">
                {tripType === "round-trip" || tripType === "return"
                  ? "Round trip"
                  : "One way"}
              </div>
              <PassengerPopover
                totalPassengers={totalPassengers}
                totalBags={totalBags}
                localAdults={localAdults}
                localChildren={localChildren}
                localExtraBags={localExtraBags}
                handleUpdate={handleUpdate}
              />
            </div>
          </div>

          <VehicleSlider
            isLoading={isLoading}
            vehicleOptions={vehicleOptions}
            localExtraBags={localExtraBags}
            serviceType={serviceType}
            durationParam={durationParam}
            distanceKm={distanceKm}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            setSelectedVehicleName={setSelectedVehicleName}
            setSelectedPrice={setSelectedPrice}
            sliderRef={sliderRef}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full relative z-10">
          <Button onClick={() => router.back()} variant="outline" size="action">
            Back
          </Button>
          <Button
            asChild
            disabled={!selectedVehicle}
            size="action"
            className={
              !selectedVehicle
                ? "bg-gray-300 cursor-not-allowed opacity-70"
                : ""
            }
          >
            <Link
              onClick={(e) => {
                if (!selectedVehicle) {
                  e.preventDefault();
                  return;
                }
                saveBookingSession({
                  vehicleId: selectedVehicle,
                  vehicleName: selectedVehicleName,
                  carPrice: selectedPrice || 0,
                  distanceKm: distanceKm || 0,
                  coords: coords || undefined,
                });
              }}
              href={
                serviceType === "TRANSFER" ||
                serviceType === "PRIVATE_TRANSFER" ||
                serviceType === "AIRPORT_TRANSFER"
                  ? buildSemanticBookingUrl("stops", session)
                  : buildSemanticBookingUrl(
                      "user-info",
                      session,
                      selectedVehicleName,
                    )
              }
              className={!selectedVehicle ? "pointer-events-none" : ""}
            >
              {serviceType === "TRANSFER" ||
              serviceType === "PRIVATE_TRANSFER" ||
              serviceType === "AIRPORT_TRANSFER"
                ? "Next: Add Stops"
                : "Next: Checkout"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
