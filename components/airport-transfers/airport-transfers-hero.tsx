"use client";

import { Search, MapPin, Plane } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AirportTransfersHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const popularAirports = [
    "Shannon Airport",
    "Dublin Airport",
    "Cork Airport",
    "Knock Airport",
    "Kerry Airport",
  ];

  const handleSearch = (location?: string) => {
    const searchLocation = location || searchQuery;
    if (searchLocation.trim()) {
      const isEligible = popularAirports.some((loc) =>
        searchLocation.toLowerCase().includes(loc.toLowerCase())
      );

      if (!isEligible) {
        setErrorMsg("Transfers are not available for this location.");
        return;
      }

      router.push(
        `/transfer/transfer-search?pickup=${encodeURIComponent(searchLocation)}&serviceType=AIRPORT_TRANSFER`,
      );
    }
  };
  const handlePopularRoute = (route: string) => {
    setErrorMsg("");
    router.push(
      `/transfer/transfer-search?pickup=${encodeURIComponent(route)}&serviceType=AIRPORT_TRANSFER`,
    );
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center text-white overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <img
          src="/Images/AirportTransfers.webp"
          alt="Irish landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/10" />
      </div>
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 flex flex-col items-center text-center gap-8 md:gap-12 relative z-10 mt-10">

        {/* Header Text */}
        <div className="space-y-4 md:space-y-6 max-w-4xl">
          <h1 className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-white mb-2 text-balance leading-tight px-4">
            Reliable Airport Transfers Across
            <br className="hidden sm:block" />
            <span className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-white mb-2 text-balance leading-tight px-4"> Ireland</span>
          </h1>
          <p className="text-sm md:text-base text-white mb-2 px-4 font-semibold">
            Start your Irish adventure with our premium airport transfer
            services. Enjoy comfortable, reliable, and prompt journeys
            connecting you between all major airports and destinations across
            the Emerald Isle.
          </p>
        </div>

        {/* Search card (Glassmorphism) */}
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-5 sm:px-8 py-6 sm:py-8 flex flex-col gap-6 text-left border border-white/20 transform transition-all hover:-translate-y-1">
          {/* Top row: input + button */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <div className="relative flex-1">
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 sm:py-4 gap-3 bg-white/80 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all">
                <Plane className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter airport name (e.g. Dublin Airport)"
                  className="w-full bg-transparent outline-none text-base sm:text-lg text-gray-800 placeholder:text-gray-400 font-medium"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setErrorMsg("");
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>

            <button
              onClick={() => handleSearch()}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-base sm:text-lg font-bold whitespace-nowrap shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform active:scale-[0.98]"
            >
              <Search className="w-5 h-5 mr-2" />
              <span>Find Transfers</span>
            </button>
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm font-medium bg-red-50 px-4 py-3 rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* Bottom row: popular routes */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-semibold text-gray-800 text-sm sm:text-base mr-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Popular Airports:
            </span>
            {popularAirports.map((airport, index) => (
              <button
                key={index}
                onClick={() => handlePopularRoute(airport)}
                className="px-4 py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-full border border-gray-200 hover:border-blue-200 transition-all font-medium text-xs sm:text-sm whitespace-nowrap"
              >
                {airport}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row (Glassmorphism Pilled) */}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 mt-4 sm:mt-8 px-8 sm:px-12 py-5 sm:py-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
              50+
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-200 mt-1 uppercase tracking-widest text-center">
              Routes
            </span>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
              1000+
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-200 mt-1 uppercase tracking-widest text-center">
              Happy Travelers
            </span>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
              15+
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-200 mt-1 uppercase tracking-widest text-center">
              Years Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
