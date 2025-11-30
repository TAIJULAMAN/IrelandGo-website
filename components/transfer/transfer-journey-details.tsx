"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Luggage,
  Euro,
  Route,
  Search,
} from "lucide-react";

export default function TransferJourneyDetails() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">
          Your Journey Details
        </h2>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          {/* Left: Route information card */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-7 space-y-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Route Information
            </h3>

            <div className="space-y-5">
              {/* Origin */}
              <div className="flex items-start gap-3">
                <div className="mt-2 mb-10 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white text-sm font-semibold">
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Dublin Airport
                  </p>
                  <p className="text-xs text-gray-500">Terminal 1, Dublin</p>
                </div>
              </div>

              {/* Destination input */}
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-semibold">
                  B
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Pickup Location"
                      className="w-full bg-transparent outline-none placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Date and time - choose from calendar */}
              {/* <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm text-gray-800">
                <Calendar className="h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  defaultValue="2025-07-04"
                  className="w-full bg-transparent outline-none"
                />
              </div> */}

              {/* Passengers and luggage */}
              {/* <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm text-gray-800">
                  <Users className="h-4 w-4 text-gray-400" />
                  <select className="w-full bg-white outline-none text-xs sm:text-sm text-gray-800">
                    <option>1 Passenger</option>
                    <option>2 Passengers</option>
                    <option>3+ Passengers</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm text-gray-800">
                  <Luggage className="h-4 w-4 text-gray-400" />
                  <select className="w-full bg-white outline-none text-xs sm:text-sm text-gray-800">
                    <option>1 Luggage</option>
                    <option>2 Luggage</option>
                    <option>3+ Luggage</option>
                  </select>
                </div>
              </div> */}
            </div>

            {/* Metrics row */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs sm:text-sm text-gray-700 border-t border-gray-100 pt-4">
              <div className="flex flex-col items-center gap-1">
                <Clock className="h-4 w-4 text-blue-500" />
                <p className="font-medium">Duration</p>
                <p className="text-gray-600">2h 30m</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Route className="h-4 w-4 text-blue-500" />
                <p className="font-medium">Distance</p>
                <p className="text-gray-600">220 km</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Euro className="h-4 w-4 text-blue-500" />
                <p className="font-medium">From</p>
                <p className="text-gray-600">€85</p>
              </div>
            </div>
            {/* <div className="mt-6 sm:mt-8">
              <Button className="w-full h-11 sm:h-12 bg-blue-600 text-white flex items-center justify-center gap-2 rounded-full sm:rounded-xl">
                <Search className="h-4 w-4" />
                <span>Find a Ride</span>
              </Button>
            </div> */}
          </div>

          {/* Right: Map image */}
          <div className="md:w-[600px] lg:w-[600px] rounded-lg overflow-hidden self-stretch">
            <img
              src="/map5.png"
              alt="Route map across Ireland"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
