"use client";

import Image from "next/image";
import { SectionHeader } from "../ui/section-header";
import { TransferSearchCard } from "./transfer-search-card";
import { TransferStatsRow } from "./transfer-stats-row";

export default function TransfersHero() {
  return (
    <section className="relative min-h-[100vh] md:min-h-[100vh] flex items-center justify-center text-white overflow-hidden pt-28 pb-16 md:pb-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/mainPages/TitanicExperience.webp"
          alt="Irish landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/40" />
      </div>
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 flex flex-col items-center text-center gap-6 md:gap-8 relative z-10">
        <div className="w-full max-w-4xl mx-auto">
          <SectionHeader
            isMainHeading={true}
            title={
              <>
                Reliable Private Transfers Across
                <br className="hidden sm:block" />
                <span> Ireland</span>
              </>
            }
            description="Book airport, city-to-city, and private transfers across Ireland with ease."
            titleClassName="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-tight drop-shadow-2xl text-white"
            descriptionClassName="text-sm md:text-base text-white px-4 font-medium drop-shadow-md leading-relaxed mt-4 md:mt-6"
            className="mb-0"
          />
        </div>

        <TransferSearchCard />
        <TransferStatsRow />
      </div>
    </section>
  );
}
