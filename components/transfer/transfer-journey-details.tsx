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
import { irishSettlements } from "@/lib/irish-settlements";
import { useEffect, useState } from "react";

export default function TransferJourneyDetails() {
  const searchParams = useSearchParams();
  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";

  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  // Find settlement data
  const pickupSettlement = irishSettlements.find(s => s.name === pickupParam);
  const dropoffSettlement = irishSettlements.find(s => s.name === dropoffParam);

  // Fetch route data from OSRM
  useEffect(() => {
    if (pickupSettlement && dropoffSettlement) {
      const fetchRoute = async () => {
        try {
          const url = `https://router.project-osrm.org/route/v1/driving/${pickupSettlement.lng},${pickupSettlement.lat};${dropoffSettlement.lng},${dropoffSettlement.lat}?overview=false`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.routes && data.routes[0]) {
            setDistance(Math.round(data.routes[0].distance / 1000)); // Convert to km
            setDuration(Math.round(data.routes[0].duration / 60)); // Convert to minutes
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      };

      fetchRoute();
    }
  }, [pickupSettlement, dropoffSettlement]);

  // Calculate estimated price (€0.40 per km base rate)
  const estimatedPrice = distance ? Math.round(distance * 0.40) : null;

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
    <section className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Your Journey Details
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Review your transfer route and estimated travel information
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Route information card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-6 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Navigation className="w-6 h-6 text-blue-600" />
                Route Information
              </h3>
            </div>

            <div className="space-y-6">
              {/* Origin */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-base font-bold shadow-lg">
                  A
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600 mb-1">Pickup Location</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {pickupParam || "Select Pickup Location"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {pickupSettlement ? `${pickupSettlement.county}, ${pickupSettlement.province}` : ""}
                  </p>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
                  <ArrowRight className="w-5 h-5" />
                  <div className="h-px w-12 bg-gradient-to-r from-gray-300 via-gray-300 to-transparent"></div>
                </div>
              </div>

              {/* Destination */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-100/50 border border-green-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white text-base font-bold shadow-lg">
                  B
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-emerald-600 mb-1">Dropoff Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      {dropoffParam || "Select Dropoff Location"}
                    </p>
                  </div>
                  {dropoffSettlement && (
                    <p className="text-sm text-gray-600 mt-1">
                      {dropoffSettlement.county}, {dropoffSettlement.province}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Metrics row */}
            <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-100">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/30 hover:shadow-md transition-shadow">
                <div className="p-2 rounded-full bg-blue-600">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Duration</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{formatDuration(duration) || "N/A"}</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/30 hover:shadow-md transition-shadow">
                <div className="p-2 rounded-full bg-purple-600">
                  <Route className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Distance</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {distance ? `${distance} km` : "N/A"}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100/30 hover:shadow-md transition-shadow">
                <div className="p-2 rounded-full bg-emerald-600">
                  <Euro className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">From</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {estimatedPrice ? `€${estimatedPrice}` : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
