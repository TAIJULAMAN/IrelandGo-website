"use client";

import Link from "next/link";
import { Clock, MapPin, Info, CheckCircle2 } from "lucide-react";
import { Header2 } from "@/components/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

const stops = [
  {
    id: 1,
    name: "Playa Delfines",
    tag: "Most Popular",
    tagColor: "bg-orange-500",
    duration: "1h 30m",
    price: "$34",
    image: "/stop1.png",
  },
  {
    id: 2,
    name: "Chichen Itza",
    tag: "Recommended",
    tagColor: "bg-blue-600",
    duration: "3h",
    price: "$80",
    image: "/stop2.png",
  },
  {
    id: 3,
    name: "Cenote Dos Ojos",
    tag: "Nature",
    tagColor: "bg-emerald-600",
    duration: "2h",
    price: "$55",
    image: "/stop3.png",
  },
  {
    id: 4,
    name: "Local Market",
    tag: "Culture",
    tagColor: "bg-purple-600",
    duration: "1h 15m",
    price: "$25",
    image: "/stop4.png",
  },
];

export default function Step3() {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <Header2 />

      <div className="flex-1 py-10 sm:py-12 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step progress */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                1
              </div>
              <span>Trip Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                2
              </div>
              <span>Choose Vehicle</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold">
                3
              </div>
              <span>Add Stops</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                4
              </div>
              <span>Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                5
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6 sm:mb-8 mt-4 sm:mt-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
            Step 3: Add Stops
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Select your stops for a fully personalized experience. Choose where
            you want to go, and we'll handle the rest.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 mb-8 lg:mb-10">
          {/* Stops grid */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {stops.map((stop) => (
                <div
                  key={stop.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative h-36 sm:h-40 md:h-44 w-full">
                    <img
                      src={stop.image}
                      alt={stop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`${stop.tagColor} text-white text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full shadow-sm`}
                      >
                        {stop.tag}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 text-lg"
                    >
                      +
                    </button>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                        {stop.name}
                      </h3>
                      <span className="text-sm sm:text-base font-semibold text-blue-600">
                        {stop.price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {stop.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        Stop
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="text-xs sm:text-sm text-gray-500 hover:text-blue-600 font-medium underline-offset-4 hover:underline"
            >
              Skip stop selection
            </button>
          </div>

          {/* Itinerary card */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Itinerary
                </h2>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">9:00 AM – Cancun to Xcaret</p>
                    <p className="text-xs text-gray-500">Departure time</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Pickup & Drop-off</p>
                    <p className="text-xs text-gray-500">Cancun Hotel Zone</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">2 Passengers, MPV</p>
                    <p className="text-xs text-gray-500">Vehicle type</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="h-2 w-2 rounded-full bg-gray-300" />
                  </div>
                  <div>
                    <p className="font-medium">No Stops</p>
                    <p className="text-xs text-gray-500">Add stops above</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-2 space-y-3 text-sm">
                <div className="flex items-center justify-between text-gray-700">
                  <span>Transport</span>
                  <span>$94</span>
                </div>
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <span>Stops</span>
                  <span>$0</span>
                </div>
                <div className="flex items-center justify-between text-gray-900 font-semibold text-base">
                  <span>Total</span>
                  <span>$94</span>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-xl bg-green-50 px-3 py-2 mt-1">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <p className="text-xs text-green-700">
                  Free cancellation up to 24 hours before your pickup time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-gray-100 pt-4 mt-2">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto rounded-lg border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                <Link href="/booking-flow/step-2">Back</Link>
              </Button>
            </div>

            <Button
              asChild
              className="w-full sm:w-auto bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg px-6 py-2.5"
            >
              <Link href="/booking-flow/step-3-details">
                Proceed to Details & Payment
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
