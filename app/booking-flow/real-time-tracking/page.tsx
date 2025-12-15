"use client";

import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, MapPin, Phone } from "lucide-react";

export default function RealTimeTracking() {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <Header2 />

      <div className="flex-1 py-8 sm:py-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Page title */}
        <div className="text-center mb-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-700">
            Your Booking - Real-Time Tracking
          </h1>
        </div>

        {/* Top booking info bar */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 md:p-6 flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-5 text-xs sm:text-sm text-gray-700">
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500 mb-1">
                Booking ID
              </p>
              <p className="font-semibold text-gray-900">#12345</p>
            </div>
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500 mb-1">
                Pickup Location
              </p>
              <p className="font-medium text-gray-900">
                123 Main Street, Downtown
              </p>
            </div>
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500 mb-1">
                Destination
              </p>
              <p className="font-medium text-gray-900">
                456 Airport Road, Terminal 2
              </p>
            </div>
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500 mb-1">
                Status
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 px-2.5 py-1 text-[11px] font-medium">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                On the Way
              </span>
            </div>
            <div className="text-right">
              <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500 mb-1">
                ETA
              </p>
              <p className="text-base sm:text-lg font-semibold text-blue-600">12:41</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gray-200" />
              <div className="text-xs sm:text-sm">
                <p className="font-semibold text-gray-900">Michael Johnson</p>
                <p className="text-[11px] sm:text-xs text-gray-500">Toyota Camry - ABC 1234</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button className="h-9 rounded-full px-4 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                Contact Driver
              </Button>
              <Button className="h-9 rounded-full px-4 text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white">
                Cancel Trip
              </Button>
            </div>
          </div>
        </div>

        {/* Middle content: map + side cards */}
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {/* Map / route card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-4 sm:p-5 md:p-6">
            <div className="text-[11px] sm:text-xs text-gray-500 mb-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Current Location</p>
                <p>Downtown Area · 5.3 km away</p>
              </div>
            </div>

            <div className="relative h-64 sm:h-72 rounded-2xl bg-blue-50 overflow-hidden">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[11px] text-gray-600">
                Pickup
              </div>
              <div className="absolute right-8 top-10 text-[11px] text-gray-600">
                Destination
              </div>

              <svg
                viewBox="0 0 260 160"
                className="absolute inset-0 w-full h-full text-blue-300"
              >
                <defs>
                  <marker
                    id="rt-dot"
                    viewBox="0 0 8 8"
                    refX="4"
                    refY="4"
                    markerWidth="8"
                    markerHeight="8"
                  >
                    <circle cx="4" cy="4" r="3" fill="currentColor" />
                  </marker>
                </defs>
                <path
                  d="M20 130 C 80 60, 160 40, 240 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  markerStart="url(#rt-dot)"
                  markerEnd="url(#rt-dot)"
                />
                <circle cx="130" cy="80" r="6" fill="#2563eb" />
              </svg>

              {/* ETA bubble */}
              <div className="absolute left-1/2 bottom-5 -translate-x-1/2 bg-white rounded-xl shadow-md px-3 py-2 flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] sm:text-xs text-gray-700">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-blue-600" />
                  <span className="font-medium">ETA 12 min</span>
                </div>
                <span className="hidden sm:inline h-4 w-px bg-gray-200" />
                <span>Distance: 5.2 km</span>
                <span className="hidden sm:inline h-4 w-px bg-gray-200" />
                <span>Speed: 45 km/h</span>
              </div>
            </div>
          </div>

          {/* Right side: driver & status */}
          <div className="space-y-4">
            {/* Driver & vehicle details */}
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                Driver & Vehicle Details
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-gray-900">Michael Johnson</p>
                  <p className="text-[11px] sm:text-xs text-gray-500">4.9 ★ (248 reviews)</p>
                </div>
              </div>
              <div className="space-y-1 text-[11px] sm:text-xs text-gray-600">
                <p>Toyota Camry · ABC 1234</p>
                <p>4 seats · 3 large bags</p>
                <p>+1 (234) 567-890</p>
              </div>
            </div>

            {/* Trip status updates */}
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                Trip Status Updates
              </h2>
              <div className="space-y-2 text-[11px] sm:text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Trip is on time</p>
                    <p className="text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800">Driver is 5 minutes away</p>
                    <p className="text-gray-500">7 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800">Driver accepted your booking</p>
                    <p className="text-gray-500">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <div>
                    <p className="font-medium text-gray-800">Booking confirmed</p>
                    <p className="text-gray-500">12 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
