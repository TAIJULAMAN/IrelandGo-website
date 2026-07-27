"use client";

import {
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Luggage,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { HeroTabs } from "../common/hero-tabs";
import { isTimeDisabled } from "@/utils/timeValidation";
import { useState, useRef, useEffect } from "react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import usePlacesAutocomplete from "use-places-autocomplete";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FeatureBadges } from "../common/feature-badges";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


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

export default function ByTheHourHero() {
  const [activeTab, setActiveTab] = useState("hourly");
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("09:00");
  const [duration, setDuration] = useState("2-hours");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [extraBags, setExtraBags] = useState(0);
  const [pickupLocation, setPickupLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { isLoaded } = useGoogleMaps();

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

  const handleSelect = (description: string) => {
    setPickupLocation(description);
    setValue(description, false);
    clearSuggestions();
    setShowDropdown(false);
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
      }
    }
  };

  const totalPassengers = adults + children;
  const handleTabClick = (id: string) => {
    if (id === "transfer") {
      router.push("/");
    } else if (id === "day-trips") {
      router.push("/day-trips");
    } else {
      setActiveTab(id);
    }
  };



  useEffect(() => {
    if (date && isTimeDisabled(date, time)) {
      for (let i = 0; i < 96; i++) {
        const hour = Math.floor(i / 4);
        const minute = (i % 4) * 15;
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        if (!isTimeDisabled(date, timeString)) {
          setTime(timeString);
          break;
        }
      }
    }
  }, [date]);

  const isFormValid = pickupLocation.trim() !== "" && date !== undefined && time !== "" && !isTimeDisabled(date, time);

  return (
    <>
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center py-16 pt-24 md:pt-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/Images/ByTheHour.webp"
            alt="Irish landscape"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 " />
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-5 mt-4 md:mt-6 py-8 text-center flex flex-col items-center">
            <div className="space-y-2 max-w-4xl mb-6">
              <h1 className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-white mb-2 text-balance leading-tight px-4">
                Book a Private Driver <span className="">by the Hour</span>
                <br className="hidden sm:block" /> – Travel Your Way
              </h1>
              <p className="text-sm md:text-base text-white mb-2 px-4 font-semibold">
                Discover over 100+ day trips and private tours with local drivers.
              </p>
            </div>

            <HeroTabs activeTab={activeTab} onTabChange={handleTabClick} className="flex justify-center mb-6 overflow-x-auto scrollbar-hide scroll-smooth w-full" />

            {/* Search Bar */}
            <div className="max-w-6xl mx-auto mb-4 relative w-full text-left">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 p-4 sm:p-6 transform transition-all hover:-translate-y-1">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <label className="text-start text-sm font-semibold text-gray-800 mb-2 block">
                      Pickup Location
                    </label>
                    <div className="relative">
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 transition-all bg-white/80 h-[52px] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20">
                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 ml-1" />
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Select pickup location"
                          className="w-full bg-transparent outline-none text-base font-medium text-gray-800 placeholder:text-gray-400"
                          value={pickupLocation}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPickupLocation(val);
                            setValue(val);
                            setShowDropdown(true);
                            setSelectedIndex(-1);
                          }}
                          onFocus={() => setShowDropdown(true)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>

                      {(status === "ZERO_RESULTS" || (status === "OK" && data.filter(s => !isOutOfRange(s.description)).length === 0)) && pickupLocation.trim().length > 2 && (
                        <div className="flex text-start justify-start">
                          <p className="text-red-500 text-xs mt-1 px-1">location is not in our range</p>
                        </div>
                      )}

                      {/* Autocomplete Dropdown */}
                      {showDropdown && status === "OK" && data.filter(s => !isOutOfRange(s.description)).length > 0 && (
                        <div
                          ref={dropdownRef}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50"
                        >
                          {data.filter(s => !isOutOfRange(s.description)).map((suggestion, index) => (
                            <button
                              key={suggestion.place_id}
                              onClick={() => handleSelect(suggestion.description)}
                              className={cn(
                                "w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0",
                                index === selectedIndex ? "bg-blue-50" : "",
                              )}
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
                  </div>
                </div>

                {/* Date, Time, Passengers, Luggage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {/* Date & Time */}
                  <div>
                    <label className="text-start text-sm font-semibold text-gray-800 mb-2 block">
                      Date & Time
                    </label>
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 transition-all bg-white/80 h-[52px] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20">
                      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-blue-600 flex-shrink-0" />
                            {date ? (
                              <span>
                                {format(date, "PPP")}{" "}
                                <span className="text-gray-400 mx-1">|</span>{" "}
                                {time}
                              </span>
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 max-w-[calc(100vw-2rem)]" align="start">
                          <div className="flex flex-col sm:flex-row">
                            <div className="border-b sm:border-b-0 sm:border-r">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={{ before: today }}
                                initialFocus
                              />
                            </div>
                            <div className="h-[150px] sm:h-[300px] w-full sm:w-[120px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                              <div className="grid grid-cols-3 sm:flex sm:flex-col gap-1">
                                {(() => {
                                  const availableTimes = Array.from({ length: 96 })
                                    .map((_, i) => {
                                      const hour = Math.floor(i / 4);
                                      const minute = (i % 4) * 15;
                                      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                                    })
                                    .filter((timeString) => !isTimeDisabled(date, timeString));

                                  if (availableTimes.length === 0) {
                                    return (
                                      <div className="text-center p-4 text-sm text-gray-500 col-span-3 sm:col-span-1">
                                        No times available
                                      </div>
                                    );
                                  }

                                  return availableTimes.map((timeString) => (
                                    <Button
                                      key={timeString}
                                      variant={time === timeString ? "default" : "ghost"}
                                      className={cn(
                                        "justify-center h-8 text-sm",
                                        time === timeString
                                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                                          : "hover:bg-blue-50 text-gray-700"
                                      )}
                                      onClick={() => {
                                        setTime(timeString);
                                        setIsCalendarOpen(false);
                                      }}
                                    >
                                      {timeString}
                                    </Button>
                                  ));
                                })()}
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-start text-sm font-semibold text-gray-800 mb-2 block">
                      Duration
                    </label>
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 transition-all bg-white/80 h-[52px] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700"
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm capitalize">
                                {duration.replace("-", " ")}
                              </span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[180px] p-1" align="start">
                          <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                            <div className="p-1 flex flex-col gap-1">
                              {Array.from({ length: 23 }, (_, i) => {
                                const hours = i + 2;
                                const option = `${hours}-hours`;
                                const isSelected = duration === option;
                                return (
                                  <Button
                                    key={option}
                                    variant="ghost"
                                    className={cn(
                                      "w-full justify-start font-normal h-9 px-3 transition-colors",
                                      isSelected
                                        ? "bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 hover:text-blue-700"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                    )}
                                    onClick={() => setDuration(option)}
                                  >
                                    {hours} Hours
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div>
                    <label className="text-start text-sm font-semibold text-gray-800 mb-2 block">
                      Passengers
                    </label>
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 transition-all bg-white/80 h-[52px] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700"
                          >
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm">
                                {totalPassengers} Passenger
                                {totalPassengers !== 1 ? "s" : ""}
                              </span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[300px] p-4" align="start">
                          <div className="space-y-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold text-base">
                                  Adults
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Age 12+
                                </p>
                              </div>
                              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                                  onClick={() =>
                                    setAdults(Math.max(1, adults - 1))
                                  }
                                  disabled={adults <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-4 text-center font-medium">
                                  {adults}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                                  onClick={() => setAdults(adults + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold text-base">
                                  Children
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Age 0-12
                                </p>
                              </div>
                              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                                  onClick={() =>
                                    setChildren(Math.max(0, children - 1))
                                  }
                                  disabled={children <= 0}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-4 text-center font-medium">
                                  {children}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                                  onClick={() => setChildren(children + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="pt-4 border-t">
                              <h4 className="font-medium mb-3 text-sm">
                                Each passenger is allowed
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                  <Luggage className="w-4 h-4" />
                                  <span className="flex-1">One checked bag</span>
                                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                    29 x 21 x 11 inch
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                  <Luggage className="w-4 h-4" />
                                  <span className="flex-1">One carry-on bag</span>
                                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                    22 x 14 x 9 inch
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Luggage */}
                  <div>
                    <label className="text-start text-sm font-semibold text-gray-800 mb-2 block">
                      Luggage
                    </label>
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 transition-all bg-white/80 h-[52px] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700"
                          >
                            <div className="flex items-center gap-2">
                              <Luggage className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm">
                                {extraBags} Extra Bag{extraBags !== 1 ? "s" : ""}
                              </span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[300px] p-4" align="start">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-lg mb-1">
                                Need more space?
                              </h4>
                              <p className="text-sm text-gray-500 leading-relaxed">
                                You can add extra sets of bags at no extra cost,
                                but you might need a bigger vehicle.
                              </p>
                            </div>
                            <div className="pt-4">
                              <h4 className="font-semibold text-base mb-1">
                                Extra sets of bags
                              </h4>
                              <p className="text-xs text-muted-foreground mb-4">
                                One checked bag + one carry on
                              </p>
                              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 w-fit">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                                  onClick={() =>
                                    setExtraBags(Math.max(0, extraBags - 1))
                                  }
                                  disabled={extraBags <= 0}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-4 text-center font-medium">
                                  {extraBags}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                                  onClick={() => setExtraBags(extraBags + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                {isFormValid ? (
                  <Link
                    href={{
                      pathname: "/booking-flow/step-2",
                      query: {
                        serviceType: "BY_THE_HOUR",
                        pickup: pickupLocation,
                        dropoff: pickupLocation,
                        date: date ? date.toISOString() : "",
                        time,
                        duration,
                        adults: adults.toString(),
                        children: children.toString(),
                        extraBags: extraBags.toString(),
                      },
                    }}
                  >
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-[0.98]">
                      Search Available Rides →
                    </button>
                  </Link>
                ) : (
                  <button className="w-full bg-blue-600/50 text-white/70 py-4 rounded-xl font-bold text-lg cursor-not-allowed" disabled>
                    Search Available Rides →
                  </button>
                )}
              </div>
            </div>

            {/* Features */}
            <FeatureBadges />
          </div>
        </div>
      </section>
    </>
  );
}
