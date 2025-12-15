"use client";

import { Check, Clock, Shield, Calendar, MapPin, Users, Luggage } from "lucide-react";
import { Header } from "../common/header";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/40 to-[#000000]/40"></div>
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
              <button className="w-full bg-blue-500 text-white py-4 rounded-lg font-medium hover:bg-blue-600 transition">
                Search Available Rides →
              </button>

            </div>
          </div>

          {/* Features */}
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">Flexible Cancellation</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20">
              <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
