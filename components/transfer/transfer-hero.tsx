"use client";

import { Header } from "../common/header";
import { Search, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";

const libraries: any = ["places"];

export default function TransfersHero() {
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "ie" }, // Restrict to Ireland
    },
    debounce: 300,
    initOnMount: isLoaded,
  });

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

  const handleSearch = (location?: string) => {
    const searchLocation = location || searchQuery;
    const query = searchLocation.trim()
      ? `?pickup=${encodeURIComponent(searchLocation)}`
      : "";
    router.push(`/transfer/transfer-search${query}`);
  };

  const handlePopularRoute = (route: string) => {
    setSearchQuery(route);
    setValue(route, false);
    handleSearch(route);
  };

  const handleSelect = (description: string) => {
    setSearchQuery(description);
    setValue(description, false);
    clearSuggestions();
    setShowDropdown(false);
    handleSearch(description);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = data.length;
    if (showDropdown && totalItems > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        handleSelect(data[selectedIndex].description);
      } else if (e.key === "Escape") {
        setShowDropdown(false);
      } else if (e.key === "Enter") {
        handleSearch();
      }
    } else if (e.key === "Enter") {
      handleSearch();
    }
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
        <div className="absolute inset-0 z-0">
          <img
            src="/transfer.png"
            alt="Irish landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl 2xl:max-w-8xl mx-auto px-5 sm:px-6 md:px-8 pt-10 md:pt-48 relative z-10 flex flex-col items-center text-center gap-5 md:gap-10">
          <div className="text-center mb-5 md:mb-10 pt-10">
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4 text-balance leading-tight px-4">
              Reliable Private Transfers Across

              Ireland
            </h1>
            <p className="text-base md:text-lg text-white mb-6 md:mb-8 px-4">
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
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchQuery(val);
                      setValue(val);
                      setShowDropdown(true);
                      setSelectedIndex(-1);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {showDropdown && status === "OK" && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto z-50"
                  >
                    {/* Google Places Results */}
                    {data.map((suggestion, index) => (
                      <button
                        key={suggestion.place_id}
                        onClick={() => handleSelect(suggestion.description)}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 ${index === selectedIndex ? "bg-blue-50" : ""
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {suggestion.structured_formatting.main_text}
                            </div>
                            <div className="text-xs text-gray-500">
                              {suggestion.structured_formatting.secondary_text}
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
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-gray-600 mt-2">
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
