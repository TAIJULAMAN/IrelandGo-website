"use client";

import { Header } from "../common/header";

import { Search, MapPin, Compass } from "lucide-react";

export default function MultiDayToursHero() {
  return (
    <section className="relative min-h-[700px] text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/ireland-hero-bg.jpg"
          alt="Irish landscape"
          className="w-full h-full object-cover"
        />

      </div>

      <Header />

      <div className="max-w-6xl mx-auto px-5 pt-16 pb-16 flex flex-col items-center text-center gap-10">
        <div className="space-y-4 mt-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-blue-500">
            Multi-Day Tours
            <br className="hidden sm:block" />
            <span className="text-white"> Across Ireland</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/85">
            Experience the best of Ireland&apos;s scenic routes, from coast to
            countryside, on a private and comfortable journey.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden flex items-stretch">
          <div className="flex items-center flex-1 px-4 sm:px-5 py-3 sm:py-3.5 gap-3">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Where would you like to go?"
              className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-800 placeholder:text-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-blue-600 text-white text-sm sm:text-base font-semibold whitespace-nowrap">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Find Your Tour</span>
          </button>
        </div>

        {/* Browse Popular Tours button */}
        <button className="mt-4 inline-flex items-center gap-3 px-6 sm:px-8 py-2.5 rounded-lg border border-white/40 bg-white/10 backdrop-blur-md text-sm sm:text-base font-medium text-white hover:bg-white/15 transition">
          <span className="w-6 h-6 rounded-lg flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </span>
          <span>Browse Popular Tours</span>
        </button>

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
