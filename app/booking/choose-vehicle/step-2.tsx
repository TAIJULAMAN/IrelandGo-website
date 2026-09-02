"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Luggage, Check, Plus, Minus, ChevronDown } from "lucide-react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";
import { useGetSingleDayTripQuery } from "@/Redux/features/dayTrip/dayTripApi";
import { useEffect } from "react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  getBookingSession,
  saveBookingSession,
  syncUrlParamsToSession,
  cleanBrowserUrl,
  buildSemanticBookingUrl,
  BookingSessionData,
} from "@/utils/bookingSession";

export default function Vehicles() {
  const { isLoaded } = useGoogleMaps();
  const router = useRouter();
  const pathname = usePathname();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedVehicleName, setSelectedVehicleName] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const [session, setSession] = useState<BookingSessionData>(() => {
    if (typeof window !== "undefined" && window.location.search) {
      return syncUrlParamsToSession(searchParams);
    }
    return getBookingSession();
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      const updated = syncUrlParamsToSession(searchParams);
      setSession(updated);
      cleanBrowserUrl(buildSemanticBookingUrl("vehicles", updated));
    } else {
      const s = getBookingSession();
      setSession(s);
      if (s.vehicleName) setSelectedVehicleName(s.vehicleName);
    }
  }, [searchParams]);

  const pickupParam = searchParams.get("pickup") || session.pickup || "";
  const dropoffParam = searchParams.get("dropoff") || session.dropoff || "";
  const adults = parseInt(searchParams.get("adults") || session.adults?.toString() || "2");
  const children = parseInt(searchParams.get("children") || session.children?.toString() || "0");
  const extraBags = parseInt(searchParams.get("extraBags") || session.extraBags?.toString() || "0");
  const serviceType = searchParams.get("serviceType") || session.serviceType || "TRANSFER";
  const tripType = searchParams.get("tripType") || session.tripType || "one-way";
  const durationParam = searchParams.get("duration") || session.duration || "";
  const tripId = searchParams.get("id") || session.id;

  const { data: dayTripData } = useGetSingleDayTripQuery(tripId as string, {
    skip: serviceType !== "DAY_TRIP" || !tripId,
  });
  const dayTrip = dayTripData?.data;
  console.log("dayTrip of parvez", dayTrip);

  const [localAdults, setLocalAdults] = useState(adults);
  const [localChildren, setLocalChildren] = useState(children);
  const [localExtraBags, setLocalExtraBags] = useState(extraBags);

  useEffect(() => {
    setLocalAdults(adults);
    setLocalChildren(children);
    setLocalExtraBags(extraBags);
  }, [adults, children, extraBags]);

  const handleUpdate = (
    type: "adults" | "children" | "extraBags",
    value: number,
  ) => {
    if (type === "adults") {
      setLocalAdults(value);
      saveBookingSession({ adults: value });
    }
    if (type === "children") {
      setLocalChildren(value);
      saveBookingSession({ children: value });
    }
    if (type === "extraBags") {
      setLocalExtraBags(value);
      saveBookingSession({ extraBags: value });
    }
  };

  const totalPassengers = adults + children;
  const totalBags = adults + children + extraBags;

  const transferRouteParam = searchParams.get("transferRoute");
  let transferRoute: any = null;
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
  const [coords, setCoords] = useState<{
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
  } | null>(null);

  useEffect(() => {
    if (serviceType === "DAY_TRIP" && dayTrip?.distanceKm) {
      setDistanceKm(dayTrip.distanceKm);
    }
  }, [dayTrip, serviceType]);

  useEffect(() => {
    let isMounted = true;
    if (isLoaded && pickupParam && dropoffParam && serviceType !== "DAY_TRIP") {
      if (!coords || !distanceKm) {
        const directionsService = new google.maps.DirectionsService();

        try {
          directionsService.route(
            {
              origin: pickupParam,
              destination: dropoffParam,
              travelMode: google.maps.TravelMode.DRIVING,
              region: "ie",
            },
            (result, status) => {
              if (!isMounted) return;

              if (status === google.maps.DirectionsStatus.OK && result) {
                const leg = result.routes[0].legs[0];

                if (!transferRoute?.distanceKm) {
                  setDistanceKm(Math.round((leg.distance?.value || 0) / 1000));
                }

                if (!coords) {
                  setCoords({
                    fromLat: leg.start_location.lat(),
                    fromLng: leg.start_location.lng(),
                    toLat: leg.end_location.lat(),
                    toLng: leg.end_location.lng(),
                  });
                }
              }
            },
          );
        } catch (_e) {}
      }
    }
    return () => {
      isMounted = false;
    };
  }, [
    isLoaded,
    pickupParam,
    dropoffParam,
    transferRoute,
    serviceType,
    coords,
    distanceKm,
  ]);

  const { data: vehiclesData, isLoading } = useGetVehiclesQuery({});
  const baseVehicles = vehiclesData?.data?.data || [];
  const vehicles =
    serviceType === "DAY_TRIP" && dayTrip?.vehicles?.length > 0
      ? dayTrip?.vehicles?.map((tsv: any) => ({
          ...tsv,
          price: tsv?.price,
          basePrice: tsv?.price,
        }))
      : baseVehicles;

  const getVehicleOptions = (
    vehicles: any[],
    passengers: number,
    bags: number,
  ) => {
    if (!vehicles || vehicles.length === 0) return [];

    let options = vehicles
      .filter((v: any) => v.seatCount >= passengers && v.luggage >= bags)
      .map((v: any) => [v]);
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
    <section className="relative bg-gray-50/50 min-h-screen flex flex-col pt-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="flex-1 py-10 px-5 md:px-0 relative z-10 max-w-7xl w-full mx-auto">
        {/* Step progress */}
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

        {/* Heading */}
        <div className="mb-8 sm:mb-10 mt-6 sm:mt-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
            Choose Your Perfect Vehicle
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select the vehicle that best suits your journey. All vehicles are
            well-maintained and come with professional drivers.
          </p>
        </div>

        {/* Vehicle slider */}
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-auto py-1.5 px-3 rounded-full flex items-center gap-2 shadow-sm bg-white/90 backdrop-blur-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-gray-800 font-semibold text-sm border-gray-200 transition-all"
                  >
                    <Users className="w-4 h-4" />
                    {totalPassengers}
                    <Luggage className="w-4 h-4 ml-1" />
                    {totalBags}
                    <ChevronDown className="w-4 h-4 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[calc(100vw-32px)] sm:w-[500px] md:w-[600px] p-4 sm:p-6 shadow-xl rounded-lg max-h-[90vh] overflow-y-auto"
                  align="end"
                >
                  <div className="flex flex-col md:flex-row gap-6">
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
                            <span className="text-xs text-blue-600 bg-transparent px-3 py-1 rounded-full border border-blue-600 font-medium whitespace-nowrap">
                              29 x 21 x 11 inch
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Luggage className="w-4 h-4 text-gray-900" />
                            <span className="flex-1 font-medium text-gray-800">
                              One carry-on bag
                            </span>
                            <span className="text-xs text-blue-600 bg-transparent px-3 py-1 rounded-full border border-blue-600 font-medium whitespace-nowrap">
                              22 x 14 x 9 inch
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block w-[1px] bg-gray-300"></div>

                    {/* Right Column: Extra Bags */}
                    <div className="flex-1 space-y-6 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-xl mb-3 text-gray-900">
                          Need more space?
                        </h4>
                        <p className="text-sm text-gray-800 leading-relaxed font-medium">
                          Extra bags count as a passenger space, but you do not
                          pay any extra seat fee.
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
            className="vehicle-scroll flex gap-5 overflow-x-auto pt-4 pb-8 -mt-4 scroll-smooth snap-x snap-mandatory justify-start md:justify-center px-4"
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

                  if (serviceType === "DAY_TRIP") {
                    pricePerCar = option.vehicles.reduce(
                      (sum: number, vehicle: any) =>
                        sum + (vehicle.price ?? vehicle.basePrice ?? 0),
                      0,
                    );
                  } else if (serviceType === "BY_THE_HOUR") {
                    let hours = 0;
                    if (durationParam) {
                      const matches = durationParam.match(/\d+/g);
                      if (matches) hours = Math.max(...matches.map(Number));
                    }
                    if (hours < 2) hours = 2;

                    pricePerCar = option.vehicles.reduce(
                      (sum: number, vehicle: any) => {
                        const name = vehicle.name.toLowerCase();
                        let basePrice = 0,
                          hr3Add = 0,
                          hr4Add = 0,
                          hr5Add = 0,
                          hr6Add = 0,
                          hr7PlusAdd = 0;

                        if (
                          name.includes("luxury sedan") ||
                          name.includes("l sedan")
                        ) {
                          basePrice = 290;
                          hr3Add = 20;
                          hr4Add = 30;
                          hr5Add = 60;
                          hr6Add = 60;
                          hr7PlusAdd = 60;
                        } else if (name.includes("sedan")) {
                          basePrice = 275;
                          hr3Add = 15;
                          hr4Add = 25;
                          hr5Add = 55;
                          hr6Add = 55;
                          hr7PlusAdd = 55;
                        } else if (
                          name.includes("mpv") ||
                          name.includes("mvp")
                        ) {
                          basePrice = 285;
                          hr3Add = 20;
                          hr4Add = 30;
                          hr5Add = 60;
                          hr6Add = 60;
                          hr7PlusAdd = 60;
                        } else if (name.includes("van")) {
                          basePrice = 295;
                          hr3Add = 25;
                          hr4Add = 35;
                          hr5Add = 65;
                          hr6Add = 65;
                          hr7PlusAdd = 65;
                        } else {
                          basePrice = 285;
                          hr3Add = 20;
                          hr4Add = 30;
                          hr5Add = 60;
                          hr6Add = 60;
                          hr7PlusAdd = 60;
                        }

                        let vehiclePrice = basePrice;
                        if (hours >= 3) vehiclePrice += hr3Add;
                        if (hours >= 4) vehiclePrice += hr4Add;
                        if (hours >= 5) vehiclePrice += hr5Add;
                        if (hours >= 6) vehiclePrice += hr6Add;
                        if (hours >= 7)
                          vehiclePrice += hr7PlusAdd * (hours - 6);

                        return sum + vehiclePrice;
                      },
                      0,
                    );
                  } else {
                    pricePerCar = option.vehicles.reduce(
                      (sum: number, vehicle: any) => {
                        const name = (vehicle.name || "").toLowerCase();
                        const km = distanceKm || 0;
                        let isLSedan =
                          name.includes("luxury sedan") ||
                          name.includes("l sedan") ||
                          name.includes("lsedan");
                        let isMPV =
                          !isLSedan &&
                          (name.includes("mpv") ||
                            name.includes("mvp") ||
                            name.includes("minivan"));
                        let isVan = !isLSedan && !isMPV && name.includes("van");
                        type Band = [number, number, number];
                        const sedanBands: Band[] = [
                          [25, 1.8, 50],
                          [50, 1.8, 40],
                          [100, 1.8, 30],
                          [150, 1.8, 15],
                          [Infinity, 1.9, 0],
                        ];
                        const mpvBands: Band[] = [
                          [25, 2.0, 65],
                          [50, 2.0, 55],
                          [100, 2.0, 45],
                          [150, 2.0, 30],
                          [Infinity, 2.1, 0],
                        ];
                        const vanBands: Band[] = [
                          [25, 2.2, 80],
                          [50, 2.2, 70],
                          [100, 2.2, 60],
                          [150, 2.2, 45],
                          [Infinity, 2.3, 0],
                        ];
                        const lSedanBands: Band[] = [
                          [25, 2.1, 70],
                          [50, 2.1, 60],
                          [100, 2.1, 50],
                          [150, 2.1, 35],
                          [Infinity, 2.15, 0],
                        ];

                        const bands = isLSedan
                          ? lSedanBands
                          : isMPV
                            ? mpvBands
                            : isVan
                              ? vanBands
                              : sedanBands;
                        const [, rate, base] =
                          bands.find(([max]) => km <= max) ||
                          bands[bands.length - 1];

                        return sum + base + rate * km;
                      },
                      0,
                    );
                  }

                  const totalPrice = Math.round(pricePerCar) + extraBagsCost;

                  return (
                    <div
                      key={option.id}
                      className="snap-start shrink-0 w-[260px] sm:w-[280px] lg:w-[300px]"
                      onClick={() => setSelectedVehicle(option.id)}
                    >
                      <div
                        className={`group bg-white backdrop-blur-md rounded-2xl shadow-sm p-5 flex flex-col hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full border-2 relative ${
                          selectedVehicle === option.id
                            ? "border-blue-600 ring-2 ring-blue-100 shadow-md bg-white"
                            : "border-transparent hover:border-blue-300"
                        }`}
                        onClick={() => {
                          setSelectedVehicle(option.id);
                          setSelectedVehicleName(option.names);
                          setSelectedPrice(totalPrice);
                        }}
                      >
                        {/* Subtle inner glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl z-0" />
                        {option.vehicles.length === 1 ? (
                          <div className="mb-5 h-32 sm:h-36 flex items-center justify-center bg-gray-50 rounded-xl p-3 relative overflow-hidden group-hover:shadow-inner transition-all z-10">
                            <img
                              src={option.vehicles[0].image[0]}
                              alt={option.vehicles[0].name}
                              className="max-h-full w-auto object-contain drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="mb-5 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-3 relative h-auto min-h-[8rem] z-10">
                            {option.vehicles.map((v: any, index: number) => (
                              <div
                                key={index}
                                className="flex flex-col items-center"
                              >
                                {index > 0 && (
                                  <div className="text-blue-600 my-1 font-bold bg-blue-100 rounded-full p-1">
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
                              {distanceKm ||
                              serviceType === "BY_THE_HOUR" ||
                              serviceType === "DAY_TRIP"
                                ? `€${totalPrice}`
                                : "TBD"}
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
                        <Button
                          variant={selectedVehicle === option.id ? "default" : "secondary"}
                          className="mt-auto w-full relative z-10"
                        >
                          {selectedVehicle === option.id
                            ? "Selected"
                            : "Select Option"}
                        </Button>
                      </div>
                    </div>
                  );
                });
              })()
            )}
          </div>
        </div>

        {/* Next button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full relative z-10">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="action"
          >
            Back
          </Button>
          <Button
            asChild
            disabled={!selectedVehicle}
            size="action"
            className={!selectedVehicle ? "bg-gray-300 cursor-not-allowed opacity-70" : ""}
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
<<<<<<<< HEAD:app/booking/vehicles/vehicles.tsx
              href={
                serviceType === "TRANSFER" ||
                serviceType === "PRIVATE_TRANSFER" ||
                serviceType === "AIRPORT_TRANSFER"
                  ? buildSemanticBookingUrl("stops", session)
                  : buildSemanticBookingUrl("user-info", session, selectedVehicleName)
              }
========
              href={`/booking/${serviceType === "TRANSFER" || serviceType === "PRIVATE_TRANSFER" || serviceType === "AIRPORT_TRANSFER" ? "add-stops" : "user-details"}?${searchParams.toString()}&vehicleId=${encodeURIComponent(
                selectedVehicle || "",
              )}&carPrice=${selectedPrice || 0}&distanceKm=${distanceKm || 0}${coords ? `&fromLat=${coords.fromLat}&fromLng=${coords.fromLng}&toLat=${coords.toLat}&toLng=${coords.toLng}` : ""}`}
>>>>>>>> 68619fa9f4ec3e5b4efd2fa6121bb3788b052b14:app/booking/choose-vehicle/step-2.tsx
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
