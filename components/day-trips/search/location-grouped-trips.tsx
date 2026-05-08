"use client";

import { useGetAllDayTripsBasedOnLocationQuery } from "@/Redux/features/dayTrip/dayTripApi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";

export function LocationGroupedTrips() {
  const searchParams = useSearchParams();
  const searchLocation = searchParams.get("location") || "";

  const { data: response, isLoading, isError } = useGetAllDayTripsBasedOnLocationQuery(undefined);

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Fetching tours near you...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl inline-block max-w-md border border-red-100">
          <h3 className="text-lg font-bold mb-2">Connection Error</h3>
          <p className="text-sm">We're having trouble loading the tours right now. Please check your connection or try again later.</p>
        </div>
      </div>
    );
  }

  const allGroups = response?.data || [];
  
  // Filter groups based on searchLocation if provided
  const locationGroups = searchLocation 
    ? allGroups.filter((group: any) => 
        group.from?.toLowerCase() === searchLocation.toLowerCase()
      )
    : allGroups;

  return (
    <div className="space-y-20 px-6">
      {locationGroups.map((group: any, groupIndex: number) => (
        <div key={group.from || groupIndex}>
          <div className="flex items-end justify-between mb-8 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Explore from <span className="text-blue-600">{group.from}</span>
              </h2>
              <p className="text-gray-500 mt-1">Discover {group.trips?.length || 0} premium private transfers</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-blue-600 font-semibold text-sm hover:underline cursor-pointer group">
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {group.trips?.map((trip: any) => (
              <Link
                key={trip.id}
                href={`/day-trips/day-trip-details/${trip.id}`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 h-full flex flex-col">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={trip.images?.[0] || "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=800"}
                      alt={trip.title || `Transfer to ${trip.to}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-bold text-gray-900 mb-1.5 text-base leading-tight line-clamp-2">
                      {trip.title || `Private Transfer to ${trip.to}`}
                    </h3>
                    <div
                      className="text-gray-500 text-sm mb-3 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: trip.description || `Enjoy a comfortable and reliable private transfer from ${trip.from} to ${trip.to}.` }}
                    />
                    <div className="text-xs text-gray-600 mb-3">
                      {trip.travelTimeMinutes ? `${Math.floor(trip.travelTimeMinutes / 60)}h ${trip.travelTimeMinutes % 60}m` : "N/A"} · {trip.groupType}
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-blue-600">€{trip.price}</span>
                      <span className="text-xs text-gray-400">per person</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white px-8 py-2.5 rounded-full font-medium transition shadow-md hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {locationGroups.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any tours matching your search criteria. Try broadening your location.</p>
        </div>
      )}
    </div>
  );
}
