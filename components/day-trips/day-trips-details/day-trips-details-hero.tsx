"use client";

import { MapPin, Flag, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/common/header";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
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

  return (
    <section className="relative w-full h-[80vh]">
      <Header />
      <div className="absolute inset-0">
        <img
          src={trip?.images?.[0] || "/details.png"}
          alt={trip?.title || "Scenic Ireland coastline"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>
      <div className="relative z-10 container mx-auto px-5 flex items-center justify-center pt-30">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-5 md:p-8">
          {/* Title & Subtitle */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 text-center">
            {trip?.title}
          </h1>
          <p className="text-slate-600 md:text-lg text-center mb-6 line-clamp-2">
            {trip?.description
              ? trip.description.replace(/<[^>]*>?/gm, "").slice(0, 100) + (trip.description.replace(/<[^>]*>?/gm, "").length > 100 ? "..." : "")
              : "Explore gorgeous coastal scenery and charming Irish towns on a private, guided day tour."}
          </p>

          {/* Controls */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12">
              <MapPin className="w-4 h-4 text-blue-500" />
              <Input
                type="text"
                defaultValue={trip?.from || ""}
                placeholder="Pickup Location"
                className="border-0 bg-transparent h-10 px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-0 shadow-none"
              />
            </label>
            <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12">
              <Flag className="w-4 h-4 text-blue-500" />
              <Input
                type="text"
                defaultValue={trip?.to || ""}
                placeholder="Dropoff Location"
                className="border-0 bg-transparent h-10 px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-0 shadow-none"
              />
            </label>
            {/* Date Picker */}
            <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-slate-700",
                      !date && "text-slate-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
                    {date ? (
                      <span>
                        {format(date, "PPP")}{" "}
                        <span className="text-slate-400 mx-1">|</span> {time}
                      </span>
                    ) : (
                      <span>Pick a date & time</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex">
                    <div className="border-r border-slate-100">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={{ before: today }}
                        initialFocus
                      />
                    </div>
                    <div className="h-[300px] w-[110px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                      <div className="flex flex-col gap-1">
                        {Array.from({ length: 48 }).map((_, i) => {
                          const hour = Math.floor(i / 2);
                          const minute = (i % 2) * 30;
                          const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                          return (
                            <Button
                              key={timeString}
                              variant={time === timeString ? "default" : "ghost"}
                              className={cn(
                                "justify-center h-8 text-sm",
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
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5 flex justify-center">
            <Link
              href={{
                pathname: "/booking-flow/step-2",
                query: {
                  serviceType: "DAY_TRIP",
                  id: trip?.id,
                  pickup: trip?.from || "Dublin",
                  dropoff: trip?.to || "Galway",
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
          </div>
        </div>
      </div>
    </section>
  );
}
