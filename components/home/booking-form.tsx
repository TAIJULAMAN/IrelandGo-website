"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  isTimeDisabled,
  isReturnTimeDisabled as checkReturnTimeDisabled,
} from "@/utils/timeValidation";
import { validateHeroForm } from "@/utils/validateHeroForm";
import { TripTypeSelector } from "./trip-type-selector";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import usePlacesAutocomplete from "use-places-autocomplete";
import { LocationInputs } from "./location-inputs";
import { BookingDetailsInputs } from "./booking-details-inputs";

const MapRoute = dynamic(
  () => import("./map-route").then((mod) => ({ default: mod.MapRoute })),
  { ssr: false },
);

interface BookingFormProps {
  activeTab: string;
}

export function BookingForm({ activeTab }: BookingFormProps) {
  const { isLoaded } = useGoogleMaps();
  const router = useRouter();

  const [tripType, setTripType] = useState("one-way");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [selectedPickup, setSelectedPickup] = useState("");
  const [selectedDropoff, setSelectedDropoff] = useState("");
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

  // Northern Ireland limits check
  const isOutOfRange = (desc: string) => {
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

  const {
    suggestions: { status: pStatus, data: pData },
    setValue: setPValue,
    clearSuggestions: clearPSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: isLoaded,
    requestOptions: {
      componentRestrictions: { country: ["ie", "gb"] },
      locationRestriction: {
        north: 55.5,
        south: 51.3,
        east: -5.3,
        west: -10.8,
      },
    },
    debounce: 300,
  });

  const {
    suggestions: { status: dStatus, data: dData },
    setValue: setDValue,
    clearSuggestions: clearDSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: isLoaded,
    requestOptions: {
      componentRestrictions: { country: ["ie", "gb"] },
      locationRestriction: {
        north: 55.5,
        south: 51.3,
        east: -5.3,
        west: -10.8,
      },
    },
    debounce: 300,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) {
        setShowPickupDropdown(false);
      }
      if (
        dropoffRef.current &&
        !dropoffRef.current.contains(e.target as Node)
      ) {
        setShowDropoffDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePickupSelect = (description: string) => {
    setPickupLocation(description);
    setSelectedPickup(description);
    setPValue(description, false);
    clearPSuggestions();
    setShowPickupDropdown(false);
  };

  const handleDropoffSelect = (description: string) => {
    setDropoffLocation(description);
    setSelectedDropoff(description);
    setDValue(description, false);
    clearDSuggestions();
    setShowDropoffDropdown(false);
  };

  const totalPassengers = adults + children;

  // Set default return date/time logic when pickup date/time changes
  useEffect(() => {
    if (date) {
      const defaultReturn = new Date(date);
      defaultReturn.setHours(defaultReturn.getHours() + 2);

      // If return date is not set, or is before the new pickup date, adjust it
      if (!returnDate || returnDate < date) {
        setReturnDate(date);
      }

      // Automatically adjust return time if it has run into conflict
      const isReturnTimeDisabled = (timeString: string) => {
        if (!returnDate) return false;
        const pickupDateStr = date.toDateString();
        const returnDateStr = returnDate.toDateString();

        if (pickupDateStr === returnDateStr) {
          const [pHour, pMinute] = time.split(":").map(Number);
          const [rHour, rMinute] = timeString.split(":").map(Number);
          const pTotalMinutes = pHour * 60 + pMinute;
          const rTotalMinutes = rHour * 60 + rMinute;
          return rTotalMinutes < pTotalMinutes + 180; // Must be at least 3 hours later
        }
        return false;
      };

      if (isReturnTimeDisabled(returnTime)) {
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
    }
  }, [returnDate, date, time]);

  const isReturnTimeDisabled = (returnTimeStr: string) => {
    if (!date || !returnDate) return false;
    const pickupDateStr = date.toDateString();
    const returnDateStr = returnDate.toDateString();

    if (pickupDateStr === returnDateStr) {
      const [pHour, pMinute] = time.split(":").map(Number);
      const [rHour, rMinute] = returnTimeStr.split(":").map(Number);
      const pTotalMinutes = pHour * 60 + pMinute;
      const rTotalMinutes = rHour * 60 + rMinute;
      return rTotalMinutes < pTotalMinutes + 180;
    }
    return false;
  };

  const isFormValid = validateHeroForm({
    date,
    time,
    isTimeDisabled,
    activeTab,
    tripType,
    returnTime,
    isReturnTimeDisabled,
    pickupLocation,
    dropoffLocation,
    selectedPickup,
    selectedDropoff,
    returnDate,
  });

  return (
    <div className="flex flex-col lg:flex-row gap-5 max-w-7xl 2xl:max-w-8xl mx-auto bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl p-4 md:p-5 border border-white/40">
      <div className="w-full">
        <TripTypeSelector
          activeTab={activeTab}
          tripType={tripType}
          setTripType={setTripType}
          duration={duration}
          setDuration={setDuration}
        />
        <LocationInputs
          activeTab={activeTab}
          pickupRef={pickupRef}
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          setPValue={setPValue}
          showPickupDropdown={showPickupDropdown}
          setShowPickupDropdown={setShowPickupDropdown}
          pStatus={pStatus}
          pData={pData}
          isOutOfRange={isOutOfRange}
          handlePickupSelect={handlePickupSelect}
          dropoffRef={dropoffRef}
          dropoffLocation={dropoffLocation}
          setDropoffLocation={setDropoffLocation}
          setDValue={setDValue}
          showDropoffDropdown={showDropoffDropdown}
          setShowDropoffDropdown={setShowDropoffDropdown}
          dStatus={dStatus}
          dData={dData}
          handleDropoffSelect={handleDropoffSelect}
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
          activeTab={activeTab}
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
              href={{
                pathname:
                  activeTab === "day-trips"
                    ? "/day-trips"
                    : "/booking/choose-vehicle",
                query: {
                  serviceType:
                    activeTab === "transfer"
                      ? "TRANSFER"
                      : activeTab === "hourly"
                        ? "BY_THE_HOUR"
                        : "DAY_TRIP",
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
              className="w-full block"
            >
              <Button className="w-full h-12 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg border-0 rounded-lg">
                <Search className="w-5 h-5 mr-2" />
                {activeTab === "day-trips"
                  ? "Explore Day Trips"
                  : "Find a Ride"}
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full h-12 py-3 bg-gray-100 text-gray-400 font-semibold text-lg border-0 rounded-lg cursor-not-allowed transition-all duration-300"
              disabled
            >
              <Search className="w-5 h-5 mr-2" />
              {activeTab === "day-trips" ? "Explore Day Trips" : "Find a Ride"}
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-lg overflow-hidden border border-gray-100 lg:w-[320px] xl:w-[450px] 2xl:w-[500px] hidden lg:block shrink-0 relative min-h-[280px] shadow-inner">
        <div className="absolute inset-0">
          <MapRoute
            pickup={pickupLocation ? { name: pickupLocation } : undefined}
            dropoff={
              activeTab === "transfer" && dropoffLocation
                ? { name: dropoffLocation }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
