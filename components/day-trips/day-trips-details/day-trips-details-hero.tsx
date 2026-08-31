"use client";

import { MapPin, Flag, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function DayTripsDetailsHero({ trip }: { trip: any }) {
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(0)
  const [extraBags, setExtraBags] = useState<number>(0)
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("09:00");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

  const isFormValid = date !== undefined && time !== "" && !isTimeDisabled(date, time);

  return (
    <section className="relative w-full h-[80vh] py-20">
      <div className="absolute inset-0 z-0">
        <img
          src={trip?.images?.[0] || "/details.png"}
          alt={trip?.title || "Scenic Ireland coastline"}
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full pt-10 md:pt-16">
        <div className="text-center mb-6 md:mb-10 max-w-4xl mx-auto">
          {/* Title & Subtitle */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance leading-tight px-4 drop-shadow-md">
            {trip?.title}
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-4 px-4 font-medium drop-shadow-md">
            Explore gorgeous coastal scenery and charming Irish towns on a private, guided day tour.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/50 p-5 md:p-8">

          {/* Controls */}
          <div className="mt-2 flex flex-col md:flex-row items-stretch bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex-1 flex items-center gap-3 px-4 h-14 md:h-16 border-b md:border-b-0 md:border-r border-slate-200 hover:bg-slate-50 transition-colors">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
              <Input
                type="text"
                defaultValue={trip?.from || ""}
                placeholder="Pickup Location"
                className="border-0 bg-transparent h-full px-0 text-sm md:text-base font-medium placeholder:text-slate-400 focus-visible:ring-0 shadow-none rounded-none"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 h-14 md:h-16 border-b md:border-b-0 md:border-r border-slate-200 hover:bg-slate-50 transition-colors">
              <Flag className="w-5 h-5 text-blue-600 shrink-0" />
              <Input
                type="text"
                defaultValue={trip?.to || ""}
                placeholder="Dropoff Location"
                className="border-0 bg-transparent h-full px-0 text-sm md:text-base font-medium placeholder:text-slate-400 focus-visible:ring-0 shadow-none rounded-none"
              />
            </div>
            {/* Date Picker */}
            <div className="flex-1 flex items-center h-14 md:h-16 hover:bg-slate-50 transition-colors">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full h-full px-4 justify-start text-left font-medium rounded-none hover:bg-transparent text-slate-700 text-sm md:text-base",
                      !date && "text-slate-400"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-blue-600 flex-shrink-0" />
                    {date ? (
                      <span className="truncate">
                        <span>{format(date, "MMM d, yyyy")}</span>
                        <span className="text-slate-300 mx-2">|</span>
                        <span className="text-slate-900">{time}</span>
                      </span>
                    ) : (
                      <span>Pick date & time</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex flex-col sm:flex-row">
                    <div className="border-b sm:border-b-0 sm:border-r border-slate-100">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={{ before: today }}
                        initialFocus
                      />
                    </div>
                    <div className="h-[200px] sm:h-[300px] w-full sm:w-[120px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                      <div className="flex sm:flex-col gap-1 flex-wrap sm:flex-nowrap">
                        {(() => {
                          const availableTimes = Array.from({ length: 96 })
                            .map((_, i) => {
                              const hour = Math.floor(i / 4);
                              const minute = (i % 4) * 15;
                              return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                            })
                            .filter((timeString) => !isTimeDisabled(date, timeString));

                          if (availableTimes.length === 0) {
                            return (
                              <div className="text-center p-4 text-sm text-slate-500 w-full">
                                No times
                              </div>
                            );
                          }

                          return availableTimes.map((timeString) => (
                            <Button
                              key={timeString}
                              variant={time === timeString ? "default" : "ghost"}
                              className={cn(
                                "justify-center h-9 text-sm flex-1 sm:flex-none min-w-[70px]",
                                time === timeString
                                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                                  : "hover:bg-blue-50 text-slate-600"
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
          </div>

          {/* CTA */}
          <div className="mt-5 flex justify-center w-full sm:w-auto">
            {isFormValid ? (
              <Link
                href={{
                  pathname: "/booking/choose-vehicle",
                  query: {
                    serviceType: "DAY_TRIP",
                    id: trip?.id,
                    pickup: trip?.from || "",
                    dropoff: trip?.to || "",
                    date: date ? date.toISOString() : "",
                    time,
                    adults: adults.toString(),
                    children: children.toString(),
                    extraBags: extraBags.toString(),
                  },
                }}
              >
                <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm w-full sm:w-auto">
                  Book Your Tour
                </button>
              </Link>
            ) : (
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600/50 text-white/70 font-semibold shadow-none cursor-not-allowed w-full sm:w-auto" disabled>
                Book Your Tour
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
