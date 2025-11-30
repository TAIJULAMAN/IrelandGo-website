"use client";

import { Check, Clock, Shield, CheckCircle2, Calendar, MapPin } from "lucide-react";
import { Header } from "../header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ByTheHourHero() {
  const [activeTab, setActiveTab] = useState("by-the-hour");
  const router = useRouter();

  const tabs = [
    { id: "transfer", label: "Transfer", href: "/" },
    { id: "by-the-hour", label: "By the hour", icon: Clock, href: "/by-the-hour" },
    { id: "day-trips", label: "Day trips", href: "/day-trips" },
    { id: "multi-day", label: "Multi day tours", href: "/multi-day-tours" },
  ];
  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (tab.href) {
      router.push(tab.href);
    } else {
      setActiveTab(tab.id);
    }
  };
  return (
    <div
      className="relative text-white min-h-[800px]"
      style={{ background: "linear-gradient(to bottom, #002F5E, #C0C8D0)" }}
    >
      {/* Header integrated into hero */}
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
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
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

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto px-5 mb-10 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Departure
                </label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    className="flex-1 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Departure
                </label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Dropoff Location"
                    className="flex-1 outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Date
                </label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    defaultValue="18/03/2025"
                    className="flex-1 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Duration
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none">
                  <option>5-8 Hrs Hours</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Passenger
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none">
                  <option>1 Passenger</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Luggage
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none">
                  <option>1 Luggage</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white py-4 rounded-lg font-medium hover:bg-blue-600 transition">
              Search Available Dates →
            </button>
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  Flexible Cancellation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  24/7 Customer Support
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Shared Messaging</span>
              </div>
            </div>
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
  );
}
