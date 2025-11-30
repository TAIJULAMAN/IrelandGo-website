"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Luggage, Plus, Search, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TransferSearchHero() {
  const [tripType, setTripType] = useState("one-way");

  const tabs = [
    { id: "transfer", label: "Transfer" },
    { id: "hourly", label: "By the hour", icon: Clock, href: "/by-the-hour" },
    { id: "day-trips", label: "Day trips", href: "/day-trips" },
    { id: "multi-day", label: "Multi day tours", href: "/multi-day-tours" },
  ];
  return (
    <section className="relative overflow-hidden min-h-[800px] text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/plane.png"
          alt="Runway at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-10 pt-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Discover Dublin with
            <br className="hidden sm:block" />
            Comfortable Transfers
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Seamless city-to-city and airport transfers across Dublin and
            beyond.
          </p>
        </div>

        {/* Booking Card */}
        <div className="flex gap-5 container mx-auto bg-white rounded-xl shadow-xl p-5">
          <div className="w-full ">
            {/* Tabs */}
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setTripType("one-way")}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                  tripType === "one-way"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                One Way
              </button>
              <button
                onClick={() => setTripType("return")}
                className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                  tripType === "return"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Return
              </button>
            </div>

            {/* Location Inputs */}
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div>
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <input
                    type="text"
                    placeholder="Dropoff Location"
                    className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium mb-5 transition">
              <Plus className="w-4 h-4" />
              Add Stop
            </button>

            {/* Date, Time, Passengers, Luggage */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="col-span-1">
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="04/07/2025 - 09:00 am"
                    className="w-full outline-none text-xs text-gray-700"
                    defaultValue="04/07/2025 - 09:00 am"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                  <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <select className="w-full outline-none text-xs bg-white text-gray-700">
                    <option>1 Passenger</option>
                    <option>2 Passengers</option>
                    <option>3+ Passengers</option>
                  </select>
                  <svg
                    className="w-3 h-3 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                  <Luggage className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <select className="w-full outline-none text-sm bg-white text-gray-700">
                    <option>1 Luggage</option>
                    <option>2 Luggage</option>
                    <option>3+ Luggage</option>
                  </select>
                  <svg
                    className="w-3 h-3 text-gray-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {tripType === "return" && (
              <div className="mb-5">
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                  <input
                    type="text"
                    placeholder="Return"
                    className="w-full outline-none text-sm text-gray-700"
                  />
                </div>
              </div>
            )}

            <Button asChild className="w-full h-10 py-3" variant="outline">
              <Link href="/transfer/private-car-transfer">
                <Search className="w-5 h-5" />
                Find a Ride
              </Link>
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg h-full">
            <Image
              src="/map.png"
              alt="Ireland route map"
              className="w-[500px] h-[300px] object-cover"
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
