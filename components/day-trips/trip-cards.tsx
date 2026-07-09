"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllDayTripsQuery } from "@/Redux/features/dayTrip/dayTripApi";

const cities = ["Killarney", "Dublin", "Belfast", "Cork", "Limerick", "Galway"];

export default function TripCards() {
  const [selectedCity, setSelectedCity] = useState("Dublin");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: response, isLoading } = useGetAllDayTripsQuery(undefined);

  const allTrips = response?.data || [];

  const filteredTrips = allTrips.filter((trip: any) => {
    return trip.from?.toLowerCase().includes(selectedCity.toLowerCase());
  });

  const goToPrevious = () => {
    if (filteredTrips.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredTrips.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    if (filteredTrips.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === filteredTrips.length - 1 ? 0 : prevIndex + 1));
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setCurrentIndex(0);
  };

  const showSlider = filteredTrips.length >= 3;
  const visibleTrips = showSlider ? [
    filteredTrips[currentIndex % filteredTrips.length],
    filteredTrips[(currentIndex + 1) % filteredTrips.length],
    filteredTrips[(currentIndex + 2) % filteredTrips.length],
  ].filter(Boolean) : filteredTrips;

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading day trips...</p>
      </div>
    );
  }

  return (
    <div className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-14 gap-6 max-w-7xl mx-auto relative z-10">
        {showSlider && (
          <button
            onClick={goToPrevious}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 shrink-0"
            aria-label="Previous day trips"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-0">
          Explore the world with our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">100+ day trips!</span>
        </h2>

        {showSlider && (
          <button
            onClick={goToNext}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 shrink-0"
            aria-label="Next day trips"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex justify-center gap-3 mb-12 flex-wrap max-w-7xl mx-auto relative z-10">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => handleCityChange(city)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${selectedCity === city
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105"
              : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-200"
              }`}
          >
            {city}
          </button>
        ))}
      </div>

      {filteredTrips.length > 0 ? (
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleTrips.map((trip: any, idx: number) => (
              <Link
                key={trip.id || idx}
                href={`/day-trips/day-trip-details/${trip.id}`}
                className={`group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-white hover:-translate-y-2 flex flex-col h-full relative ${showSlider && idx === 2 ? "hidden lg:flex" : ""
                  } ${showSlider && idx === 1 ? "hidden md:flex" : ""}`}
              >
                {/* Subtle Glow Behind Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                <div className="relative h-56 overflow-hidden z-10">
                  <img
                    src={trip.images?.[0] || "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=800"}
                    alt={trip.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                </div>

                <div className="p-5 md:p-6 flex-grow flex flex-col relative z-10">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                    {trip.title}
                  </h3>
                  <div
                    className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow group-hover:text-gray-700 transition-colors"
                    dangerouslySetInnerHTML={{ __html: trip.description }}
                  />
                  <div className="text-sm text-gray-500 font-medium">
                    {trip.travelTimeMinutes ? `${Math.floor(trip.travelTimeMinutes / 60)}h ${trip.travelTimeMinutes % 60}m` : "N/A"} · {trip.groupType}
                  </div>
                </div>

                <div className="px-5 md:px-6 pb-5 md:pb-6 relative z-10 mt-auto">
                  <div className="flex items-center justify-between mb-5 pt-5 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">From</span>
                      <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">€{trip.price}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-50 text-blue-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-sm group-hover:shadow-md">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          {showSlider && (
            <div className="flex md:hidden items-center justify-center gap-4 mt-10 relative z-10">
              <button
                onClick={goToPrevious}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-blue-200 text-blue-600 active:bg-blue-50 transition-colors"
                aria-label="Previous day trips"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-blue-200 text-blue-600 active:bg-blue-50 transition-colors"
                aria-label="Next day trips"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300 mx-auto max-w-2xl relative z-10">
          <p className="text-gray-500 text-lg font-medium">No day trips found for {selectedCity}.</p>
        </div>
      )}
    </div>
  );
}

