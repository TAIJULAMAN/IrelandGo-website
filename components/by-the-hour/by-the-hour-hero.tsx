"use client";

import { useState } from "react";
import Image from "next/image";
import { HeroTabs } from "../common/hero-tabs";
import { useRouter } from "next/navigation";
import { FeatureBadges } from "../common/feature-badges";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SectionHeader } from "@/components/ui/section-header";
import { HeroSearchForm } from "./hero-search-form";

export default function ByTheHourHero() {
  const [activeTab, setActiveTab] = useState("hourly");
  const router = useRouter();

  const handleTabClick = (id: string) => {
    if (id === "transfer") {
      router.push("/");
    } else if (id === "day-trips") {
      router.push("/day-trips");
    } else {
      setActiveTab(id);
    }
  };

  return (
    <TooltipProvider>
      <section className="relative overflow-hidden min-h-[100vh] md:min-h-[100vh] flex flex-col justify-start pt-32 md:pt-40 lg:pt-48 pb-14 md:pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/mainPages/cork2.webp"
            alt="Irish landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/10" />
        </div>
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-5 s text-center flex flex-col items-center">
            <div className="w-full max-w-4xl  mb-3 md:mb-6">
              <SectionHeader
                isMainHeading={true}
                title="Book a Private Driver by the Hour – Travel Your Way"
                className="mb-2 md:mb-8"
                titleClassName="text-white text-center"
                descriptionClassName="text-white text-center !mb-2 sm:!mb-6"
                description="Discover over 100+ day trips and private tours with local drivers."
                alignment="center"
              />
            </div>
            <HeroTabs
              activeTab={activeTab}
              onTabChange={handleTabClick}
              className="flex justify-start md:justify-center mb-4 overflow-x-auto scrollbar-hide scroll-smooth w-full pb-2 -mx-4 px-4 md:mx-0 md:px-0"
            />

            <HeroSearchForm />

            <div className="w-full mt-2">
              <FeatureBadges />
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
