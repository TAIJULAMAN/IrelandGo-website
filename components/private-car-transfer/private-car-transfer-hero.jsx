"use client";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Luggage,
  Plus,
  Search,
  Zap,
  PiggyBank,
  Sparkles,
  ChevronDown,
  Minus,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { slugifyText } from "@/utils/bookingSession";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { validateHeroForm } from "@/utils/validateHeroForm";
import { TripTypeSelector } from "../home/trip-type-selector";
import { LocationInputs } from "../home/location-inputs";
import { BookingDetailsInputs } from "../home/booking-details-inputs";

const MapRoute = dynamic(
  () => import("../home/map-route").then((mod) => ({ default: mod.MapRoute })),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ minHeight: "340px" }}
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
  },
);

export default function PrivateCarTransferHero({
  initialPickup = "",
  initialDropoff = "",
  customH1 = "",
  customSubtitle = "",
} = {}) {
  const searchParams = useSearchParams();
  const pickupParam = initialPickup || searchParams.get("pickup") || "";
  const dropoffParam = initialDropoff || searchParams.get("dropoff") || "";
  const tripTypeParam = searchParams.get("tripType") || "one-way";
  const pickupDateParam = searchParams.get("pickupDate");
  const pickupTimeParam = searchParams.get("pickupTime") || "09:00";

  const [tripType, setTripType] = useState(tripTypeParam);

  const transferRouteParam = searchParams.get("transferRoute");
  let transferRoute = null;
  try {
    if (transferRouteParam) {
      transferRoute = JSON.parse(transferRouteParam);
    }
  } catch (e) {
    console.error("Failed to parse transfer route", e);
  }

  const [pickupLocation, setPickupLocation] = useState(
    pickupParam || transferRoute?.from || "",
  );
  const [dropoffLocation, setDropoffLocation] = useState(
    dropoffParam || transferRoute?.to || "",
  );
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [selectedPickupIndex, setSelectedPickupIndex] = useState(-1);
  const [selectedDropoffIndex, setSelectedDropoffIndex] = useState(-1);




  const [oneWayStops, setOneWayStops] = useState([]);
  const [returnStops, setReturnStops] = useState([]);
  const [date, setDate] = useState(
    pickupDateParam ? new Date(pickupDateParam) : new Date(),
  );
  const [time, setTime] = useState(pickupTimeParam || "09:00");
  const [returnDate, setReturnDate] = useState(undefined);
  const [returnTime, setReturnTime] = useState("09:00");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [extraBags, setExtraBags] = useState(0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isReturnCalendarOpen, setIsReturnCalendarOpen] = useState(false);

  const totalPassengers = adults + children;

  const removeStop = (index) => {
    if (tripType === "one-way") {
      setOneWayStops(oneWayStops.filter((_, i) => i !== index));
    } else {
      setReturnStops(returnStops.filter((_, i) => i !== index));
    }
  };

  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);
  const pickupDropdownRef = useRef(null);
  const dropoffDropdownRef = useRef(null);

  const { isLoaded } = useGoogleMaps();

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
  // Northern Ireland limits check
  const isOutOfRange = (desc) => {
    const lower = desc.toLowerCase();
    if (lower.includes("ireland")) return false;
    const niTownsAndCounties = [
      "antrim",
      "armagh",
      "down",
      "fermanagh",
      "londonderry",
      "derry",
      "tyrone",
      "aughnacloy",
      "ballycastle",
      "ballyclare",
      "ballymena",
      "ballymoney",
      "ballynahinch",
      "banbridge",
      "bangor",
      "belfast",
      "bushmills",
      "caledon",
      "carrickfergus",
      "castlederg",
      "castlewellan",
      "clogher",
      "coleraine",
      "cookstown",
      "craigavon",
      "crumlin",
      "donaghadee",
      "downpatrick",
      "dromore",
      "dungannon",
      "enniskillen",
      "fivemiletown",
      "hillsborough",
      "holywood",
      "larne",
      "limavady",
      "lisburn",
      "maghera",
      "magherafelt",
      "newcastle",
      "newry",
      "newtownabbey",
      "newtownards",
      "omagh",
      "portrush",
      "portstewart",
      "strabane",
    ];
    if (niTownsAndCounties.some((town) => lower.includes(town))) return false;
    if (lower.includes("uk") || lower.includes("united kingdom")) return true;
    return false;
  };

  const handlePickupKeyDown = (e) => {
    const totalItems = pickupData.length;
    if (!showPickupDropdown || totalItems === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedPickupIndex((prev) =>
          prev < filteredPickupSettlements.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedPickupIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedPickupIndex >= 0) {
          const selected = pickupData[selectedPickupIndex];
          setPickupLocation(selected.description);
          setPickupValue(selected.description, false);
          clearPickupSuggestions();
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
    const totalItems = dropoffData.length;
    if (!showDropoffDropdown || totalItems === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedDropoffIndex((prev) =>
          prev < filteredDropoffSettlements.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedDropoffIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedDropoffIndex >= 0) {
          const selected = dropoffData[selectedDropoffIndex];
          setDropoffLocation(selected.description);
          setDropoffValue(selected.description, false);
          clearDropoffSuggestions();
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

  const isTimeDisabled = (selectedDate, timeStr) => {
    if (!selectedDate) return false;
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    if (!isToday) return false;

    const [hours, minutes] = timeStr.split(":").map(Number);
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hours, minutes, 0, 0);

    const minDateTime = new Date();
    minDateTime.setHours(minDateTime.getHours() + 3);

    return selectedDateTime.getTime() < minDateTime.getTime();
  };

  const isReturnTimeDisabled = (returnTimeStr) => {
    if (!returnDate || !date) return false;
    const isSameDay = returnDate.toDateString() === date.toDateString();
    if (!isSameDay) return false;

    const [pValHour, pValMin] = time.split(":").map(Number);
    const [rValHour, rValMin] = returnTimeStr.split(":").map(Number);

    return (rValHour < pValHour) || (rValHour === pValHour && rValMin <= pValMin);
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

  useEffect(() => {
    if (returnDate && isReturnTimeDisabled(returnTime)) {
      for (let i = 0; i < 96; i++) {
        const hour = Math.floor(i / 4);
        const minute = (i % 4) * 15;
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        if (!isReturnTimeDisabled(timeString)) {
          setReturnTime(timeString);
          break;
        }
      }
    }
  }, [returnDate, date, time]);

  const isFormValid =
    pickupLocation.trim() !== "" &&
    dropoffLocation.trim() !== "" &&
    date !== undefined &&
    time !== "" &&
    !isTimeDisabled(date, time) &&
    (tripType === "return" ? returnDate !== undefined && returnTime !== "" && !isReturnTimeDisabled(returnTime) : true);

  // Get display location for hero title
  const displayLocation = pickupLocation || "Dublin";

  return (
    <>
      <Header />
      <section className="relative overflow-hidden pt-10 md:pt-36 min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={transferRoute?.images?.[0] || "/by-the-hour.jpg"}
            alt="Transfer Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/40" />

        </div>



        <div className="max-w-7xl mx-auto px-5 py-16 relative z-10">
          {/* Hero Text */}
          <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto mb-10 pt-5 text-center">
            <h1 className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight drop-shadow-2xl text-white">
              {customH1 ? (
                customH1
              ) : (
                <>
                  Private car transfer from {""}
                  {displayLocation}
                  {dropoffLocation ? (
                    <>
                      <br className="hidden sm:block" />
                      to {""}
                      {dropoffLocation}
                    </>
                  ) : ""}
                </>
              )}
            </h1>
            <p className="text-sm md:text-base text-white px-4 font-medium drop-shadow-md leading-relaxed">
              {customSubtitle || `Seamless city-to-city and airport transfers across ${displayLocation} and beyond.`}
            </p>
          </div>

          {/* Booking Card */}
          <div className="flex flex-col lg:flex-row gap-5 max-w-7xl 2xl:max-w-8xl mx-auto bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl p-4 md:p-5 border border-white/40">
            <div className="w-full">
              <TripTypeSelector
                activeTab="transfer"
                tripType={tripType}
                setTripType={setTripType}
                duration={2}
                setDuration={() => { }}
              />
              <LocationInputs
                activeTab="transfer"
                pickupRef={pickupInputRef}
                pickupLocation={pickupLocation}
                setPickupLocation={setPickupLocation}
                setPValue={setPickupValue}
                showPickupDropdown={showPickupDropdown}
                setShowPickupDropdown={setShowPickupDropdown}
                pStatus={pickupStatus}
                pData={pickupData}
                isOutOfRange={isOutOfRange}
                handlePickupSelect={(desc) => {
                  setPickupLocation(desc);
                  setPickupValue(desc, false);
                  clearPickupSuggestions();
                  setShowPickupDropdown(false);
                }}
                dropoffRef={dropoffInputRef}
                dropoffLocation={dropoffLocation}
                setDropoffLocation={setDropoffLocation}
                setDValue={setDropoffValue}
                showDropoffDropdown={showDropoffDropdown}
                setShowDropoffDropdown={setShowDropoffDropdown}
                dStatus={dropoffStatus}
                dData={dropoffData}
                handleDropoffSelect={(desc) => {
                  setDropoffLocation(desc);
                  setDropoffValue(desc, false);
                  clearDropoffSuggestions();
                  setShowDropoffDropdown(false);
                }}
                extraBags={extraBags}
                setExtraBags={setExtraBags}
              />
              <BookingDetailsInputs
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                isCalendarOpen={isCalendarOpen}
                setIsCalendarOpen={setIsCalendarOpen}
                today={today}
                isTimeDisabled={isTimeDisabled}
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                totalPassengers={totalPassengers}
                tripType={tripType}
                activeTab="transfer"
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                returnTime={returnTime}
                setReturnTime={setReturnTime}
                isReturnCalendarOpen={isReturnCalendarOpen}
                setIsReturnCalendarOpen={setIsReturnCalendarOpen}
                isReturnTimeDisabled={isReturnTimeDisabled}
              />

              <div className="w-full mt-2">
                {isFormValid ? (
                  <Link
                    href={`/booking/transfers/${slugifyText(pickupLocation || "dublin")}-to-${slugifyText(dropoffLocation || "galway")}/vehicles?serviceType=PRIVATE_TRANSFER&pickup=${encodeURIComponent(pickupLocation)}&dropoff=${encodeURIComponent(dropoffLocation)}&adults=${adults}&children=${children}&extraBags=${extraBags}&date=${date ? date.toISOString() : ""}&time=${time}&returnDate=${returnDate ? returnDate.toISOString() : ""}&returnTime=${returnTime}&tripType=${tripType}&transferRoute=${encodeURIComponent(transferRouteParam || "")}`}
                    className="w-full block"
                  >
                    <Button className="w-full">
                      <Search className="w-5 h-5 mr-2" />
                      Find a Ride
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full"
                    disabled
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Find a Ride
                  </Button>
                )}
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-100 lg:w-[320px] xl:w-[450px] 2xl:w-[500px] hidden lg:block shrink-0 relative min-h-[280px] shadow-inner">
              <div className="absolute inset-0">
                <MapRoute
                  pickup={pickupLocation ? { name: pickupLocation } : undefined}
                  dropoff={dropoffLocation ? { name: dropoffLocation } : undefined}
                />
              </div>
            </div>
          </div>

          {/* Selling Points Bar */}
          <div className="mt-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-around gap-2 text-white shadow-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-white fill-white" />
              <span className="font-medium text-sm sm:text-base">
                Door-to-door transfers.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-white fill-white" />
              <span className="font-medium text-sm sm:text-base">
                Optional Sightseeing.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white fill-white" />
              <span className="font-medium text-sm sm:text-base">
                Premium Vehicles.
              </span>
            </div>
          </div>
        </div>
      </section>

    </>

  );
}
