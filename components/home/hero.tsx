"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FeatureBadges } from "../common/feature-badges";
import { HeroTabs } from "../common/hero-tabs";
import { BookingForm } from "./booking-form";

export function Hero() {
  const [activeTab, setActiveTab] = useState("transfer");
  const router = useRouter();

  const handleTabClick = (id: string) => {
    if (id === "hourly") {
      router.push("/by-the-hour");
    } else if (id === "day-trips") {
      router.push("/day-trips");
    } else {
      setActiveTab(id);
    }
  };

  return (
    <section className="relative w-full pt-24 md:pt-28 lg:pt-32 pb-14 md:pb-18 lg:pb-20 min-h-[100vh] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Images/Home.webp"
          alt="Irish landscape"
          fill
          priority
          fetchPriority="high"
          quality={60}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/85 via-blue-900/40 to-blue-950/60" />
        {/* <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none" /> */}
      </div>
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 text-balance leading-tight px-4 drop-shadow-sm">
            Comfortable car transfers in Ireland
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-4 px-4 font-medium drop-shadow-md">
            Book private transfers and day tours with professional drivers.
          </p>
        </div>
        <HeroTabs
          activeTab={activeTab}
          onTabChange={handleTabClick}
          className="flex justify-center mb-4 w-full"
        />

        <div>
          <BookingForm activeTab={activeTab} />
          <FeatureBadges />
        </div>
      </div>
    </section>
  );
}
