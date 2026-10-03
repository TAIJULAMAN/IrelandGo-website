"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { isTimeDisabled } from "@/utils/timeValidation";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import usePlacesAutocomplete from "use-places-autocomplete";
import { slugifyText } from "@/utils/bookingSession";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { HeroPickupLocation } from "./hero-pickup-location";
import { HeroPassengers } from "./hero-passengers";
import { HeroDateTime } from "./hero-datetime";
import { HeroDuration } from "./hero-duration";
import { HeroLuggage } from "./hero-luggage";

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
    "belfast",
    "ballymena",
    "ballymoney",
    "banbridge",
    "bangor",
    "carrickfergus",
    "castlereagh",
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

export function HeroSearchForm() {
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
  const [isDurationOpen, setIsDurationOpen] = useState(false);

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
      },
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  }, [date, time]);

  const isFormValid =
    pickupLocation.trim() !== "" &&
    date !== undefined &&
    time !== "" &&
    !isTimeDisabled(date, time);

  const departureTooltip = date
    ? `${format(date, "PPP")} | ${time}`
    : "Select pickup date & time";
  const durationTooltip = `${duration.replace("-", " ")} total hire duration`;
  const passengersTooltip = `${adults} Adult${adults !== 1 ? "s" : ""}${children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}`;
  const luggageTooltip = `${extraBags} Extra Set${extraBags !== 1 ? "s" : ""} of Bags (One checked + one carry-on per set)`;

  return (
    <div className="max-w-6xl mx-auto mb-4 relative z-30 w-full text-left">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 p-4 sm:p-6 transform transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 relative z-30">
          <HeroPickupLocation
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            setValue={setValue}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            status={status}
            data={data}
            isOutOfRange={isOutOfRange}
            inputRef={inputRef}
            dropdownRef={dropdownRef}
            handleKeyDown={handleKeyDown}
            handleSelect={handleSelect}
          />
          <HeroPassengers
            totalPassengers={totalPassengers}
            passengersTooltip={passengersTooltip}
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 relative z-10">
          <HeroDateTime
            isCalendarOpen={isCalendarOpen}
            setIsCalendarOpen={setIsCalendarOpen}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            departureTooltip={departureTooltip}
            isTimeDisabled={isTimeDisabled}
            today={today}
          />
          <HeroDuration
            isDurationOpen={isDurationOpen}
            setIsDurationOpen={setIsDurationOpen}
            duration={duration}
            setDuration={setDuration}
            durationTooltip={durationTooltip}
          />
          <HeroLuggage
            extraBags={extraBags}
            setExtraBags={setExtraBags}
            luggageTooltip={luggageTooltip}
          />
        </div>

        <div className="w-full mt-2">
          {isFormValid ? (
            <Link
              href={{
                pathname: `/booking/by-the-hour/${slugifyText(pickupLocation || "dublin")}/vehicles`,
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
              className="w-full block"
            >
              <Button className="w-full">
                <Search className="w-5 h-5 mr-2" />
                Search Available Rides
              </Button>
            </Link>
          ) : (
            <Button className="w-full" disabled>
              <Search className="w-5 h-5 mr-2" />
              Search Available Rides
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
