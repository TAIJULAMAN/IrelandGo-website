"use client";

import { Header } from "../common/header";
import { MapPin, Compass, Navigation, Bus } from "lucide-react";

export default function MultiDayToursHero() {
  return (
    <section className="relative text-white overflow-hidden pb-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/about.avif"
          alt="Touring the Irish landscape"
          className="w-full h-full object-cover animate-in zoom-in-105 duration-1000 ease-out"
        />
      </div>

      <div className="relative z-10">
        <Header />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-5 md:px-0 lg:px-0 flex flex-col items-center justify-center text-center gap-6 pt-10">
        {/* Main Content */}
        <div className="space-y-4 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-2xl">
            Multi-Day Tours
            <br />
            <span className="text-transparent bg-clip-text bg-blue-500">
              Across Ireland
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow-md">
            Experience the best of Ireland&apos;s scenic routes, from sweeping
            coastlines to the historic countryside, on a private and fully
            guided journey.
          </p>
        </div>

        {/* Stats Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
          {[
            { value: "50+", label: "Unique Itineraries", icon: Compass },
            { value: "Local", label: "Expert Tour Guides", icon: Navigation },
            { value: "Private", label: "Luxury Transport", icon: Bus },
            { value: "1000+", label: "Happy Travelers", icon: MapPin },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-black/1 backdrop-blur-md border border-white/20 transition-all hover:-translate-y-1 shadow-lg"
            >
              <stat.icon className="w-6 h-6 text-green-400 mb-3 opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all" />
              <span className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight drop-shadow-md">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-green-100/90 uppercase tracking-widest text-center drop-shadow-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
