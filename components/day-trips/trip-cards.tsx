"use client";

import { useState } from "react";
import Loading from "@/components/common/loading";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetAllDayTripsQuery } from "@/Redux/features/dayTrip/dayTripApi";
import TripGrid from "./trip-grid";

const cities = ["Killarney", "Dublin", "Belfast", "Cork", "Limerick", "Galway"];

export default function TripCards() {
  const [selectedCity, setSelectedCity] = useState("Dublin");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const { data: response, isLoading } = useGetAllDayTripsQuery(undefined);

  const allTrips = response?.data || [];

  const filteredTrips = allTrips.filter((trip: any) => {
    const matchesCity =
      selectedCity === "All" ||
      trip.from?.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      trip.from?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setVisibleCount(8);
  };

  if (isLoading) {
    return (
      <div className="relative px-5 md:px-0 py-10 md:py-16 bg-gray-50/50 overflow-hidden">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative px-5 sm:px-10 md:px-0 lg:px-0 xl:px-0 pt-32 md:pt-40 lg:pt-48 pb-5 md:pb-10 overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mb-8 md:mb-12 gap-4 max-w-7xl mx-auto relative z-10">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-0">
          Explore the world with our 100+ day trips!
        </h2>
      </div>
      <div className="flex flex-col gap-5 mb-8 sm:mb-10 max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => handleCityChange("All")}
            className={`px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm ${
              selectedCity === "All"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105"
                : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-200"
            }`}
          >
            All Cities
          </button>
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
        <div className="flex justify-end w-full">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search by pickup location..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(8);
              }}
              className="pl-10 rounded-full border border-blue-200 bg-white hover:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 shadow-sm h-10 py-1.5 text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all duration-300"
            />
          </div>
        </div>
      </div>
      <TripGrid
        filteredTrips={filteredTrips}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        selectedCity={selectedCity}
      />
    </div>
  );
}
