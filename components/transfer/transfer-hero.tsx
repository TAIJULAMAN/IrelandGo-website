"use client";

import { Search, Car, MapPin } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import usePlacesAutocomplete from "use-places-autocomplete";

const ELIGIBLE_LOCATIONS = [
  "Galway", "Dublin", "Killarney", "Cork", "Dingle", "Kilkenny", "Limerick", "Belfast",
  "Waterford", "Ashford castle", "Kinsale", "Doolin", "Shannon", "Adare",
  "Tralee", "Ennis", "Clifden", "Donegal", "Westport", "Cliffs of Moher",
  "Kenmare", "Athlone", "Cashel", "Knock Shrine", "Sligo", "Lahinch", "Cobh",
  "Blarney", "Rosslare", "Tullamore Dew", "Wexford", "Newgrange",
  "Bunratty Castle", "Glendalough", "Farranfore", "Howth", "Doonbeg",
  "Dromoland Castle Hotel", "Trim Castle", "Dundalk", "Spanish Point",
  "University of Limerick", "Ardmore", "Bunratty", "Kylemore Abbey", "Cong",
  "Drogheda", "Liscannor", "Malin Head", "Foxford", "Rossaveel", "Bray",
  "Ballina", "Ballybunion", "Bantry", "Scariff", "Kilkee", "Charleville",
  "Mallow", "Kildare Village", "Killaloe", "Clonegall", "Enfield",
  "Dunbrody Famine Ship", "Dalkey", "Miltown Malbay", "Foynes", "Midleton",
  "Valentia Island", "Newcastle West", "Wicklow", "Kinvara", "Rock of Cashel",
  "Ballyvaughan", "Blarney Stone", "Tipperary", "Mullagh", "Kildare",
  "Savoy Hotel Limerick", "Treacys oakwood hotel", "Old Ground Hotel Ennis",
  "Glenlo Abbey Hotel & Estate", "Carton House, A Fairmont Managed Hotel",
  "Mount Juliet Estate, Autograph Collection", "Ballyfin Demesne",
  "Sheen Falls Lodge"
];

const EXCLUDED_LOCATIONS = [
  "Shannon Airport", "Dublin Airport", "Cork Airport", "Knock Airport", "Kerry Airport"
];

export default function TransfersHero() {
  const router = useRouter();
  const { isLoaded } = useGoogleMaps();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const requestOptions = useMemo(() => ({
    componentRestrictions: { country: "ie" }
  }), []);

  const {
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions,
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

    if (searchLocation.trim()) {
      const isExcluded = EXCLUDED_LOCATIONS.some((loc) =>
        searchLocation.toLowerCase().includes(loc.toLowerCase())
      );

      const isEligible = ELIGIBLE_LOCATIONS.some((loc) =>
        searchLocation.toLowerCase().includes(loc.toLowerCase())
      );

      if (isExcluded || !isEligible) {
        setErrorMsg("Transfers are not available for this location.");
        return;
      }
    }

    const query = searchLocation.trim()
      ? `?pickup=${encodeURIComponent(searchLocation.trim())}&serviceType=PRIVATE_TRANSFER`
      : "?serviceType=PRIVATE_TRANSFER";
    router.push(`/transfer/transfer-search${query}`);
  };

  const handlePopularRoute = (route: string) => {
    setSearchQuery(route);
    setValue(route, false);
    setErrorMsg("");
    handleSearch(route);
  };

  const handleSelect = (description: string) => {
    setSearchQuery(description);
    setValue(description, false);
    clearSuggestions();
    setShowDropdown(false);
    setErrorMsg("");
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
    "Killarney"
  ];

  return (
    <section className="relative min-h-[100vh] md:min-h-[100vh] flex items-center justify-center text-white overflow-hidden pt-28 pb-16 md:pb-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Media.png"
          alt="Irish landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/40" />
      </div>
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 flex flex-col items-center text-center gap-6 md:gap-8 relative z-10">
        <div className="space-y-4 md:space-y-6 max-w-4xl">
          <h1 className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight drop-shadow-2xl">
            Reliable Private Transfers Across
            <br className="hidden sm:block" />
            <span className=""> Ireland</span>
          </h1>
          <p className="text-sm md:text-base text-white px-4 font-medium drop-shadow-md leading-relaxed">
            Book airport, city-to-city, and private transfers across Ireland
            with ease.
          </p>
        </div>

        {/* Search card */}
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-5 sm:px-8 py-6 sm:py-8 flex flex-col gap-6 text-left border border-white/20 transform transition-all hover:-translate-y-1 relative z-20">
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <div className="relative flex-1">
              <div className="h-14 flex items-center border border-gray-200 rounded-xl px-4 gap-3 bg-white/80 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all">
                <Car className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter your departure city or destination"
                  className="w-full bg-transparent outline-none text-base sm:text-lg text-gray-800 placeholder:text-gray-400 font-medium"
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    setValue(val);
                    setShowDropdown(true);
                    setSelectedIndex(-1);
                    setErrorMsg("");
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              {errorMsg && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full text-red-500 text-sm font-medium bg-red-50/95 backdrop-blur-md px-4 py-3 rounded-lg border border-red-200 shadow-lg z-40">
                  {errorMsg}
                </div>
              )}

              {/* Autocomplete Dropdown */}
              {showDropdown && status === "OK" && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50"
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
                        <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
              className="btn-theme-primary h-14 px-8 whitespace-nowrap rounded-xl text-base"
            >
              <Search className="w-5 h-5 mr-2" />
              <span>Find Transfers</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-semibold text-gray-800 text-sm sm:text-base mr-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Popular Routes:
            </span>
            {popularRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() => handlePopularRoute(route)}
                className="px-4 py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-full border border-gray-200 hover:border-blue-200 transition-all font-medium text-xs sm:text-sm whitespace-nowrap"
              >
                {route}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 mt-4 sm:mt-8 px-8 sm:px-12 py-5 sm:py-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
              No.1
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-200 mt-1 uppercase tracking-widest text-center">
              For Transfers
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
