"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Luggage,
  Plus,
  Clock,
  Search,
  ChevronDown,
  Minus,
  Timer,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "../layout/header";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FeatureBadges } from "../common/feature-badges";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";

const libraries: any = ["places"];

const MapRoute = dynamic(
  () => import("./map-route").then((mod) => ({ default: mod.MapRoute })),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center"
        style={{ minHeight: "340px" }}
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
  },
);

export function Hero() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [activeTab, setActiveTab] = useState("transfer");
  const [tripType, setTripType] = useState("one-way");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("09:00");
  const [duration, setDuration] = useState(2);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [returnTime, setReturnTime] = useState("09:00");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [extraBags, setExtraBags] = useState(0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isReturnCalendarOpen, setIsReturnCalendarOpen] = useState(false);

  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);

  const {
    suggestions: { status: pStatus, data: pData },
    setValue: setPValue,
    clearSuggestions: clearPSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: isLoaded,
    requestOptions: { componentRestrictions: { country: "ie" } },
    debounce: 300,
  });

  const {
    suggestions: { status: dStatus, data: dData },
    setValue: setDValue,
    clearSuggestions: clearDSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: isLoaded,
    requestOptions: { componentRestrictions: { country: "ie" } },
    debounce: 300,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) {
        setShowPickupDropdown(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(e.target as Node)) {
        setShowDropoffDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePickupSelect = (description: string) => {
    setPickupLocation(description);
    setPValue(description, false);
    clearPSuggestions();
    setShowPickupDropdown(false);
  };

  const handleDropoffSelect = (description: string) => {
    setDropoffLocation(description);
    setDValue(description, false);
    clearDSuggestions();
    setShowDropoffDropdown(false);
  };

  const totalPassengers = adults + children;
  const totalBags = adults + children + extraBags;

  const tabs = [
    { id: "transfer", label: "Transfer" },
    { id: "hourly", label: "By the hour", icon: Clock },
    { id: "day-trips", label: "Day trips" },
  ];

  const router = useRouter();

  const handleTabClick = (id: string) => {
    if (id === "hourly") {
      router.push("/by-the-hour");
    } else if (id === "day-trips") {
      router.push("/day-trips");
    } else {
      setActiveTab(id);
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 md:pt-24 min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="/transfer-hero.jpg"
          alt="Irish landscape"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl 2xl:max-w-8xl mx-auto px-5 sm:px-6 md:px-8 py-16 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-5 md:mb-10 pt-10">
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4 text-balance leading-tight px-4">
            Comfortable car transfers in Ireland
          </h1>
          <p className="text-base md:text-lg text-white mb-6 md:mb-8 px-4">
            Book private transfers and day tours with professional drivers.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-start mb-6 md:mb-10 overflow-x-auto scrollbar-hide scroll-smooth">
          <div className="inline-flex gap-0 bg-white/10 backdrop-blur-sm rounded-full p-1 border-2 border-blue-400/50 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-md"
                  : "bg-transparent text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {/* Booking Form Container */}
          <div className="flex flex-col lg:flex-row gap-5 container mx-auto bg-white rounded-xl shadow-xl p-4 md:p-5">
            <div className="w-full ">
              {/* Conditional Trip Type / Duration Selector */}
              {activeTab === "transfer" ? (
                <div className="flex gap-2 mb-5">
                  <button
                    onClick={() => setTripType("one-way")}
                    className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${tripType === "one-way"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    One Way
                  </button>
                  <button
                    onClick={() => setTripType("return")}
                    className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${tripType === "return"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    Return
                  </button>
                </div>
              ) : activeTab === "hourly" ? (
                <div className="mb-5">
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Duration (hours)
                  </label>
                  <div className="flex items-center gap-3 p-1 bg-gray-50 rounded-lg w-full md:w-fit">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 hover:bg-white shadow-sm rounded-md"
                      onClick={() => setDuration(Math.max(2, duration - 1))}
                      disabled={duration <= 2}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 px-4">
                      <Timer className="w-5 h-5 text-blue-500" />
                      <span className="font-bold text-lg min-w-[20px] text-center">
                        {duration}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 hover:bg-white shadow-sm rounded-md"
                      onClick={() => setDuration(Math.min(24, duration + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mb-5">
                  <p className="text-sm text-gray-500 italic">
                    Select a pickup and search for available day trips.
                  </p>
                </div>
              )}

              {/* Location Inputs */}
              <div className={`grid ${activeTab === "transfer" ? "md:grid-cols-2" : "grid-cols-1"} gap-4 mb-5`}>
                <div className="relative" ref={pickupRef}>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                    <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Pickup Location"
                      className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                      value={pickupLocation}
                      onChange={(e) => {
                        setPickupLocation(e.target.value);
                        setPValue(e.target.value);
                        setShowPickupDropdown(true);
                      }}
                      onFocus={() => setShowPickupDropdown(true)}
                    />
                  </div>
                  {showPickupDropdown && pStatus === "OK" && (
                    <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                      {pData.map((suggestion) => (
                        <button
                          key={suggestion.place_id}
                          onClick={() => handlePickupSelect(suggestion.description)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {suggestion.structured_formatting.main_text}
                              </div>
                              <div className="text-xs text-gray-500 text-balance">
                                {suggestion.structured_formatting.secondary_text}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {activeTab === "transfer" && (
                  <div className="relative" ref={dropoffRef}>
                    <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                      <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Dropoff Location"
                        className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                        value={dropoffLocation}
                        onChange={(e) => {
                          setDropoffLocation(e.target.value);
                          setDValue(e.target.value);
                          setShowDropoffDropdown(true);
                        }}
                        onFocus={() => setShowDropoffDropdown(true)}
                      />
                    </div>
                    {showDropoffDropdown && dStatus === "OK" && (
                      <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                        {dData.map((suggestion) => (
                          <button
                            key={suggestion.place_id}
                            onClick={() => handleDropoffSelect(suggestion.description)}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-center gap-3">
                              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {suggestion.structured_formatting.main_text}
                                </div>
                                <div className="text-xs text-gray-500 text-balance">
                                  {suggestion.structured_formatting.secondary_text}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Date, Time, Passengers, Luggage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {/* Date & Time */}
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Date & Time
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="flex">
                          <div className="border-r">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={{ before: today }}
                              initialFocus
                            />
                          </div>
                          <div className="h-[300px] w-[120px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                            <div className="flex flex-col gap-1">
                              {Array.from({ length: 48 }).map((_, i) => {
                                const hour = Math.floor(i / 2);
                                const minute = (i % 2) * 30;
                                const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                                return (
                                  <Button
                                    key={timeString}
                                    variant={
                                      time === timeString ? "default" : "ghost"
                                    }
                                    className={cn(
                                      "justify-center h-8 text-sm",
                                      time === timeString
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "hover:bg-blue-50",
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

                {/* Passengers */}
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Passengers
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700"
                        >
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm">
                              {totalPassengers} Passenger
                              {totalPassengers !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-4" align="start">
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
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
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
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
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
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
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
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
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
                                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                  29 x 21 x 11 inch
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Luggage className="w-4 h-4" />
                                <span className="flex-1">One carry-on bag</span>
                                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
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
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Luggage
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700"
                        >
                          <div className="flex items-center gap-2">
                            <Luggage className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm">
                              {extraBags} Extra Bag{extraBags !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-4" align="start">
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
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
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
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
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

              {activeTab === "transfer" && tripType === "return" && (
                <div className="mb-6">
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Return Date & Time
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
                    <Popover open={isReturnCalendarOpen} onOpenChange={setIsReturnCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700",
                            !returnDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
                          {returnDate ? (
                            <span>
                              {format(returnDate, "PPP")}{" "}
                              <span className="text-gray-400 mx-1">|</span> {returnTime}
                            </span>
                          ) : (
                            <span>Pick a return date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="flex">
                          <div className="border-r">
                            <Calendar
                              mode="single"
                              selected={returnDate}
                              onSelect={setReturnDate}
                              disabled={date ? { before: date } : { before: today }}
                              initialFocus
                            />
                          </div>
                          <div className="h-[300px] w-[120px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                            <div className="flex flex-col gap-1">
                              {Array.from({ length: 48 }).map((_, i) => {
                                const hour = Math.floor(i / 2);
                                const minute = (i % 2) * 30;
                                const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                                return (
                                  <Button
                                    key={timeString}
                                    variant={
                                      returnTime === timeString ? "default" : "ghost"
                                    }
                                    className={cn(
                                      "justify-center h-8 text-sm",
                                      returnTime === timeString
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "hover:bg-blue-50",
                                    )}
                                    onClick={() => {
                                      setReturnTime(timeString);
                                      setIsReturnCalendarOpen(false);
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
              )}
              <Link
                href={{
                  pathname: activeTab === "day-trips" ? "/day-trips" : "/booking-flow/step-2",
                  query: {
                    serviceType: activeTab === "transfer" ? "TRANSFER" : activeTab === "hourly" ? "BY_THE_HOUR" : "DAY_TRIP",
                    tripType: activeTab === "transfer" ? tripType : "one-way",
                    pickup: pickupLocation,
                    dropoff: dropoffLocation,
                    date: date ? date.toISOString() : "",
                    time,
                    duration: duration.toString(),
                    returnDate: returnDate ? returnDate.toISOString() : "",
                    returnTime,
                    adults: adults.toString(),
                    children: children.toString(),
                    extraBags: extraBags.toString(),
                  },
                }}
              >
                <Button className="w-full h-10 py-3" variant="outline">
                  <Search className="w-5 h-5 mr-2" />
                  {activeTab === "day-trips" ? "Explore Day Trips" : "Find a Ride"}
                </Button>
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg w-[450px] h-[340px] hidden lg:block shrink-0">
              <MapRoute
                pickup={pickupLocation ? { name: pickupLocation } : undefined}
                dropoff={activeTab === "transfer" && dropoffLocation ? { name: dropoffLocation } : undefined}
              />
            </div>
          </div>

          {/* Features */}
          <FeatureBadges />
        </div>
      </div>
    </section>
  );
}
