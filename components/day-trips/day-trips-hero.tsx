"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HeroTabs } from "../common/hero-tabs";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("day-trips");
  const router = useRouter();

  const handleTabClick = (id: string) => {
    if (id === "transfer") {
      router.push("/");
    } else if (id === "hourly") {
      router.push("/by-the-hour");
    } else {
      setActiveTab(id);
    }
  };

  return (
    <section className="relative pt-32 pb-5 md:pt-40 md:pb-5 overflow-hidden bg-white">
      {/* Premium Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1000px] h-[500px] opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-indigo-50 to-transparent blur-[80px] rounded-full mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          {/* <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold tracking-wide mb-6 shadow-sm">
            Curated Experiences
          </span> */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 text-balance leading-tight px-4 drop-shadow-sm">
            Explore Ireland's Wonders in <br/>One Day
          </h1>
          <p className="text-base md:text-lg text-slate-600 mb-4 px-4 font-medium drop-shadow-md">
            Discover over 100+ day trips and private tours with local drivers.
          </p>

          <HeroTabs
            activeTab={activeTab}
            onTabChange={handleTabClick}
            className="flex justify-center mx-auto max-w-md w-full mb-4 "
          />
        </div>

        {/* Premium Bento Image Grid */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Left side: two images vertically */}
          {/* <div className="md:col-span-5 flex flex-col gap-4 md:gap-6 h-full">
            <div
              className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group border border-slate-100"
              style={{ flex: 2, minHeight: "250px" }}
            >
              <Image
                src="/Images/DayTrip.webp"
                alt="Cliffs of Moher Day Trip"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div
              className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group border border-slate-100"
              style={{ flex: 1, minHeight: "150px" }}
            >
              <Image
                src="/Images/Tours.webp"
                alt="Giant's Causeway"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div> */}

          {/* Right side: one big image */}
          {/* <div
            className="md:col-span-7 relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgb(0,0,0,0.08)] group border border-slate-100"
            style={{ minHeight: "400px" }}
          >
            <Image
              src="/Images/Home.webp"
              alt="Ireland Landscape"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
