"use client";

import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar as CalendarIcon, Users, Luggage, Plus, Search, Clock, X, ChevronDown, Minus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { irishSettlements } from "@/lib/irish-settlements";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils"

// Dynamically import MapRoute with SSR disabled to prevent "window is not defined" error
const MapRoute = dynamic(() => import("../home/map-route").then(mod => ({ default: mod.MapRoute })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: '340px' }}>
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
});

export default function TransferSearchHero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("location") || "";

  const [tripType, setTripType] = useState("one-way");
  const [pickupLocation, setPickupLocation] = useState(locationParam);
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [selectedPickupIndex, setSelectedPickupIndex] = useState(-1);
  const [selectedDropoffIndex, setSelectedDropoffIndex] = useState(-1);

  // Date and time state
  const [pickupDate, setPickupDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState("09:00");
  const [returnDate, setReturnDate] = useState<Date>();
  const [returnTime, setReturnTime] = useState("09:00");

  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);
  const pickupDropdownRef = useRef<HTMLDivElement>(null);
  const dropoffDropdownRef = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")

  // Filter settlements for pickup
  const filteredPickupSettlements = pickupLocation.trim()
    ? irishSettlements.filter(
      (settlement) =>
        settlement.name.toLowerCase().includes(pickupLocation.toLowerCase()) ||
        settlement.county.toLowerCase().includes(pickupLocation.toLowerCase())
    ).slice(0, 8)
    : [];

  // Filter settlements for dropoff
  const filteredDropoffSettlements = dropoffLocation.trim()
    ? irishSettlements.filter(
      (settlement) =>
        settlement.name.toLowerCase().includes(dropoffLocation.toLowerCase()) ||
        settlement.county.toLowerCase().includes(dropoffLocation.toLowerCase())
    ).slice(0, 8)
    : [];

  // Add stop
  const addStop = () => {
    setStops([...stops, ""]);
  };

  // Remove stop
  const removeStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  // Update stop value
  const updateStop = (index: number, value: string) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  // Handle search submission
  const handleSearch = () => {
    if (pickupLocation.trim() && dropoffLocation.trim()) {
      const params = new URLSearchParams({
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        tripType: tripType,
      });

      if (pickupDate) {
        params.append('pickupDate', pickupDate.toISOString());
        params.append('pickupTime', pickupTime);
      }

      if (tripType === 'return' && returnDate) {
        params.append('returnDate', returnDate.toISOString());
        params.append('returnTime', returnTime);
      }

      router.push(`/transfer/private-car-transfer?${params.toString()}`);
    }
  };

  // Handle keyboard navigation for pickup
  const handlePickupKeyDown = (e: React.KeyboardEvent) => {
    if (!showPickupDropdown || filteredPickupSettlements.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedPickupIndex((prev) =>
          prev < filteredPickupSettlements.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedPickupIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedPickupIndex >= 0) {
          const selected = filteredPickupSettlements[selectedPickupIndex];
          setPickupLocation(selected.name);
          setShowPickupDropdown(false);
        }
        break;
      case "Escape":
        setShowPickupDropdown(false);
        setSelectedPickupIndex(-1);
        break;
    }
  };

  // Handle keyboard navigation for dropoff
  const handleDropoffKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropoffDropdown || filteredDropoffSettlements.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedDropoffIndex((prev) =>
          prev < filteredDropoffSettlements.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedDropoffIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedDropoffIndex >= 0) {
          const selected = filteredDropoffSettlements[selectedDropoffIndex];
          setDropoffLocation(selected.name);
          setShowDropoffDropdown(false);
        }
        break;
      case "Escape":
        setShowDropoffDropdown(false);
        setSelectedDropoffIndex(-1);
        break;
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickupDropdownRef.current &&
        !pickupDropdownRef.current.contains(event.target as Node) &&
        pickupInputRef.current &&
        !pickupInputRef.current.contains(event.target as Node)
      ) {
        setShowPickupDropdown(false);
      }
      if (
        dropoffDropdownRef.current &&
        !dropoffDropdownRef.current.contains(event.target as Node) &&
        dropoffInputRef.current &&
        !dropoffInputRef.current.contains(event.target as Node)
      ) {
        setShowDropoffDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tabs = [
    { id: "transfer", label: "Transfer" },
    { id: "hourly", label: "By the hour", icon: Clock, href: "/by-the-hour" },
    { id: "day-trips", label: "Day trips", href: "/day-trips" },
  ];

  // Get display location for hero title
  const displayLocation = pickupLocation || "Dublin";


  // Passengers and Luggage state
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [extraBags, setExtraBags] = useState(0)

  // Computed totals for display
  const totalPassengers = adults + children
  const totalBags = extraBags

  return (
    <section className="relative overflow-hidden min-h-screen text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/transfer-search.jpg"
          alt="Runway at sunset"
          className="w-full h-full object-cover"
        />

      </div>

      <Header />

      <div className="container mx-auto px-5 md:px-0 py-10 md:py-16 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-10 pt-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Discover {displayLocation} with
            <br className="hidden sm:block" />
            Comfortable Transfers
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Seamless city-to-city and airport transfers across {displayLocation} and
            beyond.
          </p>
        </div>

        {/* Booking Card */}
        <div className="flex gap-5 container mx-auto bg-white rounded-xl shadow-xl p-5">
          <div className="w-full ">
            {/* Tabs */}
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

            {/* Location Inputs */}
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              {/* Pickup Location */}
              <div className="relative">
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <input
                    ref={pickupInputRef}
                    type="text"
                    placeholder="Pickup Location"
                    className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    value={pickupLocation}
                    onChange={(e) => {
                      setPickupLocation(e.target.value);
                      setShowPickupDropdown(true);
                      setSelectedPickupIndex(-1);
                    }}
                    onFocus={() => setShowPickupDropdown(true)}
                    onKeyDown={handlePickupKeyDown}
                  />
                </div>

                {/* Pickup Autocomplete Dropdown */}
                {showPickupDropdown && filteredPickupSettlements.length > 0 && (
                  <div
                    ref={pickupDropdownRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
                  >
                    {filteredPickupSettlements.map((settlement, index) => (
                      <button
                        key={settlement.id}
                        onClick={() => {
                          setPickupLocation(settlement.name);
                          setShowPickupDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 ${index === selectedPickupIndex ? "bg-blue-50" : ""
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

              {/* Dropoff Location */}
              <div className="relative">
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <input
                    ref={dropoffInputRef}
                    type="text"
                    placeholder="Dropoff Location"
                    className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    value={dropoffLocation}
                    onChange={(e) => {
                      setDropoffLocation(e.target.value);
                      setShowDropoffDropdown(true);
                      setSelectedDropoffIndex(-1);
                    }}
                    onFocus={() => setShowDropoffDropdown(true)}
                    onKeyDown={handleDropoffKeyDown}
                  />
                </div>

                {/* Dropoff Autocomplete Dropdown */}
                {showDropoffDropdown && filteredDropoffSettlements.length > 0 && (
                  <div
                    ref={dropoffDropdownRef}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
                  >
                    {filteredDropoffSettlements.map((settlement, index) => (
                      <button
                        key={settlement.id}
                        onClick={() => {
                          setDropoffLocation(settlement.name);
                          setShowDropoffDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 ${index === selectedDropoffIndex ? "bg-blue-50" : ""
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
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
            </div>

            {/* Additional Stops */}
            {stops.map((stop, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder={`Stop ${index + 1}`}
                    className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    value={stop}
                    onChange={(e) => updateStop(index, e.target.value)}
                  />
                  <button
                    onClick={() => removeStop(index)}
                    className="text-red-500 hover:text-red-600 transition"
                    aria-label="Remove stop"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addStop}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-500 text-sm font-medium mb-5 transition"
            >
              <Plus className="w-4 h-4" />
              Add Stop
            </button>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {/* Date & Time */}
              <div>
                <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                  Date & Time
                </label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
                        {date ? (
                          <span>
                            {format(date, "PPP")} <span className="text-gray-400 mx-1">|</span> {time}
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
                            initialFocus
                          />
                        </div>
                        <div className="h-[300px] w-[120px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                          <div className="flex flex-col gap-1">
                            {Array.from({ length: 48 }).map((_, i) => {
                              const hour = Math.floor(i / 2);
                              const minute = (i % 2) * 30;
                              const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                              return (
                                <Button
                                  key={timeString}
                                  variant={time === timeString ? "default" : "ghost"}
                                  className={cn(
                                    "justify-center h-8 text-sm",
                                    time === timeString ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50"
                                  )}
                                  onClick={() => setTime(timeString)}
                                >
                                  {timeString}
                                </Button>
                              )
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
                      <Button variant="ghost" className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-sm">
                            {totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-4" align="start">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-base">Adults</h4>
                            <p className="text-xs text-muted-foreground">Age 12+</p>
                          </div>
                          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              disabled={adults <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-4 text-center font-medium">{adults}</span>
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
                            <h4 className="font-semibold text-base">Children</h4>
                            <p className="text-xs text-muted-foreground">Age 0-12</p>
                          </div>
                          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              disabled={children <= 0}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-4 text-center font-medium">{children}</span>
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
                          <h4 className="font-medium mb-3 text-sm">Each passenger is allowed</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <Luggage className="w-4 h-4" />
                              <span className="flex-1">One checked bag</span>
                              <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">29 x 21 x 11 inch</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <Luggage className="w-4 h-4" />
                              <span className="flex-1">One carry-on bag</span>
                              <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">22 x 14 x 9 inch</span>
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
                      <Button variant="ghost" className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700">
                        <div className="flex items-center gap-2">
                          <Luggage className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-sm">
                            {extraBags} Extra Bag{extraBags !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-4" align="start">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-lg mb-1">Need more space?</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            You can add extra sets of bags at no extra cost, but you might need a bigger vehicle.
                          </p>
                        </div>
                        <div className="pt-4">
                          <h4 className="font-semibold text-base mb-1">Extra sets of bags</h4>
                          <p className="text-xs text-muted-foreground mb-4">One checked bag + one carry on</p>
                          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 w-fit">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                              onClick={() => setExtraBags(Math.max(0, extraBags - 1))}
                              disabled={extraBags <= 0}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-4 text-center font-medium">{extraBags}</span>
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


            {tripType === "return" && (
              <div className="mb-5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal p-3 h-auto border-gray-300 hover:border-blue-400 bg-white"
                    >
                      <CalendarIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2" />
                      <span className="text-sm text-gray-700">
                        {returnDate ? (
                          `${format(returnDate, "MM/dd/yyyy")} - ${returnTime}`
                        ) : (
                          "Return"
                        )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date(new Date().setHours(0, 0, 0, 0));
                        if (pickupDate) {
                          return date < pickupDate || date < today;
                        }
                        return date < today;
                      }}
                    />
                    <div className="p-3 border-t">
                      <label className="text-xs font-medium text-gray-700 mb-2 block">
                        Time
                      </label>
                      <input
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <Button
              onClick={handleSearch}
              className="w-full h-10 py-3"
              variant="outline"
            >
              <Search className="w-5 h-5 mr-2" />
              Find a Ride
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg w-full lg:w-[450px] h-[340px] hidden lg:block">
            <MapRoute
              pickup={irishSettlements.find(s => s.name === pickupLocation) ? {
                lat: irishSettlements.find(s => s.name === pickupLocation)!.lat,
                lng: irishSettlements.find(s => s.name === pickupLocation)!.lng,
                name: pickupLocation
              } : undefined}
              dropoff={irishSettlements.find(s => s.name === dropoffLocation) ? {
                lat: irishSettlements.find(s => s.name === dropoffLocation)!.lat,
                lng: irishSettlements.find(s => s.name === dropoffLocation)!.lng,
                name: dropoffLocation
              } : undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
