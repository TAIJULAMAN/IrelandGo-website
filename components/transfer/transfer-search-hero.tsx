"use client";

import { Header } from "@/components/common/header";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function TransferSearchHero() {
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("location") || "";

  const [pickupLocation, setPickupLocation] = useState(locationParam);

  // Get display location for hero title
  const displayLocation = pickupLocation || "Dublin";

  return (
    <section className="relative overflow-hidden min-h-screen text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/transfer-search.jpg"
          alt="Runway at sunset"
          className="w-full h-full object-cover"
        />
      </div>

      <Header />

      <div className="container mx-auto px-5 md:px-0 py-10 md:py-16 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-10 pt-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Private Transfers in {displayLocation}
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Seamless city-to-city and airport transfers across {displayLocation}{" "}
            and beyond.
          </p>
        </div>
      </div>
    </section>
  );
}
