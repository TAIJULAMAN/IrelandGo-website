"use client";

import { Header2 } from "@/components/common/Header2";
import { Clock, PlaneTakeoff, Star, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function JourneyDetailsHero() {
  return (
    <section className="relative bg-linear-to-b from-blue-50/50 to-white pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <Header2 />

      <div className="container mx-auto px-5 sm:px-5 lg:px-0 py-10 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-10 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium">
                <Image src="/i.png" alt="" width={16} height={16} className="w-4 h-4 object-contain" />
                <span>Premium Airport Transfer</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Dublin Airport <span className="text-gray-400 font-light">to</span> <span className="text-blue-600">Galway</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Experience a seamless, comfortable, and direct transfer from Dublin Airport straight to Galway City Center. Enjoy complimentary Wi-Fi, ample luggage space, and professional service.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
                <Clock className="h-5 w-5 text-blue-500 mb-2" />
                <div className="font-semibold text-gray-900">2h 30m</div>
                <div className="text-xs text-gray-500">Est. Duration</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
                <PlaneTakeoff className="h-5 w-5 text-emerald-500 mb-2" />
                <div className="font-semibold text-gray-900">Direct</div>
                <div className="text-xs text-gray-500">Non-stop Route</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow sm:col-span-1 col-span-2">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900">4.9</span>
                </div>
                <div className="text-xs text-gray-500">Customer Rating</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Professional Drivers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:h-[500px]">
            <div className="absolute inset-0 bg-blue-600/5 rounded-3xl transform rotate-3 scale-105" />
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-gray-100">
              <img
                src="/hero2.png"
                alt="Scenic route from Dublin to Galway"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Popular Route</p>
                    <p className="text-xs text-gray-500">Booked 1.2k+ times this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
