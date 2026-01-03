"use client";

import Link from "next/link";
import { Header } from "../common/header";
import { Search, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { irishSettlements } from "@/lib/irish-settlements";

export default function TransfersHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter settlements based on search query
  const filteredSettlements = searchQuery.trim()
    ? irishSettlements.filter(
      (settlement) =>
        settlement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        settlement.county.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8) // Limit to 8 results
    : [];

  // Handle search submission
  const handleSearch = (location?: string) => {
    const searchLocation = location || searchQuery;
    if (searchLocation.trim()) {
      router.push(`/transfer/transfer-search?location=${encodeURIComponent(searchLocation)}`);
    }
  };

  // Handle popular route click
  const handlePopularRoute = (route: string) => {
    setSearchQuery(route);
    handleSearch(route);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || filteredSettlements.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSettlements.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          const selected = filteredSettlements[selectedIndex];
          setSearchQuery(selected.name);
          handleSearch(selected.name);
          setShowDropdown(false);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const popularRoutes = [
    "Dublin",
    "Cork",
    "Galway",
    "Limerick",
    "Belfast",
    "Killarney",
    "Shannon Airport",
    "Dublin Airport"
  ];

  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      {/* Background image */}
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
            Reliable Airport Transfers Across
            <br className="hidden sm:block" />
            <span className="text-white"> Ireland</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/85 px-4">
            Book airport, city-to-city, and private transfers across Ireland with ease.
          </p>
        </div>

        {/* Search card */}
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-2xl px-4 sm:px-6 py-5 sm:py-6 flex flex-col gap-3 text-left">
          {/* Top row: input + button */}
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                    setSelectedIndex(-1);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              {/* Autocomplete Dropdown */}
              {showDropdown && filteredSettlements.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
                >
                  {filteredSettlements.map((settlement, index) => (
                    <button
                      key={settlement.id}
                      onClick={() => {
                        setSearchQuery(settlement.name);
                        handleSearch(settlement.name);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 ${index === selectedIndex ? "bg-blue-50" : ""
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {settlement.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {settlement.county}, {settlement.province}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleSearch()}
              className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold whitespace-nowrap shadow-md transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span>Find Transfers</span>
            </button>
          </div>

          {/* Bottom row: popular routes */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs md:text-lg text-gray-600 mt-2">
            <span className="font-medium text-gray-700">Popular routes:</span>
            {popularRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() => handlePopularRoute(route)}
                className="text-blue-600"
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
            <span className="text-xs sm:text-sm md:text-base text-white/80">For Transfers</span>
          </div>
          <div className="hidden sm:block w-1 h-12 bg-white rounded-full" />
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              1000+
            </span>
            <span className="text-xs sm:text-sm md:text-base text-white/80">Happy Travelers</span>
          </div>
          <div className="hidden sm:block w-1 h-12 bg-white rounded-full" />
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              15+
            </span>
            <span className="text-xs sm:text-sm md:text-base text-white/80">Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
