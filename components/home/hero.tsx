"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FeatureBadges } from "../common/feature-badges";
import { HeroTabs } from "../common/hero-tabs";
import { BookingForm } from "./booking-form";
import { SectionHeader } from "@/components/ui/section-header";

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
    <section className="relative w-full pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-16 lg:pb-20 min-h-[100vh] flex flex-col justify-start overflow-hidden">
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
      </div>
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-8 relative z-10">
        <SectionHeader
          title="Comfortable car transfers in Ireland"
          description="Book private transfers and day tours with professional drivers."
          isMainHeading={true}
          className="mb-6 md:mb-8"
          titleClassName="text-white text-balance leading-tight px-4 drop-shadow-sm"
          descriptionClassName="text-white/90 px-4 font-medium drop-shadow-md text-base md:text-lg"
        />
        <HeroTabs
          activeTab={activeTab}
          onTabChange={handleTabClick}
          className="flex justify-center mb-4 w-full"
        />

        <div className="relative z-20">
          <BookingForm activeTab={activeTab} />
        </div>

        <FeatureBadges />
      </div>
    </section>
  );
}
