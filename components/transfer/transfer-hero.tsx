"use client";

import { Header } from "../common/header";
import { Search, MapPin } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function TransfersHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (location?: string) => {
    const searchLocation = location || searchQuery;
    if (searchLocation.trim()) {
      router.push(
        `/transfer/transfer-search?pickup=${encodeURIComponent(searchLocation)}`,
      );
    }
  };

  const handlePopularRoute = (route: string) => {
    router.push(
      `/transfer/transfer-search?pickup=${encodeURIComponent(route)}`,
    );
  };

  const popularRoutes = [
    "Dublin",
    "Cork",
    "Galway",
    "Limerick",
    "Belfast",
    "Killarney",
    "Shannon Airport",
    "Dublin Airport",
  ];

  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/transfer.png"
          alt="Irish landscape"
          className="w-full h-full object-cover"
        />
      </div>
      <Header />
      <div className="container mx-auto px-5 md:px-0 pt-10 md:pt-16 pb-10 md:pb-16 flex flex-col items-center text-center gap-5 md:gap-10">
        <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white px-2">
            Reliable Private Transfers Across
            <br className="hidden sm:block" />
            <span className="text-white"> Ireland</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/85 px-4">
            Book airport, city-to-city, and private transfers across Ireland
            with ease.
          </p>
        </div>

        {/* Search card */}
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-2xl px-4 sm:px-6 py-5 sm:py-6 flex flex-col gap-3 text-left">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="relative flex-1">
              <div className="flex items-center border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 gap-2 sm:gap-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter your departure city or destination"
                  className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-800 placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>

            <button
              onClick={() => handleSearch()}
              className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold whitespace-nowrap shadow-md transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span>Find Transfers</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs md:text-lg text-gray-600 mt-2">
            <span className="font-medium text-gray-700">Popular routes:</span>
            {popularRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() => handlePopularRoute(route)}
                className="text-blue-600 hover:underline"
              >
                {route}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mt-2 sm:mt-4 text-sm sm:text-base px-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              No.1 Choice
            </span>
            <span className="text-xs sm:text-sm md:text-base text-white/80">
              For Transfers
            </span>
          </div>
          <div className="hidden sm:block w-1 h-12 bg-white rounded-full" />
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              1000+
            </span>
            <span className="text-xs sm:text-sm md:text-base text-white/80">
              Happy Travelers
            </span>
          </div>
          <div className="hidden sm:block w-1 h-12 bg-white rounded-full" />
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              15+
            </span>
            <span className="text-xs sm:text-sm md:text-base text-white/80">
              Years Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
