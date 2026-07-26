"use client";

import { Search, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FeatureBadges } from "../common/feature-badges";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import { cn } from "@/lib/utils";
import { HeroTabs } from "../common/hero-tabs";

const isOutOfRange = (desc: string) => {
  const lower = desc.toLowerCase();
  if (lower.includes("ireland")) return false;
  const niTownsAndCounties = [
    "antrim", "armagh", "down", "fermanagh", "londonderry", "derry", "tyrone",
    "aughnacloy", "ballycastle", "ballyclare", "ballymena", "ballymoney", "ballynahinch",
    "banbridge", "bangor", "belfast", "bushmills", "caledon", "carrickfergus", "castlederg",
    "castlewellan", "clogher", "coleraine", "cookstown", "craigavon", "crumlin",
    "donaghadee", "downpatrick", "dromore", "dungannon", "enniskillen", "fivemiletown",
    "hillsborough", "holywood", "larne", "limavady", "lisburn", "maghera", "magherafelt",
    "newcastle", "newry", "newtownabbey", "newtownards", "omagh", "portrush", "portstewart",
    "strabane"
  ];
  if (niTownsAndCounties.some(town => lower.includes(town))) return false;
  if (lower.includes("uk") || lower.includes("united kingdom")) return true;
  return false;
};

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
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: ["ie", "gb"] },
      locationRestriction: {
        north: 55.5,
        south: 51.3,
        east: -5.3,
        west: -10.8,
      }
    },
    debounce: 300,
    defaultValue: location,
    initOnMount: isLoaded,
  });

  const handleTabClick = (id: string) => {
    if (id === "transfer") {
      router.push("/");
    } else if (id === "hourly") {
      router.push("/by-the-hour");
    } else {
      setActiveTab(id);
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
    <>
      <section className="relative overflow-hidden min-h-[100vh] flex flex-col justify-center py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/Images/DayTrip.webp)" }}
        />
        <div className="absolute inset-0 " />
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-5 py-8 text-center flex flex-col items-center mt-10">
            <div className="space-y-4 md:space-y-6 max-w-4xl mb-10">
              <h1 className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-white mb-2 text-balance leading-tight px-4">
                Explore <span className="">Ireland's Wonders</span>
                <br className="hidden sm:block" /> in One Day
              </h1>
              <p className="text-sm md:text-base text-white mb-2 px-4 font-semibold">
                Discover over 100+ day trips and private tours with local drivers.
              </p>
            </div>

            <HeroTabs activeTab={activeTab} onTabChange={handleTabClick} className="flex justify-center mb-10 overflow-x-auto scrollbar-hide scroll-smooth w-full" />

            {/* Search Bar */}
            <div className="w-full max-w-3xl mx-auto mb-10 relative">
              <div className="relative flex items-center bg-white/95 backdrop-blur-xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 p-2 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/20 transition-all transform hover:-translate-y-1">
                <div className="pl-4 sm:pl-6 pr-2">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
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
                  className="flex-1 py-3 px-2 bg-transparent text-gray-800 text-base sm:text-lg font-medium placeholder:text-gray-400 focus:outline-none w-full"
                />
                <Link href={`/day-trips/search?pickup=${encodeURIComponent(location)}`}>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-[0.98] whitespace-nowrap ml-2">
                    Search
                  </button>
                </Link>
              </div>

              {(status === "ZERO_RESULTS" || (status === "OK" && data.filter(s => !isOutOfRange(s.description)).length === 0)) && location.trim().length > 2 && (
                <div className="flex text-start justify-start px-6">
                  <p className="text-red-500 text-xs mt-2 font-medium">location is not in our range</p>
                </div>
              )}

              {/* Autocomplete Dropdown */}
              {showDropdown && status === "OK" && data.filter(s => !isOutOfRange(s.description)).length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden text-left"
                >
                  {data.filter(s => !isOutOfRange(s.description)).map((suggestion, index) => (
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
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
      </section>
    </>
  );
}
