"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { MapPin, Calendar, Users, Luggage, Plus, Clock, Search, BadgeCheck, UserRoundCog, ShieldPlus } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const [activeTab, setActiveTab] = useState("transfer")
  const [tripType, setTripType] = useState("one-way")

  const tabs = [
    { id: "transfer", label: "Transfer" },
    { id: "hourly", label: "By the hour", icon: Clock },
    { id: "day-trips", label: "Day trips" },
    { id: "multi-day", label: "Multi day tours" },
  ]

  return (
    <section className="relative pt-24 pb-20 overflow-hidden min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ireland-hero-bg.jpg"
          alt="Irish landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/10 via-[#000000]/10 to-[#000000]/10 "></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-10 pt-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance leading-tight">
            Comfortable car transfers in Ireland
          </h1>
          <p className="text-lg text-white/90 mb-8">Book private transfers and day tours with professional drivers.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-start mb-10">
          <div className="inline-flex gap-0 bg-white/10 backdrop-blur-sm rounded-full p-1 border-2 border-blue-400/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-md"
                  : "bg-transparent text-white hover:bg-white/10"
                  }`}
              >
                {tab.icon && <tab.icon className="w-4 h-4" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {/* Booking Form Container */}
          <div className="flex gap-5 container mx-auto bg-white rounded-xl shadow-xl p-5">
            <div className="w-full ">
              {/* Tabs */}
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setTripType("one-way")}
                  className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${tripType === "one-way"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  One Way
                </button>
                <button
                  onClick={() => setTripType("return")}
                  className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${tripType === "return"
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
                    <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                    <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

              <Button className="w-full h-10 py-3" variant="outline">
                <Search className="w-5 h-5" />
                Find a Ride
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

          {/* Features Row */}
          <div className="flex flex-wrap gap-10 justify-center text-lg font-medium mt-10">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="w-5 h-5 text-green-500" />
              </div>
              <span className="font-medium">Flexible Cancellation</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <UserRoundCog className="w-5 h-5 text-green-500" />
              </div>
              <span className="font-medium">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldPlus className="w-5 h-5 text-green-500" />
              </div>
              <span className="font-medium">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
