"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/common/loading";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  Users,
} from "lucide-react";
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
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredTrips.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    if (filteredTrips.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredTrips.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setCurrentIndex(0);
  };

  const showSlider = filteredTrips.length > 4;
  const visibleTrips = showSlider
    ? [
        filteredTrips[currentIndex % filteredTrips.length],
        filteredTrips[(currentIndex + 1) % filteredTrips.length],
        filteredTrips[(currentIndex + 2) % filteredTrips.length],
        filteredTrips[(currentIndex + 3) % filteredTrips.length],
      ].filter(Boolean)
    : filteredTrips;

  if (isLoading) {
    return (
      <div className="relative px-5 md:px-0 py-10 md:py-16 bg-gray-50/50 overflow-hidden">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-10 md:py-5 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4 max-w-7xl mx-auto relative z-10">
        {showSlider && (
          <button
            onClick={goToPrevious}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md hover:scale-110 shrink-0"
            aria-label="Previous day trips"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-0">
          Explore the world with our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            100+ day trips!
          </span>
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

      <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap max-w-7xl mx-auto relative z-10">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => handleCityChange(city)}
            className={`px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm ${
              selectedCity === city
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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {visibleTrips.map((trip: any, idx: number) => (
              <Link
                key={trip.id || idx}
                href={`/day-trips/day-trip-details/${trip.id}`}
                className="card-theme group"
              >
                {/* Subtle Glow Behind Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                <div className="card-image-wrapper z-10">
                  <Image
                    src={
                      trip.images?.[0] ||
                      "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=800"
                    }
                    alt={trip.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1 relative z-10 justify-between gap-3">
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
                      {trip.title}
                    </h3>
                    <div
                      className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]"
                      dangerouslySetInnerHTML={{ __html: trip.description }}
                    />
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-3">
                      {trip.travelTimeMinutes && (
                        <span className="card-badge">
                          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {Math.floor(trip.travelTimeMinutes / 60) > 0 ? (
                            <span>
                              {Math.floor(trip.travelTimeMinutes / 60)}h
                              {trip.travelTimeMinutes % 60 > 0 && (
                                <span className="hidden sm:inline">
                                  {" "}
                                  {trip.travelTimeMinutes % 60}m
                                </span>
                              )}
                            </span>
                          ) : (
                            <span>{trip.travelTimeMinutes % 60}m</span>
                          )}
                        </span>
                      )}
                      {trip.groupType && (
                        <span className="card-badge-indigo">
                          <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {trip.groupType}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-2">
                    <div className="flex items-center justify-between mb-3 pt-2 border-t border-gray-100">
                      <span className="text-xs sm:text-sm font-medium text-gray-500">
                        Starts from
                      </span>
                      <span className="text-blue-600 font-extrabold text-sm sm:text-lg">
                        €
                        {trip.price ??
                          (trip.vehicles?.length
                            ? Math.min(
                                ...trip.vehicles.map((v: any) => v.price),
                              )
                            : 0)}
                      </span>
                    </div>
                    <div className="btn-theme-primary w-full group/btn">
                      <span className="tracking-wide">View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          {showSlider && (
            <div className="flex md:hidden items-center justify-center gap-4 mt-8 relative z-10">
              <button
                onClick={goToPrevious}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-blue-200 text-blue-600 active:bg-blue-50 transition-colors"
                aria-label="Previous day trips"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-blue-200 text-blue-600 active:bg-blue-50 transition-colors"
                aria-label="Next day trips"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300 mx-auto max-w-2xl relative z-10">
          <p className="text-gray-500 text-lg font-medium">
            No day trips found for {selectedCity}.
          </p>
        </div>
      )}
    </div>
  );
}
