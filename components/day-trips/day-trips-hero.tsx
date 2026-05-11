"use client";

import { Search, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FeatureBadges } from "../common/feature-badges";
import { Header } from "../common/header";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import { cn } from "@/lib/utils";

const LIBRARIES: any = ["places"];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("day-trips");
  const [location, setLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "ie" },
    },
    debounce: 300,
    defaultValue: location,
    initOnMount: isLoaded,
  });

  const tabs = [
    { id: "transfer", label: "Transfer", href: "/" },
    { id: "hourly", label: "By the hour", href: "/by-the-hour" },
    { id: "day-trips", label: "Day trips", href: "/day-trips" },
  ];

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (tab.href) {
      router.push(tab.href);
    } else {
      setActiveTab(tab.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || data.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        const selected = data[selectedIndex];
        setLocation(selected.description);
        setValue(selected.description, false);
        clearSuggestions();
        setShowDropdown(false);
      }
    }
  };

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

  return (
    <div className="relative text-white h-[70vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/day-trips.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <div className="max-w-7xl mx-auto px-5 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 mt-8">
            Explore Ireland's Wonders in One Day
          </h1>
          <p className="text-lg text-white/80 mb-10">
            Discover over 100+ day trips and private tours with local drivers.
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex gap-0 bg-white/10 backdrop-blur-sm rounded-full p-1 border-2 border-white">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-md"
                    : "bg-transparent text-white hover:bg-white/10"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10 relative">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Explore from..."
                value={location}
                onChange={(e) => {
                  const val = e.target.value;
                  setLocation(val);
                  setValue(val);
                  setShowDropdown(true);
                  setSelectedIndex(-1);
                }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={handleKeyDown}
                className="w-full py-4 px-6 pl-12 pr-32 rounded-full text-gray-800 text-base focus:outline-none shadow-lg bg-white"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Link href={`/day-trips/search?pickup=${encodeURIComponent(location)}`}>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-medium transition shadow-md">
                  Search
                </button>
              </Link>
            </div>

            {/* Autocomplete Dropdown */}
            {showDropdown && status === "OK" && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden text-left"
              >
                {data.map((suggestion, index) => (
                  <button
                    key={suggestion.place_id}
                    className={cn(
                      "w-full px-5 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0",
                      index === selectedIndex && "bg-blue-50"
                    )}
                    onClick={() => {
                      setLocation(suggestion.description);
                      setValue(suggestion.description, false);
                      clearSuggestions();
                      setShowDropdown(false);
                    }}
                  >
                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {suggestion.structured_formatting.main_text}
                      </div>
                      <div className="text-xs text-gray-500">
                        {suggestion.structured_formatting.secondary_text}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <FeatureBadges />
        </div>
      </div>
    </div>
  );
}
