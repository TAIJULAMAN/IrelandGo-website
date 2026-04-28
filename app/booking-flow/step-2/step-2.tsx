"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Luggage, Check, Plus, Minus, ChevronDown } from "lucide-react";
import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";
import { irishSettlements } from "@/lib/irish-settlements";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Step2() {
  const router = useRouter();
  const pathname = usePathname();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const extraBags = parseInt(searchParams.get("extraBags") || "0");
  const serviceType = searchParams.get("serviceType") || "TRANSFER";
  const durationParam = searchParams.get("duration") || "";

  const [localAdults, setLocalAdults] = useState(adults);
  const [localChildren, setLocalChildren] = useState(children);
  const [localExtraBags, setLocalExtraBags] = useState(extraBags);

  useEffect(() => {
    setLocalAdults(adults);
    setLocalChildren(children);
    setLocalExtraBags(extraBags);
  }, [adults, children, extraBags]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleUpdate = (
    type: "adults" | "children" | "extraBags",
    value: number,
  ) => {
    if (type === "adults") {
      setLocalAdults(value);
      updateParams("adults", value.toString());
    }
    if (type === "children") {
      setLocalChildren(value);
      updateParams("children", value.toString());
    }
    if (type === "extraBags") {
      setLocalExtraBags(value);
      updateParams("extraBags", value.toString());
    }
  };

  // every passenger can carry a bag. if anyone add extra bag then he have to pay and also count as a sit
  const totalPassengers = adults + children + extraBags;
  const totalBags = adults + children; // Every passenger can carry a bag. Extra bags count as seats instead.

  const transferRouteParam = searchParams.get("transferRoute");
  let transferRoute = null;
  try {
    if (transferRouteParam) {
      transferRoute = JSON.parse(transferRouteParam);
    }
  } catch (e) {
    console.error("Failed to parse transfer route", e);
  }

  const [distanceKm, setDistanceKm] = useState<number | null>(
    transferRoute?.distanceKm || null,
  );

  const pickupSettlement = irishSettlements.find((s) => s.name === pickupParam);
  const dropoffSettlement = irishSettlements.find(
    (s) => s.name === dropoffParam,
  );

  useEffect(() => {
    if (!transferRoute?.distanceKm && pickupSettlement && dropoffSettlement) {
      const fetchRoute = async () => {
        try {
          const url = `https://router.project-osrm.org/route/v1/driving/${pickupSettlement.lng},${pickupSettlement.lat};${dropoffSettlement.lng},${dropoffSettlement.lat}?overview=false`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.routes && data.routes[0]) {
            setDistanceKm(Math.round(data.routes[0].distance / 1000));
          }
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      };

      fetchRoute();
    }
  }, [pickupSettlement, dropoffSettlement, transferRoute]);

  const { data: vehiclesData, isLoading } = useGetVehiclesQuery({});
  const vehicles = vehiclesData?.data?.data || [];

  const getVehicleOptions = (
    vehicles: any[],
    passengers: number,
    bags: number,
  ) => {
    if (!vehicles || vehicles.length === 0) return [];

    // 1. Try 1 vehicle
    let options = vehicles
      .filter((v: any) => v.seatCount >= passengers && v.luggage >= bags)
      .map((v: any) => [v]);

    // 2. Try 2 vehicles if no single vehicle works
    if (options.length === 0) {
      for (let i = 0; i < vehicles.length; i++) {
        for (let j = i; j < vehicles.length; j++) {
          const v1 = vehicles[i];
          const v2 = vehicles[j];
          if (
            v1.seatCount + v2.seatCount >= passengers &&
            v1.luggage + v2.luggage >= bags
          ) {
            options.push([v1, v2]);
          }
        }
      }
    }

    // 3. Try 3 vehicles if 2 vehicles don't work
    if (options.length === 0) {
      for (let i = 0; i < vehicles.length; i++) {
        for (let j = i; j < vehicles.length; j++) {
          for (let k = j; k < vehicles.length; k++) {
            const v1 = vehicles[i];
            const v2 = vehicles[j];
            const v3 = vehicles[k];
            if (
              v1.seatCount + v2.seatCount + v3.seatCount >= passengers &&
              v1.luggage + v2.luggage + v3.luggage >= bags
            ) {
              options.push([v1, v2, v3]);
            }
          }
        }
      }
    }

    // Remove duplicates based on combination ID and sort them by price
    const uniqueOptionsMap = new Map();
    options.forEach((combo) => {
      const id = combo
        .map((v: any) => v.id)
        .sort()
        .join("+");
      if (!uniqueOptionsMap.has(id)) {
        const basePriceSum = combo.reduce(
          (sum: number, v: any) => sum + v.basePrice,
          0,
        );
        const pricePerKmSum = combo.reduce(
          (sum: number, v: any) => sum + v.pricePerKm,
          0,
        );
        const seatCountSum = combo.reduce(
          (sum: number, v: any) => sum + v.seatCount,
          0,
        );
        const luggageSum = combo.reduce(
          (sum: number, v: any) => sum + v.luggage,
          0,
        );

        uniqueOptionsMap.set(id, {
          id,
          vehicles: combo,
          basePrice: basePriceSum,
          pricePerKm: pricePerKmSum,
          seatCount: seatCountSum,
          luggage: luggageSum,
          names: combo.map((v: any) => v.name).join(" + "),
        });
      }
    });

    return Array.from(uniqueOptionsMap.values()).sort(
      (a: any, b: any) => a.basePrice - b.basePrice,
    );
  };

  const vehicleOptions = getVehicleOptions(
    vehicles,
    totalPassengers,
    totalBags,
  );

  return (
    <section className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 min-h-screen flex flex-col">
      <Header2 />
      <div className="container mx-auto flex-1 py-10 md:py-16 px-5 md:px-0">
        {/* Step progress */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold shadow-md">
                <Check className="h-5 w-5" />
              </div>
              <span className="font-semibold text-blue-700">Trip Details</span>
            </div>
            <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-blue-500 mx-2 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-sm font-bold shadow-md">
                2
              </div>
              <span className="font-semibold text-blue-700">
                Choose Vehicle
              </span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-2 rounded-full" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                3
              </div>
              <span>Trip Details</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-2 rounded-full" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                4
              </div>
              <span>Details</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-2 rounded-full" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                5
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 sm:mb-10 mt-6 sm:mt-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-3">
            Choose Your Perfect Vehicle
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Select the vehicle that best suits your journey. All vehicles are
            well-maintained and come with professional drivers.
          </p>
        </div>

        {/* Vehicle slider */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              <p className="text-sm font-semibold text-gray-700">
                Available Vehicles ({vehicleOptions.length})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center shadow-sm">
                One way
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-auto py-1.5 px-3 rounded-full flex items-center gap-2 shadow-sm bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm border-gray-200"
                  >
                    <Users className="w-4 h-4 text-gray-600" />
                    {totalPassengers}
                    <Luggage className="w-4 h-4 ml-1 text-gray-600" />
                    {totalBags}
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[600px] p-6 shadow-xl rounded-2xl"
                  align="end"
                >
                  <div className="flex gap-6">
                    {/* Left Column: Passengers */}
                    <div className="flex-1 space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-base text-gray-900">
                            Adults
                          </h4>
                          <p className="text-xs text-muted-foreground font-medium">
                            Age 12+
                          </p>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white shadow-sm rounded-full bg-gray-100"
                            onClick={() =>
                              handleUpdate(
                                "adults",
                                Math.max(1, localAdults - 1),
                              )
                            }
                            disabled={localAdults <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-4 text-center font-bold text-gray-900">
                            {localAdults}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white shadow-sm rounded-full bg-gray-100"
                            onClick={() =>
                              handleUpdate("adults", localAdults + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-base text-gray-900">
                            Children
                          </h4>
                          <p className="text-xs text-muted-foreground font-medium">
                            Age 0-12
                          </p>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white shadow-sm rounded-full bg-gray-100"
                            onClick={() =>
                              handleUpdate(
                                "children",
                                Math.max(0, localChildren - 1),
                              )
                            }
                            disabled={localChildren <= 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-4 text-center font-bold text-gray-900">
                            {localChildren}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white shadow-sm rounded-full bg-gray-100"
                            onClick={() =>
                              handleUpdate("children", localChildren + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-bold mb-3 text-base text-gray-900">
                          Each passenger is allowed
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-sm text-gray-700 pb-2 border-b border-gray-100">
                            <Luggage className="w-4 h-4 text-gray-900" />
                            <span className="flex-1 font-medium text-gray-800">
                              One checked bag
                            </span>
                            <span className="text-xs text-blue-600 bg-transparent px-3 py-1 rounded-full border border-blue-500 font-medium whitespace-nowrap">
                              29 x 21 x 11 inch
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Luggage className="w-4 h-4 text-gray-900" />
                            <span className="flex-1 font-medium text-gray-800">
                              One carry-on bag
                            </span>
                            <span className="text-xs text-blue-600 bg-transparent px-3 py-1 rounded-full border border-blue-500 font-medium whitespace-nowrap">
                              22 x 14 x 9 inch
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[1px] bg-gray-300"></div>

                    {/* Right Column: Extra Bags */}
                    <div className="flex-1 space-y-6 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-xl mb-3 text-gray-900">
                          Need more space?
                        </h4>
                        <p className="text-sm text-gray-800 leading-relaxed font-medium">
                          Extra bags cost €10 each. They count as a passenger
                          space, but you do not pay any extra seat fee.
                        </p>
                      </div>
                      <div className="pt-2">
                        <h4 className="font-bold text-lg mb-1 text-gray-900">
                          Extra sets of bags
                        </h4>
                        <p className="text-sm text-gray-500 mb-4 font-medium">
                          One checked bag + one carry on
                        </p>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1 w-fit">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 hover:bg-white shadow-sm rounded-full bg-gray-100"
                            onClick={() =>
                              handleUpdate(
                                "extraBags",
                                Math.max(0, localExtraBags - 1),
                              )
                            }
                            disabled={localExtraBags <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center font-bold text-lg text-gray-900">
                            {localExtraBags}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 hover:bg-white shadow-sm rounded-full bg-gray-100"
                            onClick={() =>
                              handleUpdate("extraBags", localExtraBags + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="vehicle-scroll flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          >
            {isLoading ? (
              <div className="w-full text-center py-10 text-gray-500">
                Loading vehicles...
              </div>
            ) : (
              (() => {
                if (vehicleOptions.length === 0) {
                  return (
                    <div className="w-full text-center py-10 text-gray-500">
                      No vehicles available for this group size. Please adjust
                      your passenger or bag count.
                    </div>
                  );
                }

                return vehicleOptions.map((option: any) => {
                  const extraBagsCost = localExtraBags * 10;
                  let pricePerCar = 0;
                  
                  if (serviceType === "BY_THE_HOUR") {
                    let hours = 0;
                    if (durationParam) {
                      const matches = durationParam.match(/\d+/g);
                      if (matches) hours = Math.max(...matches.map(Number));
                    }
                    if (hours < 2) hours = 2; // Pricing starts at 2 hours
                    
                    pricePerCar = option.vehicles.reduce((sum: number, vehicle: any) => {
                      const name = vehicle.name.toLowerCase();
                      let basePrice = 0, hr3Add = 0, hr4Add = 0, hr5Add = 0, hr6Add = 0, hr7PlusAdd = 0;

                      if (name.includes("luxury sedan") || name.includes("l sedan")) {
                        basePrice = 290; hr3Add = 20; hr4Add = 30; hr5Add = 60; hr6Add = 60; hr7PlusAdd = 60;
                      } else if (name.includes("sedan")) {
                        basePrice = 275; hr3Add = 15; hr4Add = 25; hr5Add = 55; hr6Add = 55; hr7PlusAdd = 55;
                      } else if (name.includes("mpv") || name.includes("mvp")) {
                        basePrice = 285; hr3Add = 20; hr4Add = 30; hr5Add = 60; hr6Add = 60; hr7PlusAdd = 60;
                      } else if (name.includes("van")) {
                        basePrice = 295; hr3Add = 25; hr4Add = 35; hr5Add = 65; hr6Add = 65; hr7PlusAdd = 65;
                      } else {
                        // Default fallback
                        basePrice = 285; hr3Add = 20; hr4Add = 30; hr5Add = 60; hr6Add = 60; hr7PlusAdd = 60;
                      }

                      let vehiclePrice = basePrice;
                      if (hours >= 3) vehiclePrice += hr3Add;
                      if (hours >= 4) vehiclePrice += hr4Add;
                      if (hours >= 5) vehiclePrice += hr5Add;
                      if (hours >= 6) vehiclePrice += hr6Add;
                      if (hours >= 7) vehiclePrice += hr7PlusAdd * (hours - 6);
                      
                      return sum + vehiclePrice;
                    }, 0);
                  } else {
                    pricePerCar = option.basePrice + (distanceKm ? option.pricePerKm * distanceKm : 0);
                  }
                  
                  const totalPrice = Math.round(pricePerCar) + extraBagsCost;

                  return (
                    <div
                      key={option.id}
                      className="snap-start shrink-0 w-[260px] sm:w-[280px] lg:w-[300px]"
                      onClick={() => setSelectedVehicle(option.id)}
                    >
                      <div
                        className={`bg-white rounded-2xl shadow-lg p-5 flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 ${
                          selectedVehicle === option.id
                            ? "border-blue-600 ring-4 ring-blue-100"
                            : "border-transparent hover:border-blue-300"
                        }`}
                      >
                        {/* Selected Badge */}
                        {selectedVehicle === option.id && (
                          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10">
                            <Check className="h-3 w-3" />
                            Selected
                          </div>
                        )}

                        {/* Vehicle Image */}
                        {option.vehicles.length === 1 ? (
                          <div className="mb-5 h-32 sm:h-36 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-3 relative">
                            <img
                              src={option.vehicles[0].image[0]}
                              alt={option.vehicles[0].name}
                              className="max-h-full w-auto object-contain drop-shadow-lg"
                            />
                          </div>
                        ) : (
                          <div className="mb-5 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-3 relative h-auto min-h-[8rem]">
                            {option.vehicles.map((v: any, index: number) => (
                              <div
                                key={index}
                                className="flex flex-col items-center"
                              >
                                {index > 0 && (
                                  <div className="text-blue-500 my-1 font-bold bg-blue-100 rounded-full p-1">
                                    <Plus className="h-3 w-3" />
                                  </div>
                                )}
                                <img
                                  src={v.image[0]}
                                  alt={v.name}
                                  className="h-10 sm:h-12 w-auto object-contain drop-shadow-md"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Vehicle Info */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1 pr-2">
                            <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                              {option.names}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {option.vehicles.length > 1
                                ? "Combined trip"
                                : "Per trip"}
                            </p>
                          </div>
                          <div className="text-right whitespace-nowrap">
                            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                              {distanceKm || serviceType === "BY_THE_HOUR" ? `€${totalPrice}` : "TBD"}
                            </p>
                          </div>
                        </div>

                        {/* Capacity Info */}
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                          <span className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <Users className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-medium">
                              Up to {option.seatCount}
                            </span>
                          </span>
                          <span className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <Luggage className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-medium">
                              Up to {option.luggage}
                            </span>
                          </span>
                        </div>

                        {/* Select Button */}
                        <button
                          className={`mt-auto w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                            selectedVehicle === option.id
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          }`}
                        >
                          {selectedVehicle === option.id
                            ? "Selected"
                            : "Select Option"}
                        </button>
                      </div>
                    </div>
                  );
                });
              })()
            )}
          </div>
        </div>

        {/* Next button */}
        <div className="flex justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="px-8 sm:px-10 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-50"
          >
            <Link href="/booking-flow/step-1">Back</Link>
          </Button>
          <Button
            asChild
            disabled={!selectedVehicle}
            className={`px-10 sm:px-12 py-2.5 sm:py-3 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
              selectedVehicle
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <Link
              href={`/booking-flow/step-3?${searchParams.toString()}&vehicleId=${encodeURIComponent(
                selectedVehicle || "",
              )}`}
            >
              Next: Add Stops
            </Link>
          </Button>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .vehicle-scroll {
          scrollbar-width: none;
        }

        .vehicle-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
