"use client";

import Link from "next/link";
import { MapPin, CheckCircle2, Loader2, Plus, Pencil, X, Users, Briefcase, Car } from "lucide-react";
import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

import { useSearchPopularStopsMutation } from "@/Redux/features/stopage/stopageApi";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

export default function Step3() {
  const searchParams = useSearchParams();
  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";
  const dateParam = searchParams.get("date") || "";
  const timeParam = searchParams.get("time") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const extraBags = parseInt(searchParams.get("extraBags") || "0");
  const vehicleId = searchParams.get("vehicleId");
  const transferRouteParam = searchParams.get("transferRoute");

  const [selectedStops, setSelectedStops] = useState<any[]>([]);
  const router = useRouter();

  const serviceType = searchParams.get("serviceType") || "TRANSFER";

  useEffect(() => {
    if (serviceType === "DAY_TRIP" || serviceType === "BY_THE_HOUR") {
      router.replace(`/booking-flow/step-3-details?${searchParams.toString()}`);
    }
  }, [serviceType, searchParams, router]);

  let distanceKm = 0;
  if (transferRouteParam) {
    try {
      const parsed = JSON.parse(transferRouteParam);
      distanceKm = parsed.distanceKm || 0;
    } catch (e) { }
  }

  const [searchPopularStops, { data: popularStopsResponse, isLoading, error }] = useSearchPopularStopsMutation();

  const fromLat = searchParams.get("fromLat");
  const fromLng = searchParams.get("fromLng");
  const toLat = searchParams.get("toLat");
  const toLng = searchParams.get("toLng");

  useEffect(() => {
    if (fromLat && fromLng && toLat && toLng) {
      searchPopularStops({
        to: {
          location: dropoffParam,
          coordinates: [parseFloat(toLat), parseFloat(toLng)],
        },
        from: {
          location: pickupParam,
          coordinates: [parseFloat(fromLat), parseFloat(fromLng)],
        },
      });
    }
  }, [fromLat, fromLng, toLat, toLng, dropoffParam, pickupParam, searchPopularStops]);

  const stops = (popularStopsResponse?.data?.data || []).map((stop: any) => ({
    ...stop,
    duration: stop.duration !== undefined ? stop.duration : 60,
    price: stop.price !== undefined ? stop.price : 20,
    image: Array.isArray(stop.image) ? stop.image : [stop.image].filter(Boolean),
    type: stop.type || (stop.types && stop.types[0]) || "Activity",
  }));

  const sortedStops = [...stops].sort((a, b) => 
    (b.totalRatings || b.user_ratings_total || b.rating || 0) - (a.totalRatings || a.user_ratings_total || a.rating || 0)
  );
  const mostPopularId = sortedStops[0]?.id;
  const recommendedId = sortedStops[1]?.id;

  const { data: vehiclesData } = useGetVehiclesQuery({});
  const vehicles = vehiclesData?.data?.data || [];

  const carPriceParam = searchParams.get("carPrice");

  let transportPrice = 0;
  let vehicleName = "Vehicle";

  if (vehicleId && vehicles.length > 0) {
    const ids = vehicleId.split("+");
    const selectedVehicles = ids.map((id: string) => vehicles.find((v: any) => v.id === id)).filter(Boolean);

    if (selectedVehicles.length > 0) {
      vehicleName = selectedVehicles.map((v: any) => v.name).join(" + ");

      if (carPriceParam) {
        transportPrice = parseFloat(carPriceParam);
      } else {
        const basePriceSum = selectedVehicles.reduce((sum: number, v: any) => sum + v.basePrice, 0);
        const pricePerKmSum = selectedVehicles.reduce((sum: number, v: any) => sum + v.pricePerKm, 0);
        const extraBagsCost = extraBags * 10;
        transportPrice = Math.round(basePriceSum + (pricePerKmSum * distanceKm)) + extraBagsCost;
      }
    }
  }

  const toggleStop = (stop: any) => {
    if (selectedStops.find((s) => s.id === stop.id)) {
      setSelectedStops(selectedStops.filter((s) => s.id !== stop.id));
    } else {
      setSelectedStops([...selectedStops, stop]);
    }
  };

  const stopsCost = selectedStops.reduce((total, stop) => total + stop.price, 0);
  const totalPrice = transportPrice + stopsCost;

  let formattedDate = "";
  if (dateParam) {
    try {
      const d = new Date(dateParam);
      formattedDate = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    } catch (e) {
      formattedDate = dateParam;
    }
  }

  const coordsParam = fromLat ? `&fromLat=${fromLat}&fromLng=${fromLng}&toLat=${toLat}&toLng=${toLng}` : "";

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <Header2 />

      <div className="flex-1 py-10 sm:py-12 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step progress */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                1
              </div>
              <span>Trip Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                2
              </div>
              <span>Choose Vehicle</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold">
                3
              </div>
              <span>Add Stops</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                4
              </div>
              <span>Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                5
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

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
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 mb-8 lg:mb-10">
          {/* Stops grid */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-48 text-red-500">
                Failed to load stops. Please try again.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {stops.map((stop: any) => {
                  const isSelected = selectedStops.some((s) => s.id === stop.id);
                  return (
                    <div
                      key={stop.id}
                      onClick={() => toggleStop(stop)}
                      className={`relative bg-white rounded-2xl overflow-hidden flex flex-col transition-all cursor-pointer border-2 ${isSelected
                        ? "border-blue-600 ring-2 ring-blue-100 shadow-lg"
                        : "border-transparent shadow-md hover:border-blue-300 hover:shadow-lg"
                        }`}
                    >
                      <div className="relative h-44 w-full">
                        <img
                          src={
                            stop.image && stop.image.length > 0
                              ? stop.image[0]
                              : "/placeholder.png"
                          }
                          alt={stop.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        {(stop.id === mostPopularId || stop.id === recommendedId) && (
                          <div className="absolute top-3 left-3 flex items-center bg-white/95 backdrop-blur-sm shadow-sm rounded-md px-2 py-1 gap-1">
                            <span className="text-yellow-500 text-[10px]">★</span>
                            <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                              {stop.id === mostPopularId ? "Most Popular" : "Recommended"}
                            </span>
                          </div>
                        )}
                        <h3 className="absolute bottom-3 left-4 text-white text-lg font-bold">
                          {stop.name}
                        </h3>
                      </div>

                      <div
                        className={`p-4 flex items-center justify-between transition-colors ${isSelected ? "bg-blue-600" : "bg-white"
                          }`}
                      >
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <span
                            className={
                              isSelected ? "text-blue-100" : "text-blue-600"
                            }
                          >
                            {formatDuration(stop.duration)}
                          </span>
                          <span
                            className={
                              isSelected ? "text-blue-100" : "text-gray-500"
                            }
                          >
                            for
                          </span>
                          <span
                            className={
                              isSelected ? "text-white" : "text-gray-900"
                            }
                          >
                            €{stop.price}
                          </span>
                        </div>
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors ${isSelected
                            ? "bg-white text-blue-600 hover:bg-gray-100"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        >
                          {isSelected ? (
                            <Pencil className="h-4 w-4" />
                          ) : (
                            <Plus className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Itinerary card */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Itinerary</h2>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View details
                </button>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-gray-100 rounded-md px-2 py-1 mb-4">
                  <span className="text-xs text-gray-600">📅</span>
                  <span className="text-xs font-semibold text-gray-800">
                    {formattedDate || "Select Date"}
                  </span>
                </div>

                <div className="relative pl-4 border-l-2 border-gray-200 space-y-6 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-gray-400" />
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-gray-900 text-sm">
                        {pickupParam || "Pickup Location"}
                      </p>
                      <p className="text-xs text-gray-500 font-medium whitespace-nowrap ml-2">
                        {timeParam || "9:00 AM"}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-gray-800" />
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-gray-900 text-sm">
                        {dropoffParam || "Dropoff Location"}
                      </p>
                      <p className="text-xs text-gray-500 font-medium whitespace-nowrap ml-2">
                        TBD
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedStops.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-2">Stops</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStops.map((stop) => (
                      <div
                        key={stop.id}
                        className="flex items-center gap-1.5 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
                      >
                        {stop.name} ({formatDuration(stop.duration)}, €{stop.price})
                        <button
                          onClick={() => toggleStop(stop)}
                          className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-b border-gray-100 py-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-md px-2 py-1">
                  <Users className="h-3.5 w-3.5 text-gray-500" />
                  <span>{adults + children}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-md px-2 py-1">
                  <Briefcase className="h-3.5 w-3.5 text-gray-500" />
                  <span>{adults + children + extraBags}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-md px-2 py-1">
                  <Car className="h-3.5 w-3.5 text-gray-500" />
                  <span className="truncate max-w-[70px]">
                    {vehicleName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-md px-2 py-1">
                  <MapPin className="h-3.5 w-3.5 text-gray-500" />
                  <span>
                    {selectedStops.length} Stop
                    {selectedStops.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-900">Price details</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Transport</span>
                  <span className="font-semibold text-gray-900">
                    €{transportPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Stops</span>
                  <span className="font-semibold text-gray-900">€{stopsCost}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  €{totalPrice}
                </span>
              </div>

              <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-700 font-medium">
                  Free cancellation up to 24 hours before your pickup time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="fixed bottom-6 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-start">
            <div className="w-full lg:w-[65%] pointer-events-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 sm:p-3 px-4 sm:px-6 flex items-center justify-between border border-gray-100">
              <Button
                asChild
                variant="ghost"
                className="text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 text-sm sm:text-base px-3 py-2 h-auto rounded-xl"
              >
                <Link href={`/booking-flow/step-2?${searchParams.toString()}`}>
                  ← Back
                </Link>
              </Button>

              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 sm:px-8 py-2.5 sm:py-3 h-auto shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
              >
                <Link
                  href={`/booking-flow/step-3-details?${searchParams.toString()}&selectedStops=${encodeURIComponent(
                    JSON.stringify(selectedStops.map(s => ({ id: s.id, name: s.name, price: s.price, duration: s.duration })))
                  )}&distanceKm=${distanceKm}${coordsParam}`}
                >
                  Next: Checkout
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section >
  );
}
