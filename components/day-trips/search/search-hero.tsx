"use client";

import { Header } from "@/components/common/header";
import { Search } from "lucide-react";

export function SearchHero() {
  return (
    <section className="relative w-full h-[60vh] flex flex-col">
      <Header />
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/day-trips.jpg"
          alt="Search Results"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Explore Ireland's Private Tours
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Browse our curated collection of private transfers and tours across Ireland's most iconic locations.
          </p>

          {/* <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Find your next destination..."
              className="w-full py-5 px-14 rounded-full text-gray-900 text-lg focus:outline-none shadow-2xl bg-white/95 backdrop-blur-sm border-2 border-transparent focus:border-blue-500 transition-all"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
