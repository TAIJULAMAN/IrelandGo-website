"use client";

import { Header2 } from "@/components/Header2";
import { Clock, PlaneTakeoff, Star } from "lucide-react";

export default function JourneyDetailsHero() {
  return (
    <section className="bg-blue-50">
      <Header2 />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-stretch gap-6 p-5 sm:p-6 md:p-8">
          {/* Text content */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm font-medium text-blue-600 flex items-center gap-1.5">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs">
                  ✈
                </span>
                Airport Transfer
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
                Dublin Airport to Galway
              </h1>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl">
                Comfortable, direct transfer from Dublin Airport to Galway City
                Center.Comfortable, direct transfer from Dublin Airport to
                Galway City Center.Comfortable, direct transfer from Dublin
                Airport to Galway City Center.Comfortable, direct transfer from
                Dublin Airport to Galway City Center.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 text-xs sm:text-sm text-gray-700">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1">
                <Clock className="h-3.5 w-3.5 text-gray-500" />
                <span>2h 30min journey</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1">
                <PlaneTakeoff className="h-3.5 w-3.5 text-blue-500" />
                <span>Direct route</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1">
                <Star className="h-3.5 w-3.5 text-emerald-500" />
                <span>4.9 rating</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="md:min-w-[600px] lg:w-[320px] rounded-xl overflow-hidden self-stretch">
            <img
              src="/hero2.png"
              alt="Road from Dublin to Galway"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
