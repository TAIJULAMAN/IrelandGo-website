"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  MapPin,
  Calendar as CalendarIcon,
  ArrowRight,
  Minus,
  Plus,
  Car,
  Users,
  Camera,
  Check,
  X,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimePickerContent } from "@/components/common/date-time-picker-content";
import { cn } from "@/lib/utils";
import { slugifyText, saveBookingSession } from "@/utils/bookingSession";
import dynamic from "next/dynamic";
import { DayTripAtAGlance } from "./day-trip-at-a-glance";

const DayTripMap = dynamic(
  () =>
    import("./day-trip-map").then((mod) => ({
      default: mod.DayTripMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        suppressHydrationWarning
        className="bg-white rounded-2xl p-3 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-200/90 animate-pulse"
      >
        <div className="w-full h-[250px] sm:h-[280px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs font-medium">
          Loading route map...
        </div>
      </div>
    ),
  },
);

function SteeringWheelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="2" x2="12" y2="9" />
      <line x1="4.5" y1="16.5" x2="9.5" y2="13.5" />
      <line x1="19.5" y1="16.5" x2="14.5" y2="13.5" />
    </svg>
  );
}

export default function DayTripItinerary({ trip }: { trip: any }) {
  const pickupLocation = trip?.from || "Dublin";
  const dropoffLocation = trip?.from || "Dublin";
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [extraBags, setExtraBags] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [time, setTime] = useState("09:00");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const pSlug = slugifyText(pickupLocation || "dublin");
  const dSlug = slugifyText(trip?.to || "cliffs-of-moher");
  const originCity = trip?.from || pickupLocation || "your location";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isTimeDisabled = (selectedDate: Date | undefined, timeStr: string) => {
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

  const isFormValid =
    date !== undefined &&
    time !== "" &&
    !isTimeDisabled(date, time);

  // Price display
  const minVehiclePrice = trip?.vehicles?.length
    ? Math.min(...trip.vehicles.map((v: any) => v.price))
    : trip?.price || null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current || !cardRef.current) return;
        if (window.innerWidth < 768) {
          setTranslateY(0);
          return;
        }

        const sectionRect = sectionRef.current.getBoundingClientRect();
        const cardHeight = cardRef.current.offsetHeight;
        const maxTranslateY = Math.max(0, sectionRect.height - cardHeight);

        // Responsive target top: sticks at 100px from top if space allows, or keeps the map bottom in view
        const targetTop =
          window.innerHeight >= cardHeight + 120
            ? 100
            : Math.max(window.innerHeight - cardHeight - 24, 20);
        const currentOffset = targetTop - sectionRect.top;

        if (currentOffset <= 0) {
          setTranslateY(0);
        } else if (currentOffset >= maxTranslateY) {
          setTranslateY(maxTranslateY);
        } else {
          setTranslateY(currentOffset);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [trip?.description]);

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start relative"
        >
          <div className="md:col-span-7 xl:col-span-8 space-y-10 sm:space-y-12 min-w-0">
            {/* About your trip (if description is available) */}
            {trip?.description && (
              <div className="min-w-0 overflow-hidden font-sans">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                  About your trip
                </h2>
                <div
                  className="font-sans text-gray-700 leading-relaxed text-sm sm:text-base space-y-4 break-words [overflow-wrap:anywhere] max-w-full overflow-hidden [&_*]:!font-sans [&_*]:[font-family:var(--font-sans),sans-serif!important] [&_h1]:text-xl sm:[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-lg sm:[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-3 [&_p]:leading-relaxed [&_p]:break-words [&_p]:[overflow-wrap:anywhere] [&_*]:break-words [&_*]:[overflow-wrap:anywhere] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-gray-600 [&_strong]:text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html:
                      typeof trip.description === "string"
                        ? trip.description
                            .replace(/font-family\s*:\s*[^;"]+;?/gi, "")
                            .replace(/face\s*=\s*["'][^"']*["']/gi, "")
                        : trip.description,
                  }}
                />
              </div>
            )}

            {/* 1. Quick Highlights Bar */}
            <div className="border-y border-gray-200 py-5 sm:py-6">
              <ul className="space-y-3.5 sm:space-y-4">
                <li className="flex items-center gap-3.5 text-gray-900 font-semibold text-base sm:text-[17px]">
                  <Car className="w-5 h-5 text-gray-900 shrink-0" />
                  <span>
                    Exclusively yours: private vehicle and professional driver
                  </span>
                </li>
                <li className="flex items-center gap-3.5 text-gray-900 font-semibold text-base sm:text-[17px]">
                  <SteeringWheelIcon className="w-5 h-5 text-gray-900 shrink-0" />
                  <span>
                    Discover local insights you won’t find in guidebooks
                  </span>
                </li>
                <li className="flex items-center gap-3.5 text-gray-900 font-semibold text-base sm:text-[17px]">
                  <CalendarIcon className="w-5 h-5 text-gray-900 shrink-0" />
                  <span>
                    Experience the freedom to explore at your own speed
                  </span>
                </li>
                <li className="flex items-center gap-3.5 text-gray-900 font-semibold text-base sm:text-[17px]">
                  <Users className="w-5 h-5 text-gray-900 shrink-0" />
                  <span>
                    Perfectly planned for families, friends, or solo travelers
                  </span>
                </li>
              </ul>
            </div>

            {/* 2. What to expect */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
                What to expect
              </h2>
              <div className="space-y-6 sm:space-y-7">
                <div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-900 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      Your day trip begins wherever you are
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2 pl-8">
                    Meet our professional driver right where you prefer in{" "}
                    {originCity} whenever suits you best. No time wasted getting
                    to the pickup point, grab your bag and start your trip right
                    away.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <SteeringWheelIcon className="w-5 h-5 text-gray-900 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      Discover more with local expertise
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2 pl-8">
                    Your driver’s local insights will set the tone for your day
                    trip. A hidden café here, a must-try restaurant there;
                    insider tips you’ll love sharing later. This isn’t a guided
                    tour but your ride will be rich with stories and discoveries
                    along the way. And throughout the day, your driver will be
                    available for you as needed, ready to assist, happy to help,
                    making your trip stress-free.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-gray-900 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      Explore at your own pace
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2 pl-8">
                    The journey begins with your personalized pickup in{" "}
                    {originCity}. Your driver will take you to your stops,
                    helping you make the most of your time by pointing out the
                    attractions that best match your interests and pace. You’ll
                    spend your time exactly how you want, creating an
                    unforgettable day that’s uniquely yours.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-900 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      Perfect for any private group
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2 pl-8">
                    Whether you’re traveling solo, as a family with kids, or as
                    a large group, this service is tailored for your comfort and
                    flexibility. It’s the ideal option especially if you have
                    limited time or a busy schedule.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Good to know */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-5">
                Good to know
              </h2>
              <ul className="space-y-3 sm:space-y-3.5">
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Two-way private car transfer</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Air-conditioned vehicle</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Personalized pickup and drop-off</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Child seats included free of charge</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Professional English-speaking driver</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Complimentary bottled water</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Free cancellation 24 hours before departure</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug pt-1">
                  <X className="w-5 h-5 text-gray-400 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>
                    Entry/Admission tickets to paid attractions should be
                    purchased separately unless specified otherwise
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <X className="w-5 h-5 text-gray-400 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Meals, snacks, and gratuity are not included</span>
                </li>
              </ul>
            </div>

            {/* Your Trip at a Glance */}
            <div className="min-w-0 pt-2">
              <DayTripAtAGlance
                trip={trip}
                pickupLocation={pickupLocation}
                dropoffLocation={dropoffLocation}
              />
            </div>
          </div>

          {/* Right Column: Floating Booking Form & Route Map */}
          <div className="md:col-span-5 xl:col-span-4 z-20 pb-8 self-start w-full">
            <div
              ref={cardRef}
              suppressHydrationWarning
              style={{
                transform:
                  translateY > 0
                    ? `translate3d(0, ${translateY}px, 0)`
                    : undefined,
                willChange: translateY > 0 ? "transform" : undefined,
                transition: "transform 0.05s ease-out",
              }}
              className="space-y-5"
            >
              {/* 1. Book This Day Trip Card */}
              <div
                suppressHydrationWarning
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-200/90 hover:border-gray-300 transition-all"
              >
                <div className="mb-5 pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">
                    Book This Day Trip
                  </h3>
                </div>

              {/* Form inputs */}
              <div className="space-y-3.5">
                {/* Pickup Location */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Pickup Location
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 h-12 bg-gray-50/70 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 select-none">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{pickupLocation}</span>
                  </div>
                </div>

                {/* Tour Destination (Plain Text) */}
                <div className="text-xs text-gray-600 flex items-center justify-between px-0.5 py-0.5">
                  <span>
                    Trip Destination:{" "}
                    <span className="font-semibold text-gray-900">
                      {trip?.to}
                    </span>
                  </span>
                  <span className="text-gray-400 text-[11px]">Sightseeing</span>
                </div>

                {/* Dropoff Location */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Drop-off Location (Return)
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 h-12 bg-gray-50/70 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 select-none">
                    <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{dropoffLocation}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Day trip returns back to your pickup location in{" "}
                    {pickupLocation}.
                  </p>
                </div>

                {/* Pickup Date & Time */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Pickup Date & Time
                  </label>
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        suppressHydrationWarning
                        className={cn(
                          "w-full h-12 px-3.5 justify-start text-left font-medium rounded-xl bg-gray-50/70 border-gray-200 hover:bg-white hover:border-blue-400 text-gray-800 text-sm shadow-none",
                          !date && "text-gray-400",
                        )}
                      >
                        <CalendarIcon className="mr-2.5 h-4 w-4 text-blue-600 shrink-0" />
                        {date ? (
                          <span className="truncate" suppressHydrationWarning>
                            <span
                              className="font-semibold text-gray-900"
                              suppressHydrationWarning
                            >
                              {format(date, "MMM d, yyyy")}
                            </span>
                            <span className="text-gray-400 mx-2">|</span>
                            <span
                              className="text-blue-600 font-bold"
                              suppressHydrationWarning
                            >
                              {time}
                            </span>
                          </span>
                        ) : (
                          <span>Pick date & time</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 z-50"
                      align="start"
                      collisionPadding={16}
                    >
                      <DateTimePickerContent
                        date={date}
                        setDate={setDate}
                        time={time}
                        setTime={setTime}
                        onClose={() => setIsCalendarOpen(false)}
                        isTimeDisabled={isTimeDisabled}
                        minDate={today}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Passengers & Luggage */}
                <div className="pt-2 border-t border-gray-100 space-y-2.5">
                  {/* Adults */}
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">
                        Adults
                      </span>
                      <span className="text-[11px] text-gray-400">Age 13+</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold text-gray-900">
                        {adults}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">
                        Children
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Age 0-12 (child seats free)
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        disabled={children <= 0}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold text-gray-900">
                        {children}
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Luggage / Bags */}
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">
                        Luggage / Bags
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Standard suitcases
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setExtraBags(Math.max(0, extraBags - 1))}
                        disabled={extraBags <= 0}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold text-gray-900">
                        {extraBags}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExtraBags(extraBags + 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-3">
                  {isFormValid ? (
                    <Link
                      href={{
                        pathname: `/booking/day-trips/${pSlug}-to-${dSlug}/vehicles`,
                        query: {
                          serviceType: "DAY_TRIP",
                          tripType: "round-trip",
                          id: trip?.id,
                          pickup: pickupLocation || trip?.from || "Dublin",
                          destination: trip?.to || "",
                          dropoff:
                            dropoffLocation ||
                            pickupLocation ||
                            trip?.from ||
                            "Dublin",
                          date: date ? date.toISOString() : "",
                          time,
                          adults: adults.toString(),
                          children: children.toString(),
                          extraBags: extraBags.toString(),
                        },
                      }}
                      onClick={() => {
                        saveBookingSession({
                          serviceType: "DAY_TRIP",
                          tripType: "round-trip",
                          id: trip?.id,
                          pickup: pickupLocation || trip?.from || "Dublin",
                          destination: trip?.to || "",
                          dropoff:
                            dropoffLocation ||
                            pickupLocation ||
                            trip?.from ||
                            "Dublin",
                          date: date ? date.toISOString() : "",
                          time,
                          adults,
                          children,
                          extraBags,
                          selectedStops: [],
                        });
                      }}
                      className="block w-full"
                    >
                      <button className="btn-theme-primary w-full h-12 text-sm sm:text-base font-bold shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="btn-theme-primary w-full h-12 text-sm sm:text-base font-bold opacity-50 cursor-not-allowed pointer-events-none flex items-center justify-center"
                      disabled
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Route Map under the booking card */}
            <DayTripMap
              origin={pickupLocation || trip?.from || "Dublin"}
              destination={trip?.to || "Cliffs of Moher"}
              stops={trip?.stops}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
