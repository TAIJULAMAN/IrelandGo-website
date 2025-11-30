"use client";

import Link from "next/link";
import { Header } from "../header";
import { Search, MapPin, Compass } from "lucide-react";

export default function AirportTransfersHero() {
  return (
    <section className="relative min-h-[700px] text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/airport.png"
          alt="Irish landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      </div>

      <Header />

      <div className="max-w-6xl mx-auto px-5 pt-16 pb-16 flex flex-col items-center text-center gap-10">
        <div className="space-y-4 mt-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">
            Reliable Airport Transfers
            <br className="hidden sm:block" />
            <span className="text-white"> Across Ireland</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/85">
            Book seamless transfers to and from Ireland's major airports.
          </p>
        </div>

        {/* Search card */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl px-4 sm:px-6 py-6 flex flex-col gap-3 text-left">
          {/* Top row: input + button */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="flex items-center flex-1 border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your departure city or destination"
                className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-800 placeholder:text-gray-400"
              />
            </div>
            <Link href="/airport-transfers/transfer-routes" className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold whitespace-nowrap shadow-md">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span>Find Airport Transfers</span>
            </Link>
          </div>

          {/* Bottom row: popular routes */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 mt-1">
            <span className="font-medium text-gray-700">Popular routes:</span>
            <button className="text-blue-600 hover:underline">Shannon Airport</button>
            <button className="text-blue-600 hover:underline">Dublin Airport</button>
            <button className="text-blue-600 hover:underline">Cork Airport</button>
            <button className="text-blue-600 hover:underline">Knock Airport</button>
            <button className="text-blue-600 hover:underline">Kerry Airport</button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-4 text-sm sm:text-base">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              50+
            </span>
            <span className="text-white/80">Multi-day Tours</span>
          </div>
          <div className="w-1 h-12 bg-white rounded-full" />
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              1000+
            </span>
            <span className="text-white/80">Happy Travelers</span>
          </div>
          <div className="w-1 h-12 bg-white rounded-full" />
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              15+
            </span>
            <span className="text-white/80">Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
