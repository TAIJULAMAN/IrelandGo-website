"use client";

import { MapPin, Flag, Calendar as CalendarIcon, ChevronDown, Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useSearchParams } from "next/navigation";

const LIBRARIES: any = ["places"];

export function SearchHero({ trip }: { trip?: any }) {
  const searchParams = useSearchParams();

  // URL Params
  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";
  const dateParam = searchParams.get("date");
  const timeParam = searchParams.get("time") || "09:00";
  const adultsParam = parseInt(searchParams.get("adults") || "2");
  const childrenParam = parseInt(searchParams.get("children") || "0");
  const extraBagsParam = parseInt(searchParams.get("extraBags") || "0");

  // State
  const [adults, setAdults] = useState<number>(adultsParam);
  const [children, setChildren] = useState<number>(childrenParam);
  const [extraBags, setExtraBags] = useState<number>(extraBagsParam);
  const [date, setDate] = useState<Date | undefined>(dateParam ? new Date(dateParam) : undefined);
  const [time, setTime] = useState(timeParam);

  const [pickupLocation, setPickupLocation] = useState(pickupParam || trip?.from || "");
  const [dropoffLocation, setDropoffLocation] = useState(dropoffParam || trip?.to || "");
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [selectedPickupIndex, setSelectedPickupIndex] = useState(-1);
  const [selectedDropoffIndex, setSelectedDropoffIndex] = useState(-1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);
  const pickupDropdownRef = useRef<HTMLDivElement>(null);
  const dropoffDropdownRef = useRef<HTMLDivElement>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  const {
    ready: pickupReady,
    value: pickupValue,
    suggestions: { status: pickupStatus, data: pickupData },
    setValue: setPickupValue,
    clearSuggestions: clearPickupSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "ie" } },
    debounce: 300,
    defaultValue: pickupLocation,
    initOnMount: isLoaded,
  });

  const {
    ready: dropoffReady,
    value: dropoffValue,
    suggestions: { status: dropoffStatus, data: dropoffData },
    setValue: setDropoffValue,
    clearSuggestions: clearDropoffSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "ie" } },
    debounce: 300,
    defaultValue: dropoffLocation,
    initOnMount: isLoaded,
  });

  // Handle keyboard navigation for pickup
  const handlePickupKeyDown = (e: React.KeyboardEvent) => {
    if (!showPickupDropdown || pickupData.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedPickupIndex(prev => (prev < pickupData.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedPickupIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedPickupIndex >= 0) {
        const selected = pickupData[selectedPickupIndex];
        setPickupLocation(selected.description);
        setPickupValue(selected.description, false);
        clearPickupSuggestions();
        setShowPickupDropdown(false);
      }
    }
  };

  // Handle keyboard navigation for dropoff
  const handleDropoffKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropoffDropdown || dropoffData.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedDropoffIndex(prev => (prev < dropoffData.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedDropoffIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedDropoffIndex >= 0) {
        const selected = dropoffData[selectedDropoffIndex];
        setDropoffLocation(selected.description);
        setDropoffValue(selected.description, false);
        clearDropoffSuggestions();
        setShowDropoffDropdown(false);
      }
    }
  };

  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupDropdownRef.current && !pickupDropdownRef.current.contains(event.target as Node) && pickupInputRef.current && !pickupInputRef.current.contains(event.target as Node)) {
        setShowPickupDropdown(false);
      }
      if (dropoffDropdownRef.current && !dropoffDropdownRef.current.contains(event.target as Node) && dropoffInputRef.current && !dropoffInputRef.current.contains(event.target as Node)) {
        setShowDropoffDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative w-full h-[80vh] flex flex-col">      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/day-trips.jpg"
          alt="Search Results"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            {trip?.title || "Explore Ireland's Private Tours"}
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            {trip?.description
              ? trip.description.replace(/<[^>]*>?/gm, "").slice(0, 100) + (trip.description.length > 100 ? "..." : "")
              : "Browse our curated collection of private transfers and tours across Ireland's most iconic locations."}
          </p>
        </div>

        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-5 md:p-8">
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Pickup Location */}
            <div className="relative">
              <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12 hover:border-blue-400 transition">
                <MapPin className="w-4 h-4 text-blue-600" />
                <Input
                  ref={pickupInputRef}
                  type="text"
                  value={pickupLocation}
                  placeholder="Pickup Location"
                  className="border-0 bg-transparent h-10 px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-0 shadow-none w-full"
                  onChange={(e) => {
                    const val = e.target.value;
                    setPickupLocation(val);
                    setPickupValue(val);
                    setShowPickupDropdown(true);
                  }}
                  onFocus={() => setShowPickupDropdown(true)}
                  onKeyDown={handlePickupKeyDown}
                />
              </label>

              {showPickupDropdown && pickupStatus === "OK" && (
                <div ref={pickupDropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                  {pickupData.map((suggestion, index) => (
                    <button
                      key={suggestion.place_id}
                      className={cn("w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0", index === selectedPickupIndex && "bg-blue-50")}
                      onClick={() => {
                        setPickupLocation(suggestion.description);
                        setPickupValue(suggestion.description, false);
                        clearPickupSuggestions();
                        setShowPickupDropdown(false);
                      }}
                    >
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="text-sm font-medium text-slate-900">{suggestion.structured_formatting.main_text}</div>
                        <div className="text-xs text-slate-500">{suggestion.structured_formatting.secondary_text}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropoff Location */}
            <div className="relative">
              <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12 hover:border-blue-400 transition">
                <Flag className="w-4 h-4 text-blue-600" />
                <Input
                  ref={dropoffInputRef}
                  type="text"
                  value={dropoffLocation}
                  placeholder="Dropoff Location"
                  className="border-0 bg-transparent h-10 px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-0 shadow-none w-full"
                  onChange={(e) => {
                    const val = e.target.value;
                    setDropoffLocation(val);
                    setDropoffValue(val);
                    setShowDropoffDropdown(true);
                  }}
                  onFocus={() => setShowDropoffDropdown(true)}
                  onKeyDown={handleDropoffKeyDown}
                />
              </label>

              {showDropoffDropdown && dropoffStatus === "OK" && (
                <div ref={dropoffDropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                  {dropoffData.map((suggestion, index) => (
                    <button
                      key={suggestion.place_id}
                      className={cn("w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0", index === selectedDropoffIndex && "bg-blue-50")}
                      onClick={() => {
                        setDropoffLocation(suggestion.description);
                        setDropoffValue(suggestion.description, false);
                        clearDropoffSuggestions();
                        setShowDropoffDropdown(false);
                      }}
                    >
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="text-sm font-medium text-slate-900">{suggestion.structured_formatting.main_text}</div>
                        <div className="text-xs text-slate-500">{suggestion.structured_formatting.secondary_text}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date & Time Picker */}
            <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-slate-700",
                      !date && "text-slate-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-blue-600 flex-shrink-0" />
                    {date ? (
                      <span>
                        {format(date, "PPP")}{" "}
                        <span className="text-slate-400 mx-1">|</span> {time}
                      </span>
                    ) : (
                      <span>Pick a date & time</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex">
                    <div className="border-r border-slate-100">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={{ before: today }}
                        initialFocus
                      />
                    </div>
                    <div className="h-[300px] w-[110px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                      <div className="flex flex-col gap-1">
                        {Array.from({ length: 96 }).map((_, i) => {
                          const hour = Math.floor(i / 4);
                          const minute = (i % 4) * 15;
                          const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                          return (
                            <Button
                              key={timeString}
                              variant={time === timeString ? "default" : "ghost"}
                              className={cn(
                                "justify-center h-8 text-sm",
                                time === timeString
                                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                                  : "hover:bg-blue-50 text-slate-600"
                              )}
                              onClick={() => {
                                setTime(timeString);
                                setIsCalendarOpen(false);
                              }}
                            >
                              {timeString}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5 flex justify-center">
            <Link
              href={{
                pathname: "/booking-flow/step-2",
                query: {
                  serviceType: "DAY_TRIP",
                  id: trip?.id,
                  pickup: pickupLocation || "Dublin",
                  dropoff: dropoffLocation || "Galway",
                  date: date ? date.toISOString() : "",
                  time,
                  adults: adults.toString(),
                  children: children.toString(),
                  extraBags: extraBags.toString(),
                },
              }}
            >
              <button className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Find Your Trip
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
