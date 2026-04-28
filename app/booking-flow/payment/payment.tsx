"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Car, MapPin, Clock } from "lucide-react";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";

export default function PaymentStep() {
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
  const selectedStopsParam = searchParams.get("selectedStops");
  const serviceType = searchParams.get("serviceType") || "TRANSFER";

  let transferRoute: any = null;
  if (transferRouteParam) {
    try {
      transferRoute = JSON.parse(transferRouteParam);
    } catch (e) {}
  }

  let selectedStops: any[] = [];
  if (selectedStopsParam) {
    try {
      selectedStops = JSON.parse(selectedStopsParam);
    } catch (e) {}
  }

  const { data: vehiclesData } = useGetVehiclesQuery({});
  const vehicles = vehiclesData?.data?.data || [];
  
  let transportPrice = 0;
  let basePriceSum = 0;
  let pricePerKmSum = 0;
  let vehicleName = "Vehicle";
  const distanceKm = transferRoute?.distanceKm || 0;
  
  if (vehicleId && vehicles.length > 0) {
    const ids = vehicleId.split("+");
    const selectedVehicles = ids.map((id: string) => vehicles.find((v: any) => v.id === id)).filter(Boolean);
    
    if (selectedVehicles.length > 0) {
      vehicleName = selectedVehicles.map((v: any) => v.name).join(" + ");
      basePriceSum = selectedVehicles.reduce((sum: number, v: any) => sum + v.basePrice, 0);
      pricePerKmSum = selectedVehicles.reduce((sum: number, v: any) => sum + v.pricePerKm, 0);
      const extraBagsCost = extraBags * 10;
      
      transportPrice = Math.round(basePriceSum + (pricePerKmSum * distanceKm)) + extraBagsCost;
    }
  }

  const stopsCost = selectedStops.reduce((total: number, stop: any) => total + stop.price, 0);
  const totalPrice = transportPrice + stopsCost;

  let formattedDate = dateParam;
  if (dateParam) {
    try {
      const d = new Date(dateParam);
      formattedDate = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    } catch (e) {}
  }

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <Header2 />

      <div className="flex-1 py-10 sm:py-12 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step progress */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                1
              </div>
              <span className="hidden sm:inline">Trip Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                2
              </div>
              <span className="hidden sm:inline">Choose Vehicle</span>
            </div>
            {serviceType !== "BY_THE_HOUR" && (
              <>
                <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                    3
                  </div>
                  <span className="hidden sm:inline">Add Stops</span>
                </div>
              </>
            )}
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                {serviceType === "BY_THE_HOUR" ? "3" : "4"}
              </div>
              <span className="hidden sm:inline">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold">
                {serviceType === "BY_THE_HOUR" ? "4" : "5"}
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6 sm:mb-8 mt-2 sm:mt-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
            Step {serviceType === "BY_THE_HOUR" ? "4" : "5"}: Payment
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Select your preferred payment method for your journey.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 items-start">
          {/* Booking summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-7">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Booking Summary
              </h2>

              <div className="space-y-5 text-xs sm:text-sm text-gray-700 mb-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                      Pickup Location
                    </p>
                    <p className="font-medium text-gray-900">{pickupParam}</p>
                    <p className="text-xs text-gray-500">{formattedDate}, {timeParam}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                      Destination
                    </p>
                    <p className="font-medium text-gray-900">{dropoffParam}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600 shrink-0">
                    <Car className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vehicleName}</p>
                    <p className="text-xs text-gray-500">{adults + children} Passengers • {extraBags + adults + children} Bags</p>
                  </div>
                </div>

                {selectedStops.length > 0 && (
                  <div className="flex gap-3">
                    <div className="mt-1 text-blue-600 shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Included Stops</p>
                      <ul className="text-xs text-gray-500 space-y-1 mt-1">
                        {selectedStops.map((stop, i) => (
                          <li key={i}>• {stop.name} (€{stop.price})</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mt-1 space-y-2 text-xs sm:text-sm text-gray-700">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                  Price Breakdown
                </p>
                <div className="flex items-center justify-between">
                  <span>Transport Fare</span>
                  <span className="text-gray-900">€{transportPrice}</span>
                </div>
                {stopsCost > 0 && (
                  <div className="flex items-center justify-between">
                    <span>Extra Stops</span>
                    <span className="text-gray-900">€{stopsCost}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100 text-sm font-semibold">
                  <span>Total</span>
                  <span className="text-xl text-blue-600">€{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 flex flex-col gap-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Payment Method
              </h2>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg py-2.5 text-sm sm:text-base h-auto"
                >
                  <Link href="/booking-flow/booking-confirmation">Pay Now with Stripe</Link>
                </Button>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-400 justify-center">
                  <span className="h-px w-8 bg-gray-200" />
                  <span>or</span>
                  <span className="h-px w-8 bg-gray-200" />
                </div>
                <Button
                  asChild
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-2.5 text-sm sm:text-base h-auto"
                >
                  <Link href="/booking-flow/booking-confirmation">Pay Now with PayPal</Link>
                </Button>
              </div>

              <p className="mt-2 text-[11px] sm:text-xs text-gray-500 text-center">
                Your payment information is secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

