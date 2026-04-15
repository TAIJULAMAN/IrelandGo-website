"use client";

import { Header } from "@/components/common/header";
import Link from "next/link";
import React from "react";

export default function MultiDayToursDetailsHero({ tour }: { tour?: any }) {
  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  };

  const image = tour?.images?.[0] || "/details.png";

  return (
    <>
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[60vh] min-h-[400px] flex flex-col justify-center overflow-hidden">
        {/* Header positioned at top */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* Background image & overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={tour?.title || "Tour image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center mt-12">
          <div className="w-full max-w-4xl text-center">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-md">
              {tour?.title || "Multi-day Tour"}
            </h1>

            {/* Subtitle / Description preview matching the screenshot vibe */}
            <p className="text-white/90 text-sm md:text-lg lg:text-xl font-medium drop-shadow-sm line-clamp-2 max-w-3xl mx-auto">
              {stripHtml(tour?.description) ||
                "Exclusive Private Tour of Ireland taking you across the whole Island."}
            </p>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
              <Link href={`/contact`}>
                <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 text-base md:text-lg">
                  Book Your Tour
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-[28px] font-bold text-slate-800 mb-6 font-sans">
            Tour Overview
          </h2>
          {tour?.description && tour?.description !== "<p></p>" ? (
            <div
              className="text-slate-600 text-[15.5px] leading-relaxed prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: tour.description }}
            />
          ) : (
            <p className="text-slate-600 text-[15.5px] leading-relaxed">
              No detailed overview provided for this tour right now. Please
              contact us for more information.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
