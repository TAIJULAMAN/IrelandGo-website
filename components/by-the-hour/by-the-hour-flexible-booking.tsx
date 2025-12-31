"use client";

import { Headphones, BadgeCheck, Zap } from "lucide-react";

export default function ByTheHourFlexibleBooking() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <section className="relative w-full py-16 md:py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Image Card */}
        <div className="w-full">
          <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 max-w-xl">
            <img
              src="https://images.pexels.com/photos/5052855/pexels-photo-5052855.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Booking on mobile"
              className="w-full h-[260px] sm:h-[300px] md:h-[340px] object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
            Simple and flexible booking
          </h2>

          <ul className="space-y-4 mb-7">
            <li className="flex items-start gap-3 text-slate-700">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                <Headphones className="w-4 h-4" />
              </span>
              <span className="mt-0.5">24/7 customer support</span>
            </li>
            <li className="flex items-start gap-3 text-slate-700">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                <BadgeCheck className="w-4 h-4" />
              </span>
              <span className="mt-0.5">Free cancellation</span>
            </li>
            <li className="flex items-start gap-3 text-slate-700">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                <Zap className="w-4 h-4" />
              </span>
              <span className="mt-0.5">Instant online booking</span>
            </li>
          </ul>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">
            Plan Your Trip
          </button>
        </div>
      </div>
    </section>
  );
}
