"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Search
} from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { isTimeDisabled, isReturnTimeDisabled as checkReturnTimeDisabled } from "@/utils/timeValidation";
import { validateHeroForm } from "@/utils/validateHeroForm";
import { TripTypeSelector } from "./trip-type-selector";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FeatureBadges } from "../common/feature-badges";
import { HeroTabs } from "../common/hero-tabs";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import usePlacesAutocomplete from "use-places-autocomplete";
import { LocationInputs } from "./location-inputs";
import { BookingDetailsInputs } from "./booking-details-inputs";

const MapRoute = dynamic(
  () => import("./map-route").then((mod) => ({ default: mod.MapRoute })),
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

export function Hero() {
  const { isLoaded } = useGoogleMaps();

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
      }
    },
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

  const isReturnTimeDisabled = (returnTimeStr: string) =>
    checkReturnTimeDisabled(returnTimeStr, returnDate, date, time);

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
    returnDate
  });

  return (
    <section className="relative w-full pt-24 md:pt-28 lg:pt-36 pb-20">
      <div className="absolute top-0 left-0 w-full h-[57vh] z-0">
        <Image
          src="/Images/Home.webp"
          alt="Irish landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/10" />
      </div>
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-8 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 text-balance leading-tight px-4 drop-shadow-sm">
            Comfortable car transfers in Ireland
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-4 px-4 font-medium drop-shadow-md">
            Book private transfers and day tours with professional drivers.
          </p>
        </div>
        <HeroTabs
          activeTab={activeTab}
          onTabChange={handleTabClick}
          className="flex justify-start md:justify-center mb-4 overflow-x-auto scrollbar-hide scroll-smooth w-full pb-2 -mx-4 px-4 md:mx-0 md:px-0"
        />
        <div>
          {/* Booking Form */}
          <div className="flex flex-col lg:flex-row gap-5 max-w-7xl 2xl:max-w-8xl mx-auto bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl p-4 md:p-5 border border-white/40">
            <div className="w-full ">
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
                extraBags={extraBags}
                setExtraBags={setExtraBags}
              />

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
                            "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700 text-xs sm:text-sm",
                            !returnDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-1.5 sm:mr-2 h-4 w-4 text-blue-600 flex-shrink-0" />
                          {returnDate ? (
                            <span className="truncate">
                              <span className="inline md:hidden lg:inline xl:hidden 2xl:inline">
                                {format(returnDate, "PPP")}
                              </span>
                              <span className="hidden md:inline lg:hidden xl:inline 2xl:hidden">
                                {format(returnDate, "PP")}
                              </span>{" "}
                              <span className="text-gray-400 mx-0.5 sm:mx-1">|</span> {returnTime}
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
                              {(() => {
                                const availableTimes = Array.from({ length: 96 })
                                  .map((_, i) => {
                                    const hour = Math.floor(i / 4);
                                    const minute = (i % 4) * 15;
                                    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                                  })
                                  .filter((timeString) => !isReturnTimeDisabled(timeString));

                                if (availableTimes.length === 0) {
                                  return (
                                    <div className="text-center p-4 text-sm text-gray-500">
                                      No times available
                                    </div>
                                  );
                                }

                                return availableTimes.map((timeString) => (
                                  <Button
                                    key={timeString}
                                    variant={returnTime === timeString ? "default" : "ghost"}
                                    className={cn(
                                      "justify-center h-8 text-sm",
                                      returnTime === timeString
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "hover:bg-blue-50 text-gray-700"
                                    )}
                                    onClick={() => {
                                      setReturnTime(timeString);
                                      setIsReturnCalendarOpen(false);
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
              )}
              {isFormValid ? (
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
                  className="w-full mt-2 block"
                >
                  <Button className="w-full h-12 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg border-0 rounded-lg">
                    <Search className="w-5 h-5 mr-2" />
                    {activeTab === "day-trips" ? "Explore Day Trips" : "Find a Ride"}
                  </Button>
                </Link>
              ) : (
                <div className="w-full mt-2">
                  <Button className="w-full h-12 py-3 bg-gray-100 text-gray-400 font-semibold text-lg border-0 rounded-lg cursor-not-allowed transition-all duration-300" variant="outline" disabled>
                    <Search className="w-5 h-5 mr-2" />
                    {activeTab === "day-trips" ? "Explore Day Trips" : "Find a Ride"}
                  </Button>
                </div>
              )}
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-100 lg:w-[320px] xl:w-[450px] 2xl:w-[500px] hidden lg:block shrink-0 relative min-h-[280px] shadow-inner">
              <div className="absolute inset-0">
                <MapRoute
                  pickup={pickupLocation ? { name: pickupLocation } : undefined}
                  dropoff={activeTab === "transfer" && dropoffLocation ? { name: dropoffLocation } : undefined}
                />
              </div>
            </div>
          </div>
          <FeatureBadges />
        </div>
      </div>
    </section>
  );
}
