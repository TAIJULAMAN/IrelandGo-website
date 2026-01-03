"use client";

import { Clock, Calendar as CalendarIcon, MapPin, Users, Luggage, ChevronDown, Minus, Plus } from "lucide-react";
import { Header } from "../common/header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FeatureBadges } from "../common/feature-badges";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function ByTheHourHero() {
  const [activeTab, setActiveTab] = useState("by-the-hour");
  const router = useRouter();

  // State
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("09:00");
  const [duration, setDuration] = useState("5-8 Hours");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [extraBags, setExtraBags] = useState(0);

  // Derived state
  const totalPassengers = adults + children;

  const tabs = [
    { id: "transfer", label: "Transfer", href: "/" },
    { id: "by-the-hour", label: "By the hour", href: "/by-the-hour" },
    { id: "day-trips", label: "Day trips", href: "/day-trips" }
  ];

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (tab.href) {
      router.push(tab.href);
    } else {
      setActiveTab(tab.id);
    }
  };

  return (
    <div className="relative text-white min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/by-the-hour.jpg"
          alt="Irish landscape"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        <Header />

        <div className="max-w-7xl mx-auto px-5 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 mt-8">
            Explore Ireland's Wonders in One Day
          </h1>
          <p className="text-lg text-white/80 mb-10">
            Discover over 1500+ day trips and private tours with local drivers.
          </p>

          <div className="flex justify-center mb-10">
            <div className="inline-flex gap-0 bg-white/10 backdrop-blur-sm rounded-full p-1 border-2 border-white">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-md"
                    : "bg-transparent text-white hover:bg-white/10"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-6xl mx-auto px-5 mb-10 relative z-10">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Pickup Location
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter pickup location"
                      className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Date, Time, Passengers, Luggage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                {/* Date & Time */}
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Date & Time
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500 flex-shrink-0" />
                          {date ? (
                            <span>
                              {format(date, "PPP")} <span className="text-gray-400 mx-1">|</span> {time}
                            </span>
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="flex">
                          <div className="border-r">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </div>
                          <div className="h-[300px] w-[120px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                            <div className="flex flex-col gap-1">
                              {Array.from({ length: 48 }).map((_, i) => {
                                const hour = Math.floor(i / 2);
                                const minute = (i % 2) * 30;
                                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                                return (
                                  <Button
                                    key={timeString}
                                    variant={time === timeString ? "default" : "ghost"}
                                    className={cn(
                                      "justify-center h-8 text-sm",
                                      time === timeString ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50"
                                    )}
                                    onClick={() => setTime(timeString)}
                                  >
                                    {timeString}
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Duration
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm">{duration}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-1" align="start">
                        {["5-8 Hours", "8-12 Hours", "12+ Hours"].map((option) => (
                          <Button
                            key={option}
                            variant="ghost"
                            className="w-full justify-start font-normal h-9 px-2"
                            onClick={() => setDuration(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Passengers
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm">
                              {totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-4" align="start">
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold text-base">Adults</h4>
                              <p className="text-xs text-muted-foreground">Age 12+</p>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                disabled={adults <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-4 text-center font-medium">{adults}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                                onClick={() => setAdults(adults + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold text-base">Children</h4>
                              <p className="text-xs text-muted-foreground">Age 0-12</p>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                disabled={children <= 0}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-4 text-center font-medium">{children}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                                onClick={() => setChildren(children + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <h4 className="font-medium mb-3 text-sm">Each passenger is allowed</h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Luggage className="w-4 h-4" />
                                <span className="flex-1">One checked bag</span>
                                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">29 x 21 x 11 inch</span>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Luggage className="w-4 h-4" />
                                <span className="flex-1">One carry-on bag</span>
                                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">22 x 14 x 9 inch</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Luggage */}
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Luggage
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700">
                          <div className="flex items-center gap-2">
                            <Luggage className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <span className="text-sm">
                              {extraBags} Extra Bag{extraBags !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-4" align="start">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-lg mb-1">Need more space?</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              You can add extra sets of bags at no extra cost, but you might need a bigger vehicle.
                            </p>
                          </div>
                          <div className="pt-4">
                            <h4 className="font-semibold text-base mb-1">Extra sets of bags</h4>
                            <p className="text-xs text-muted-foreground mb-4">One checked bag + one carry on</p>
                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 w-fit">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                                onClick={() => setExtraBags(Math.max(0, extraBags - 1))}
                                disabled={extraBags <= 0}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-4 text-center font-medium">{extraBags}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                                onClick={() => setExtraBags(extraBags + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

              </div>
              <Link href="/booking-flow/step-2">
                <button className="w-full bg-blue-500 text-white py-4 rounded-lg font-medium hover:bg-blue-600 transition">
                  Search Available Rides →
                </button>
              </Link>

            </div>
          </div>

          {/* Features */}
          <FeatureBadges />
        </div>
      </div>
    </div>
  );
}
