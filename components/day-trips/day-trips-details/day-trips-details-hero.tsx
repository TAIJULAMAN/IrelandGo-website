"use client";

import { Users, MapPin, Flag, Briefcase, ChevronDown, Plus, Minus, Luggage } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/common/header";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DayTripsDetailsHero() {
  // Passengers and Luggage state
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(0)
  const [extraBags, setExtraBags] = useState<number>(0)

  // Computed totals for display
  const totalPassengers = adults + children
  const totalBags = extraBags
  return (
    <section className="relative w-full">
      <Header />
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/details.png"
          alt="Scenic Ireland coastline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 md:p-8">
          {/* Title & Subtitle */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
            <span className="text-blue-700">Dublin to Galway</span> via Cliffs
            of Moher
          </h1>
          <p className="text-slate-600 md:text-lg text-center">
            Explore gorgeous coastal scenery and charming Irish towns on a
            private, guided day tour.
          </p>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap justify-center items-center gap-5">
            <div className="inline-flex items-center gap-2 text-slate-700 text-sm">
              <Users className="w-4 h-4 text-blue-600" /> Max 12 People
            </div>
            <div className="inline-flex items-center gap-2 text-emerald-700 text-sm font-semibold">
              From €125/person
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12">
              <MapPin className="w-4 h-4 text-blue-500" />
              <Input
                type="text"
                placeholder="Pickup Location"
                className="border-0 bg-transparent h-10 px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-0 shadow-none"
              />
            </label>
            <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12">
              <Flag className="w-4 h-4 text-blue-500" />
              <Input
                type="text"
                placeholder="Dropoff Location"
                className="border-0 bg-transparent h-10 px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-0 shadow-none"
              />
            </label>
            {/* Passengers */}
            <div>
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

          {/* CTA */}
          <div className="mt-5 flex justify-center">
            <Link href={`/booking-flow/step-2`}>
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
