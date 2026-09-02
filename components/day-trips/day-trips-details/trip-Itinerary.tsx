"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  MapPin,
  Flag,
  Calendar as CalendarIcon,
  Info,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { slugifyText } from "@/utils/bookingSession";

export default function DayTripItinerary({ trip }: { trip: any }) {
  const [pickupLocation, setPickupLocation] = useState(trip?.from || "");
  const [dropoffLocation, setDropoffLocation] = useState(trip?.to || "");
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

  useEffect(() => {
    if (trip?.from && !pickupLocation) setPickupLocation(trip.from);
    if (trip?.to && !dropoffLocation) setDropoffLocation(trip.to);
  }, [trip]);

  const pSlug = slugifyText(pickupLocation || trip?.from || "dublin");
  const dSlug = slugifyText(dropoffLocation || trip?.to || "galway");

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
    pickupLocation.trim() !== "" &&
    dropoffLocation.trim() !== "" &&
    date !== undefined &&
    time !== "" &&
    !isTimeDisabled(date, time);

  // Price display
  const minVehiclePrice = trip?.vehicles?.length
    ? Math.min(...trip.vehicles.map((v: any) => v.price))
    : trip?.price || null;

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: About your trip & Itinerary */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                About your trip
              </h2>
              <div
                className="text-gray-700 leading-relaxed text-sm sm:text-base space-y-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-gray-600 [&_strong]:text-gray-900"
                dangerouslySetInnerHTML={{
                  __html:
                    trip?.description || "No description for this trip yet....",
                }}
              />
            </div>

            {/* Flexible Note */}
            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                  Flexible Itinerary
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Duration or stops can be customized upon request after
                  booking. Your personal chauffeur will accommodate your
                  preferred pace and stops along the route.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Form */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-gray-200/80">
              <div className="mb-5 pb-4 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full inline-block mb-2">
                  Private Day Tour
                </span>
                <h3 className="text-xl font-bold text-gray-900">
                  Book This Day Trip
                </h3>
                {minVehiclePrice && (
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-xs text-gray-500 font-medium">
                      Starts from
                    </span>
                    <span className="text-2xl font-extrabold text-blue-600">
                      €{minVehiclePrice}
                    </span>
                    <span className="text-xs text-gray-400">/ vehicle</span>
                  </div>
                )}
              </div>

              {/* Form inputs */}
              <div className="space-y-3.5">
                {/* Pickup Location */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Pickup Location
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 h-12 bg-gray-50 border border-gray-200 rounded-xl focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <Input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="e.g. Hotel in Dublin"
                      className="border-0 bg-transparent h-full px-0 text-sm font-medium placeholder:text-gray-400 focus-visible:ring-0 shadow-none"
                    />
                  </div>
                </div>

                {/* Dropoff Location */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Dropoff Location
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 h-12 bg-gray-50 border border-gray-200 rounded-xl focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Flag className="w-4 h-4 text-blue-600 shrink-0" />
                    <Input
                      type="text"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      placeholder="e.g. Kilkenny & Wicklow"
                      className="border-0 bg-transparent h-full px-0 text-sm font-medium placeholder:text-gray-400 focus-visible:ring-0 shadow-none"
                    />
                  </div>
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
                        className={cn(
                          "w-full h-12 px-3.5 justify-start text-left font-medium rounded-xl bg-gray-50 border-gray-200 hover:bg-white hover:border-blue-400 text-gray-800 text-sm shadow-none",
                          !date && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2.5 h-4 w-4 text-blue-600 shrink-0" />
                        {date ? (
                          <span className="truncate">
                            <span className="font-semibold text-gray-900">
                              {format(date, "MMM d, yyyy")}
                            </span>
                            <span className="text-gray-400 mx-2">|</span>
                            <span className="text-blue-600 font-bold">
                              {time}
                            </span>
                          </span>
                        ) : (
                          <span>Pick date & time</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 z-50 shadow-2xl rounded-2xl border-gray-200"
                      align="start"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="border-b sm:border-b-0 sm:border-r border-gray-100 p-2">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={{ before: today }}
                            initialFocus
                          />
                        </div>
                        <div className="h-[240px] sm:h-[320px] w-full sm:w-[130px] overflow-y-auto p-2 scrollbar-thin">
                          <div className="flex sm:flex-col gap-1 flex-wrap sm:flex-nowrap">
                            {(() => {
                              const availableTimes = Array.from({
                                length: 96,
                              })
                                .map((_, i) => {
                                  const hour = Math.floor(i / 4);
                                  const minute = (i % 4) * 15;
                                  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                                })
                                .filter(
                                  (timeString) =>
                                    !isTimeDisabled(date, timeString)
                                );

                              if (availableTimes.length === 0) {
                                return (
                                  <div className="text-center p-3 text-xs text-gray-500 w-full">
                                    No times
                                  </div>
                                );
                              }

                              return availableTimes.map((timeString) => (
                                <Button
                                  key={timeString}
                                  variant={
                                    time === timeString ? "default" : "ghost"
                                  }
                                  className={cn(
                                    "justify-center h-8 text-xs flex-1 sm:flex-none",
                                    time === timeString
                                      ? "bg-blue-600 hover:bg-blue-700 text-white font-bold"
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

                {/* Passengers */}
                <div className="pt-2 border-t border-gray-100">
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

                  <div className="flex items-center justify-between py-1 mt-1">
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">
                        Children
                      </span>
                      <span className="text-[11px] text-gray-400">Age 0-12</span>
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
                </div>

                {/* CTA Button */}
                <div className="pt-3">
                  {isFormValid ? (
                    <Link
                      href={{
                        pathname: `/booking/day-trips/${pSlug}-to-${dSlug}/vehicles`,
                        query: {
                          serviceType: "DAY_TRIP",
                          id: trip?.id,
                          pickup: pickupLocation,
                          dropoff: dropoffLocation,
                          date: date ? date.toISOString() : "",
                          time,
                          adults: adults.toString(),
                          children: children.toString(),
                          extraBags: extraBags.toString(),
                        },
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

                {/* Trust badges */}
                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free cancellation up to 24 hours before pickup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Private chauffeur & luxury vehicle guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Door-to-door private service & flexible pace</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
