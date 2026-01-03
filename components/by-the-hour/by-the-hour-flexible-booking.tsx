"use client";

import { Headphones, BadgeCheck, Zap } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ByTheHourFlexibleBooking() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <section className="relative w-full py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Image Card */}
        <div className="w-full order-2 md:order-1">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 aspect-square md:aspect-[4/3] group">
            <Image
              src="https://images.pexels.com/photos/5052855/pexels-photo-5052855.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Booking on mobile"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
        </div>

        {/* Right: Content */}
        <div className="order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
            Simple and flexible booking
          </h2>

          <ul className="space-y-6 mb-10">
            <li className="flex items-center gap-4 group">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Headphones className="w-6 h-6" />
              </span>
              <span className="text-lg text-gray-700 font-medium">24/7 customer support</span>
            </li>
            <li className="flex items-center gap-4 group">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <BadgeCheck className="w-6 h-6" />
              </span>
              <span className="text-lg text-gray-700 font-medium">Free cancellation</span>
            </li>
            <li className="flex items-center gap-4 group">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Zap className="w-6 h-6" />
              </span>
              <span className="text-lg text-gray-700 font-medium">Instant online booking</span>
            </li>
          </ul>

          <Button
            onClick={scrollToTop}
            size="lg"
            className="bg-blue-600 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all text-base px-8 h-12"
          >
            Plan Your Trip
          </Button>
        </div>
      </div>
    </section>
  );
}
