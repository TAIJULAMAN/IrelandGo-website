"use client";

import { Check, Clock, Shield, Calendar, MapPin, Users, Luggage, BadgeCheck, UserRoundCog, ShieldPlus } from "lucide-react";
import { Header } from "../common/header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ByTheHourHero() {
  const [activeTab, setActiveTab] = useState("by-the-hour");
  const router = useRouter();

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
    <div className="relative text-white min-h-[800px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ireland-hero-bg.jpg"
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

          {/* Tabs */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Pickup Location
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter pickup location"
                      className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Dropoff Location
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter dropoff location"
                      className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>
              {/* Date, Time, Passengers, Luggage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Date & Time
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="18/03/2025 - 09:00 am"
                      defaultValue="18/03/2025 - 09:00 am"
                      className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Duration
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <select className="w-full outline-none text-sm text-gray-700 bg-transparent">
                      <option>5-8 Hours</option>
                      <option>8-12 Hours</option>
                      <option>12+ Hours</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Passengers
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <select className="w-full outline-none text-sm text-gray-700 bg-transparent">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3+ Passengers</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
                    Luggage
                  </label>
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Luggage className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <select className="w-full outline-none text-sm text-gray-700 bg-transparent">
                      <option>1 Luggage</option>
                      <option>2 Luggage</option>
                      <option>3+ Luggage</option>
                    </select>
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
          <div className="flex flex-wrap gap-6 md:gap-8 justify-center text-sm md:text-base font-medium mt-8 md:mt-12 px-4">
            <div className="flex items-center gap-3 bg-white/15 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">Flexible Cancellation</span>
            </div>
            <div className="flex items-center gap-3 bg-white/15 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <UserRoundCog className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-3 bg-white/15 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ShieldPlus className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
