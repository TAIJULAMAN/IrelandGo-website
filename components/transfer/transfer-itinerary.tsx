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
  Check,
  X,
  ShieldCheck,
  Luggage,
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
import { TransferJourneyAtAGlance } from "./transfer-journey-at-a-glance";

const TransferMap = dynamic(
  () =>
    import("@/components/day-trips/day-trips-details/day-trip-map").then(
      (mod) => ({
        default: mod.DayTripMap,
      }),
    ),
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

interface TransferItineraryProps {
  transferRoute?: any;
}

export default function TransferItinerary({
  transferRoute,
}: TransferItineraryProps) {
  const pickupLocation = transferRoute?.from || "Dublin";
  const dropoffLocation = transferRoute?.to || "Destination";

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
  const dSlug = slugifyText(dropoffLocation || "destination");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isTimeDisabled = (selectedDate: Date | undefined, timeStr: string) => {
    if (!selectedDate) return false;
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    if (!isToday) return false;

    const [hours, minutes] = timeStr.split(":").map(Number);
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hours, minutes, 0, 0);

    const twoHoursFromNow = new Date();
    twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2);

    return selectedDateTime < twoHoursFromNow;
  };

  useEffect(() => {
    if (date && isTimeDisabled(date, time)) {
      for (let i = 0; i < 96; i++) {
        const hour = Math.floor(i / 4);
        const minute = (i % 4) * 15;
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        if (!isTimeDisabled(date, timeString)) {
          setTime(timeString);
          break;
        }
      }
    }
  }, [date]);

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
  }, [transferRoute?.description]);

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start relative"
        >
          {/* Left Column (8 cols): Journey Details */}
          <div className="md:col-span-7 xl:col-span-8 space-y-10 sm:space-y-12 min-w-0">
            {/* Description (if available) */}
            {transferRoute?.description && (
              <div className="min-w-0 overflow-hidden font-sans">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                  About your transfer
                </h2>
                <p className="font-sans text-gray-700 leading-relaxed text-sm sm:text-base">
                  {transferRoute.description}
                </p>
              </div>
            )}

            {/* 1. Quick Highlights Bar */}
            <div className="border-y border-gray-200 py-5 sm:py-6">
              <ul className="space-y-3.5 sm:space-y-4">
                <li className="flex items-center gap-3.5 text-gray-900 font-semibold text-base sm:text-[17px]">
                  <Car className="w-5 h-5 text-gray-900 shrink-0" />
                  <span>
                    Exclusively yours: private executive vehicle and
                    professional chauffeur
                  </span>
                </li>
                <li className="flex items-center gap-3.5 text-gray-900 font-semibold text-base sm:text-[17px]">
                  <SteeringWheelIcon className="w-5 h-5 text-gray-900 shrink-0" />
                  <span>
                    Direct door-to-door transfer with luggage assistance
                  </span>
                </li>
                <li className="flex items-center gap-3.5 text-gray-900 font-semibold text-base sm:text-[17px]">
                  <ShieldCheck className="w-5 h-5 text-gray-900 shrink-0" />
                  <span>
                    Flight tracking and 60 minutes complimentary airport wait
                    time
                  </span>
                </li>
                <li className="flex items-center gap-3.5 text-gray-900 font-semibold text-base sm:text-[17px]">
                  <Users className="w-5 h-5 text-gray-900 shrink-0" />
                  <span>
                    Ideal for individual, family, executive, and group travel
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
                      Seamless pickup wherever you specify
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2 pl-8">
                    Your professional chauffeur will meet you right at your
                    terminal arrival hall, hotel lobby, or private doorstep in{" "}
                    {pickupLocation}. No waiting in taxi queues or handling
                    heavy luggage alone.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <SteeringWheelIcon className="w-5 h-5 text-gray-900 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      Smooth and punctual journey
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2 pl-8">
                    Enjoy a quiet, relaxing ride in a premium air-conditioned
                    vehicle. With real-time traffic navigation and local road
                    expertise, your driver ensures you reach {dropoffLocation}{" "}
                    comfortably on schedule.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-gray-900 shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      Direct door-to-door arrival
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-2 pl-8">
                    Arrive directly at your final destination in{" "}
                    {dropoffLocation}. Your chauffeur handles your bags and
                    ensures you transition smoothly without any stress.
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
                  <span>Direct private car transfer</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Premium air-conditioned vehicle</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Personalized pickup and drop-off</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Child seats included free of charge upon request</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Professional English-speaking chauffeur</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Complimentary bottled water</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <Check className="w-5 h-5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>Free cancellation up to 24 hours before pickup</span>
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-800 leading-snug">
                  <X className="w-5 h-5 text-gray-400 stroke-[2.5] shrink-0 mt-0.5" />
                  <span>
                    Additional detour stops must be requested in advance
                  </span>
                </li>
              </ul>
            </div>

            {/* 4. Your Journey at a Glance */}
            <div className="min-w-0 pt-2">
              <TransferJourneyAtAGlance
                transferRoute={transferRoute}
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
              {/* 1. Book Your Journey Card */}
              <div
                suppressHydrationWarning
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-200/90 hover:border-gray-300 transition-all"
              >
                {/* Card Header */}
                <div className="mb-5 pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                    Book Your Journey
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Fixed pricing, luxury vehicles, and professional drivers.
                  </p>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Pickup Location */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Pickup Location
                    </label>
                    <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 font-medium shadow-2xs">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{pickupLocation}</span>
                    </div>
                  </div>

                  {/* Drop-off Location */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Drop-off Location
                    </label>
                    <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 font-medium shadow-2xs">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="truncate">{dropoffLocation}</span>
                    </div>
                  </div>

                  {/* Pickup Date & Time */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Pickup Date & Time
                    </label>
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "w-full flex items-center justify-start gap-2.5 px-3.5 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium hover:border-gray-300 transition-colors cursor-pointer text-left shadow-2xs",
                            !date && "text-gray-400",
                          )}
                        >
                          <CalendarIcon className="w-4 h-4 text-gray-500 shrink-0" />
                          <span className="truncate">
                            {date
                              ? `${format(date, "MMM dd, yyyy")} | ${time}`
                              : "Select Date & Time"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 z-50 rounded-2xl shadow-xl border-gray-200"
                        align="start"
                        side="bottom"
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

                  {/* Passengers Counters */}
                  <div className="pt-2 border-t border-gray-100 space-y-3">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-gray-900">
                          Adults
                        </div>
                        <div className="text-[11px] text-gray-400">Age 13+</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setAdults((prev) => Math.max(1, prev - 1))
                          }
                          disabled={adults <= 1}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center font-bold text-gray-900">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setAdults((prev) => Math.min(8, prev + 1))
                          }
                          disabled={adults >= 8}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-gray-900">
                          Children
                        </div>
                        <div className="text-[11px] text-gray-400">
                          Age 0–12 (child seats free)
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setChildren((prev) => Math.max(0, prev - 1))
                          }
                          disabled={children <= 0}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center font-bold text-gray-900">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setChildren((prev) => Math.min(6, prev + 1))
                          }
                          disabled={children >= 6}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Luggage */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-gray-900">
                          Luggage / Bags
                        </div>
                        <div className="text-[11px] text-gray-400">
                          Standard suitcases
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setExtraBags((prev) => Math.max(0, prev - 1))
                          }
                          disabled={extraBags <= 0}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center font-bold text-gray-900">
                          {extraBags}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setExtraBags((prev) => Math.min(8, prev + 1))
                          }
                          disabled={extraBags >= 8}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <div className="pt-3">
                    <Link
                      href={`/booking/vehicles?pickup=${encodeURIComponent(
                        pickupLocation,
                      )}&dropoff=${encodeURIComponent(
                        dropoffLocation,
                      )}&serviceType=PRIVATE_TRANSFER&tripType=one-way&date=${
                        date ? format(date, "yyyy-MM-dd") : ""
                      }&time=${encodeURIComponent(
                        time,
                      )}&adults=${adults}&children=${children}&extraBags=${extraBags}`}
                      onClick={() => {
                        saveBookingSession({
                          serviceType: "PRIVATE_TRANSFER",
                          pickup: pickupLocation,
                          dropoff: dropoffLocation,
                          destination: dropoffLocation,
                          date: date ? format(date, "yyyy-MM-dd") : "",
                          time: time,
                          tripType: "one-way",
                          adults,
                          children,
                          extraBags,
                          selectedStops: [],
                        });
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 2. Route Map under the booking card */}
              <TransferMap
                origin={pickupLocation}
                destination={dropoffLocation}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
