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
      <div className="py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading day trips...</p>
      </div>
    );
  }

  return (
    <div className="px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-16 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4 container mx-auto">
        {showSlider && (
          <button
            onClick={goToPrevious}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors shrink-0"
            aria-label="Previous day trips"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-0">
          Explore the world with our 100+ day trips!
        </h2>

        {showSlider && (
          <button
            onClick={goToNext}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors shrink-0"
            aria-label="Next day trips"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex justify-center gap-3 mb-12 flex-wrap container mx-auto">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => handleCityChange(city)}
            className={`px-6 py-2.5 rounded-full font-medium transition ${selectedCity === city
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            {city}
          </button>
        ))}
      </div>

      {filteredTrips.length > 0 ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTrips.map((trip: any, idx: number) => (
              <Link
                key={trip.id || idx}
                href={`/day-trips/day-trip-details/${trip.id}`}
                className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 h-full flex flex-col ${
                  showSlider && idx === 2 ? "hidden lg:flex" : ""
                } ${showSlider && idx === 1 ? "hidden md:flex" : ""}`}
              >
                <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
                  <img
                    src={trip.images?.[0] || "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=800"}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-900 mb-2 text-base md:text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {trip.title}
                  </h3>
                  <div
                    className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow"
                    dangerouslySetInnerHTML={{ __html: trip.description }}
                  />
                  <div className="text-xs md:text-sm text-gray-600 font-medium">
                    {trip.travelTimeMinutes ? `${Math.floor(trip.travelTimeMinutes / 60)}h ${trip.travelTimeMinutes % 60}m` : "N/A"} · {trip.groupType}
                  </div>
                </div>
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
                    <span className="text-xl font-bold text-blue-600">€{trip.price}</span>
                    <span className="text-xs text-gray-400">per person</span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          {showSlider && (
            <div className="flex md:hidden items-center justify-center gap-4 mt-8">
              <button
                onClick={goToPrevious}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
                aria-label="Previous day trips"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
                aria-label="Next day trips"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 mx-auto max-w-2xl">
          <p className="text-gray-500 text-lg">No day trips found for {selectedCity}.</p>
        </div>
      )}
    </div>
  );
}

