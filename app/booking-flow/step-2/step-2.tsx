"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Luggage, ChevronLeft, ChevronRight } from "lucide-react";
import { Header2 } from "@/components/Header2";
import { Footer } from "@/components/layout/footer";

const vehicles = [
  {
    id: 1,
    name: "Sedan",
    price: "$45",
    seats: "4 seats",
    bags: "2 bags",
    image: "/c1.png",
  },
  {
    id: 2,
    name: "Compact MPV",
    price: "$55",
    seats: "5 seats",
    bags: "3 bags",
    image: "/c2.png",
  },
  {
    id: 3,
    name: "Van",
    price: "$65",
    seats: "8 seats",
    bags: "6 bags",
    image: "/c3.png",
  },
  {
    id: 4,
    name: "Luxury Sedan",
    price: "$85",
    seats: "4 seats",
    bags: "2 bags",
    image: "/c4.png",
  },
  {
    id: 5,
    name: "Sedan",
    price: "$45",
    seats: "4 seats",
    bags: "2 bags",
    image: "/c1.png",
  },
  {
    id: 6,
    name: "Compact MPV",
    price: "$55",
    seats: "5 seats",
    bags: "3 bags",
    image: "/c2.png",
  },
  {
    id: 7,
    name: "Van",
    price: "$65",
    seats: "8 seats",
    bags: "6 bags",
    image: "/c3.png",
  },
  {
    id: 8,
    name: "Luxury Sedan",
    price: "$85",
    seats: "4 seats",
    bags: "2 bags",
    image: "/c4.png",
  },
  {
    id: 9,
    name: "Sedan",
    price: "$45",
    seats: "4 seats",
    bags: "2 bags",
    image: "/c1.png",
  },
];

export default function Step2() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const { clientWidth } = sliderRef.current;
    const amount = direction === "left" ? -clientWidth : clientWidth;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

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
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold">
                2
              </div>
              <span>Choose Vehicle</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                3
              </div>
              <span>Trip Details</span>
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
            Step 2: Choose Vehicle
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl">
            Select your preferred vehicle for your journey.
          </p>
        </div>

        {/* Vehicle slider */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-gray-500">
              Browse and select the vehicle that best fits your trip.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            className="vehicle-scroll flex gap-4 sm:gap-5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
          >
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="snap-start shrink-0 w-[220px] sm:w-[240px] lg:w-[260px]"
              >
                <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="mb-4 h-28 sm:h-32 flex items-center justify-center">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      {vehicle.name}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-blue-600">
                      {vehicle.price}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {vehicle.seats}
                    </span>
                    <span className="flex items-center gap-1">
                      <Luggage className="h-3 w-3" />
                      {vehicle.bags}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next button */}
        <div className="flex justify-center">
          <Button
            asChild
            className="px-10 sm:px-12 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg"
          >
            <Link href="/booking-flow/step-3">Next: Add Stops</Link>
          </Button>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .vehicle-scroll {
          scrollbar-width: none;
        }

        .vehicle-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
