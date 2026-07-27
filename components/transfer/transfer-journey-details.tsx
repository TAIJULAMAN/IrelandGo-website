"use client";

import { useSearchParams } from "next/navigation";
import {
  Clock,
  MapPin,
  Euro,
  Route,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

export default function TransferJourneyDetails() {
  const { isLoaded } = useGoogleMaps();

  const searchParams = useSearchParams();
  const transferRouteParam = searchParams.get("transferRoute");
  let transferRoute: any = null;
  try {
    if (transferRouteParam) {
      transferRoute = JSON.parse(transferRouteParam);
    }
  } catch (e) {
    console.error("Failed to parse transfer route", e);
  }

  const pickupParam = searchParams.get("pickup") || transferRoute?.from || "";
  const dropoffParam = searchParams.get("dropoff") || transferRoute?.to || "";

  const [distance, setDistance] = useState<number | null>(transferRoute?.distanceKm || null);
  const [duration, setDuration] = useState<number | null>(transferRoute?.travelTimeMinutes || null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(transferRoute?.price || null);

  // Fetch route data from Google
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
            setEstimatedPrice(Math.round(distKm * 0.40 + 20)); // Base price + per km
          } else {
            const suppressedStatuses = ['ZERO_RESULTS', 'NOT_FOUND', 'INVALID_REQUEST'];
            if (!suppressedStatuses.includes(status)) {
              console.error("Error fetching directions:", status);
            }
          }
        }
      );
    }
  }, [isLoaded, pickupParam, dropoffParam, transferRoute]);

  // Format duration
  const formatDuration = (minutes: number | null) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/30 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Journey Details</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Review your transfer route and estimated travel information
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative group">
          {/* Ambient shadow glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-[2.5rem] transform rotate-1 group-hover:rotate-0 transition-transform duration-700 -z-10 blur-xl"></div>
          
          {/* Route information card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 space-y-8 transition-all duration-500">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Navigation className="w-6 h-6 text-blue-600" />
                </div>
                Route Information
              </h3>
            </div>

            <div className="space-y-4">
              {/* Origin */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/50 hover:shadow-md transition-shadow duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-bold shadow-lg shadow-blue-500/30">
                  A
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wider">
                    Pickup Location
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">
                    {pickupParam || "Select Pickup Location"}
                  </p>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="flex justify-center -my-2 relative z-10">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 text-gray-400">
                  <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
                </div>
              </div>

              {/* Destination */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border border-emerald-100/50 hover:shadow-md transition-shadow duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-lg font-bold shadow-lg shadow-emerald-500/30">
                  B
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-bold text-emerald-600 mb-1 uppercase tracking-wider">
                    Dropoff Location
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-600 hidden sm:block" />
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      {dropoffParam || "Select Dropoff Location"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/60 border border-gray-100 hover:border-blue-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Duration
                  </p>
                  <p className="text-xl font-black text-gray-900">
                    {formatDuration(duration) || "N/A"}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/60 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                  <Route className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Distance
                  </p>
                  <p className="text-xl font-black text-gray-900">
                    {distance ? `${distance} km` : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/60 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                  <Euro className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Est. Price
                  </p>
                  <p className="text-xl font-black text-emerald-600">
                    {estimatedPrice ? `€${estimatedPrice}` : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
