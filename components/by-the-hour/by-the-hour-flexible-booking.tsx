"use client";

import { Headphones, BadgeCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function ByTheHourFlexibleBooking() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section className="relative w-full py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left: Image Card */}
        <div className="w-full order-2 md:order-1 relative group">
          {/* Subtle offset backdrop layer */}
          <div className="absolute -inset-4 bg-gradient-to-tl from-blue-100 to-indigo-50 rounded-[2rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500 opacity-70"></div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 aspect-square md:aspect-[4/3] bg-white z-10">
            <Image
              src="/flexible.jpg"
              alt="Booking on mobile"
              fill
              className="object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Dark gradient overlay for a premium cinematic look */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          </div>
        </div>

        {/* Right: Content */}
        <div className="order-1 md:order-2 space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Simple and <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">flexible booking</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              We make it incredibly easy to secure your travel arrangements, backed by reliable support whenever you need it.
            </p>
          </div>

          <ul className="space-y-5">
            <li className="flex items-center gap-4 group cursor-default">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                <Headphones className="w-6 h-6" />
              </span>
              <span className="text-lg text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                24/7 customer support.
              </span>
            </li>
            <li className="flex items-center gap-4 group cursor-default">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                <BadgeCheck className="w-6 h-6" />
              </span>
              <span className="text-lg text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                Flexible cancellation policy.
              </span>
            </li>
            <li className="flex items-center gap-4 group cursor-default">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                <Zap className="w-6 h-6" />
              </span>
              <span className="text-lg text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                Instant online booking.
              </span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
