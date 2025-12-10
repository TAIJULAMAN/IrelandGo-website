"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar as CalendarIcon, Users, Luggage, Plus, Search, Clock, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { irishSettlements } from "@/lib/irish-settlements";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import MapRoute with SSR disabled to prevent "window is not defined" error
const MapRoute = dynamic(() => import("../map-route").then(mod => ({ default: mod.MapRoute })), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: '340px' }}>
            <p className="text-gray-500">Loading map...</p>
        </div>
    )
});

export default function PrivateCarTransferHero() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pickupParam = searchParams.get("pickup") || "";
    const dropoffParam = searchParams.get("dropoff") || "";
    const tripTypeParam = searchParams.get("tripType") || "one-way";
    const pickupDateParam = searchParams.get("pickupDate");
    const pickupTimeParam = searchParams.get("pickupTime") || "09:00";
    const returnDateParam = searchParams.get("returnDate");
    const returnTimeParam = searchParams.get("returnTime") || "09:00";

    const [tripType, setTripType] = useState(tripTypeParam);
    const [pickupLocation, setPickupLocation] = useState(pickupParam);
    const [dropoffLocation, setDropoffLocation] = useState(dropoffParam);
    const [stops, setStops] = useState([]);
    const [showPickupDropdown, setShowPickupDropdown] = useState(false);
    const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
    const [selectedPickupIndex, setSelectedPickupIndex] = useState(-1);
    const [selectedDropoffIndex, setSelectedDropoffIndex] = useState(-1);

    // Date and time state - initialize from URL params
    const [pickupDate, setPickupDate] = useState(pickupDateParam ? new Date(pickupDateParam) : undefined);
    const [pickupTime, setPickupTime] = useState(pickupTimeParam);
    const [returnDate, setReturnDate] = useState(returnDateParam ? new Date(returnDateParam) : undefined);
    const [returnTime, setReturnTime] = useState(returnTimeParam);

    const pickupInputRef = useRef(null);
    const dropoffInputRef = useRef(null);
    const pickupDropdownRef = useRef(null);
    const dropoffDropdownRef = useRef(null);

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
    const removeStop = (index) => {
        setStops(stops.filter((_, i) => i !== index));
    };

    // Update stop value
    const updateStop = (index, value) => {
        const newStops = [...stops];
        newStops[index] = value;
        setStops(newStops);
    };

    // Handle search submission
    const handleSearch = () => {
        if (pickupLocation.trim() && dropoffLocation.trim()) {
            router.push(`/transfer/private-car-transfer?pickup=${encodeURIComponent(pickupLocation)}&dropoff=${encodeURIComponent(dropoffLocation)}`);
        }
    };

    // Handle keyboard navigation for pickup
    const handlePickupKeyDown = (e) => {
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
    const handleDropoffKeyDown = (e) => {
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
        const handleClickOutside = (event) => {
            if (
                pickupDropdownRef.current &&
                !pickupDropdownRef.current.contains(event.target) &&
                pickupInputRef.current &&
                !pickupInputRef.current.contains(event.target)
            ) {
                setShowPickupDropdown(false);
            }
            if (
                dropoffDropdownRef.current &&
                !dropoffDropdownRef.current.contains(event.target) &&
                dropoffInputRef.current &&
                !dropoffInputRef.current.contains(event.target)
            ) {
                setShowDropoffDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Get display location for hero title
    const displayLocation = pickupLocation || "Dublin";

    return (
        <section className="relative overflow-hidden min-h-[800px] text-white">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/plane.png"
                    alt="Runway at sunset"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
            </div>

            <Header />

            <div className="container mx-auto px-5 md:px-0 py-10 md:py-16 relative z-10">
                {/* Hero Text */}
                <div className="text-center mb-10 pt-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
                        Private car transfer from {""}
                        {displayLocation}
                        <br className="hidden sm:block" />
                        to {""}
                        {dropoffLocation}
                    </h1>
                    <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
                        Seamless city-to-city and airport transfers across {displayLocation} and beyond.
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
                                    <MapPin className="w-5 h-5 text-green-500 flex-shrink-0" />
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
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium mb-5 transition"
                        >
                            <Plus className="w-4 h-4" />
                            Add Stop
                        </button>

                        {/* Date, Time, Passengers, Luggage */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-5">
                            <div className="col-span-1">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal p-3 h-auto border-gray-300 bg-white"
                                        >
                                            <CalendarIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2" />
                                            <span className="text-xs text-gray-700">
                                                {pickupDate ? (
                                                    `${format(pickupDate, "MM/dd/yyyy")} - ${pickupTime}`
                                                ) : (
                                                    "Select date & time"
                                                )}
                                            </span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={pickupDate}
                                            onSelect={setPickupDate}
                                            initialFocus
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                        <div className="p-3 border-t">
                                            <label className="text-xs font-medium text-gray-700 mb-2 block">
                                                Time
                                            </label>
                                            <input
                                                type="time"
                                                value={pickupTime}
                                                onChange={(e) => setPickupTime(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                            />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="col-span-1">
                                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                                    <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <select className="w-full outline-none text-xs bg-white text-gray-700">
                                        <option>1 Passenger</option>
                                        <option>2 Passengers</option>
                                        <option>3+ Passengers</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                                    <Luggage className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <select className="w-full outline-none text-sm bg-white text-gray-700">
                                        <option>1 Luggage</option>
                                        <option>2 Luggage</option>
                                        <option>3+ Luggage</option>
                                    </select>
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
                                                    "Select return date & time"
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

                        <Link href="/booking-flow/step-2">
                            <Button
                                // onClick={handleSearch}
                                className="w-full h-10 py-3"
                                variant="outline"
                            >
                                <Search className="w-5 h-5 mr-2" />
                                Find a Ride
                            </Button>
                        </Link>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg w-full lg:w-[450px] h-[340px] hidden lg:block">
                        <MapRoute
                            pickup={irishSettlements.find(s => s.name === pickupLocation) ? {
                                lat: irishSettlements.find(s => s.name === pickupLocation).lat,
                                lng: irishSettlements.find(s => s.name === pickupLocation).lng,
                                name: pickupLocation
                            } : undefined}
                            dropoff={irishSettlements.find(s => s.name === dropoffLocation) ? {
                                lat: irishSettlements.find(s => s.name === dropoffLocation).lat,
                                lng: irishSettlements.find(s => s.name === dropoffLocation).lng,
                                name: dropoffLocation
                            } : undefined}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
