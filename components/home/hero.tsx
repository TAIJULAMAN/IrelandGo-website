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
    <section className="relative w-full pt-24 md:pt-28 lg:pt-36 pb-20">
      <div className="absolute top-0 left-0 w-full h-[57vh] z-0" style={{ position: "absolute" }}>
        <Image
          src="/Images/Home.webp"
          alt="Irish landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/10" />
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
          className="flex justify-start md:justify-center mb-4 overflow-x-auto scrollbar-hide scroll-smooth w-full pb-2 -mx-4 px-4 md:mx-0 md:px-0"
        />
        <div>
          <BookingForm activeTab={activeTab} />
          <FeatureBadges />
        </div>
      </div>
    </section>
  );
}
