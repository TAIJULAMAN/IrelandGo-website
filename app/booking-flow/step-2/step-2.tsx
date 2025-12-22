"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Luggage, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";

const vehicles = [
  {
    id: 1,
    name: "Sedan",
    price: "$45",
    seats: "4 seats",
    bags: "2 bags",
    image: "/c1.png",
    features: ["Air Conditioning", "Comfortable", "Fuel Efficient"],
  },
  {
    id: 2,
    name: "Compact MPV",
    price: "$55",
    seats: "5 seats",
    bags: "3 bags",
    image: "/c2.png",
    features: ["Spacious", "Family Friendly", "Extra Storage"],
  },
  {
    id: 3,
    name: "Van",
    price: "$65",
    seats: "8 seats",
    bags: "6 bags",
    image: "/c3.png",
    features: ["Large Groups", "Ample Space", "Comfortable Ride"],
  },
  {
    id: 4,
    name: "Luxury Sedan",
    price: "$85",
    seats: "4 seats",
    bags: "2 bags",
    image: "/c4.png",
    features: ["Premium Comfort", "Luxury Interior", "VIP Service"],
  }
];

export default function Step2() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const { clientWidth } = sliderRef.current;
    const amount = direction === "left" ? -clientWidth : clientWidth;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 min-h-screen flex flex-col">
      <Header2 />
      <div className="container mx-auto flex-1 py-10 md:py-16 px-5 md:px-0">
        {/* Step progress */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold shadow-md">
                <Check className="h-5 w-5" />
              </div>
              <span className="font-semibold text-blue-700">Trip Details</span>
            </div>
            <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-blue-500 mx-2 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-sm font-bold shadow-md">
                2
              </div>
              <span className="font-semibold text-blue-700">Choose Vehicle</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-2 rounded-full" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                3
              </div>
              <span>Trip Details</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-2 rounded-full" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                4
              </div>
              <span>Details</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-2 rounded-full" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                5
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 sm:mb-10 mt-6 sm:mt-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-3">
            Choose Your Perfect Vehicle
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Select the vehicle that best suits your journey. All vehicles are well-maintained and come with professional drivers.
          </p>
        </div>

        {/* Vehicle slider */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              <p className="text-sm font-semibold text-gray-700">
                Available Vehicles ({vehicles.length})
              </p>
            </div>

          </div>

          <div
            ref={sliderRef}
            className="vehicle-scroll flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          >
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="snap-start shrink-0 w-[260px] sm:w-[280px] lg:w-[300px]"
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <div
                  className={`bg-white rounded-2xl shadow-lg p-5 flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 ${selectedVehicle === vehicle.id
                    ? "border-blue-600 ring-4 ring-blue-100"
                    : "border-transparent hover:border-blue-300"
                    }`}
                >
                  {/* Selected Badge */}
                  {selectedVehicle === vehicle.id && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Selected
                    </div>
                  )}

                  {/* Vehicle Image */}
                  <div className="mb-5 h-32 sm:h-36 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-3">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="max-h-full w-auto object-contain drop-shadow-lg"
                    />
                  </div>

                  {/* Vehicle Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        {vehicle.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Per trip</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        {vehicle.price}
                      </p>
                    </div>
                  </div>

                  {/* Capacity Info */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{vehicle.seats}</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Luggage className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{vehicle.bags}</span>
                    </span>
                  </div>

                  {/* <p className="text-sm font-semibold text-gray-700 mt-4">Features</p>
                  <div className="space-y-2">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                        <Check className="h-3 w-3 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div> */}

                  {/* Select Button */}
                  <button
                    className={`mt-4 w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${selectedVehicle === vehicle.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                  >
                    {selectedVehicle === vehicle.id ? "Selected" : "Select Vehicle"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next button */}
        <div className="flex justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="px-8 sm:px-10 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-50"
          >
            <Link href="/booking-flow/step-1">Back</Link>
          </Button>
          <Button
            asChild
            disabled={!selectedVehicle}
            className={`px-10 sm:px-12 py-2.5 sm:py-3 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${selectedVehicle
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              : "bg-gray-300 cursor-not-allowed"
              }`}
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
