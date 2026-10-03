"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "../ui/section-header";

export default function DreamTour() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#111c3a] to-indigo-950 opacity-95 z-0" />
        <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[120px] z-0 mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[120px] z-0 mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center text-white">
        <SectionHeader
          title="Ready to Plan Your Journey?"
          description="Tell us where you need to go, and we'll arrange a transfer that suits your schedule and travel needs. Whether it's city-to-city, airport, or private travel, Tourenzo ensures a smooth and comfortable journey every time."
          titleClassName="text-white drop-shadow-md"
          descriptionClassName="text-blue-100/80 font-medium max-w-3xl mx-auto"
          className="mb-10"
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-7 bg-white text-blue-700 text-base font-bold shadow-[0_0_40px_rgb(59,130,246,0.3)] w-full sm:w-auto overflow-hidden"
          >
            <Link href="/contact">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white via-blue-50 to-white opacity-0"></span>
              <CalendarDays className="h-5 w-5 relative z-10 text-white" />
              <span className="relative z-10 text-white">
                Book Your Transfer Now
              </span>
              <ArrowRight className="h-5 w-5 relative z-10 text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
