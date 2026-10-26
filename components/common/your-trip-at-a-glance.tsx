"use client";

import {
  Clock,
  Route,
  MapPin,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Car,
  Wine,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface YourTripAtAGlanceProps {
  pickup: string;
  dropoff: string;
  duration?: number | string | null;
  distance?: number | string | null;
  estimatedPrice?: number | null;
  stops?: Array<{ name: string; duration?: string; image?: string }>;
  ctaHref?: string;
  onCtaClick?: () => void;
  serviceType?: string;
  compact?: boolean;
}

export function YourTripAtAGlance({
  pickup,
  dropoff,
  duration,
  distance,
  estimatedPrice,
  stops = [],
  ctaHref,
  onCtaClick,
  serviceType = "TRANSFER",
  compact = false,
}: YourTripAtAGlanceProps) {
  const formatDuration = (val?: number | string | null) => {
    if (!val) return "2h 15m";
    if (typeof val === "string") return val;
    const hours = Math.floor(val / 60);
    const mins = val % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`.trim();
    }
    return `${mins}m`;
  };

  const inclusions = [
    "Door-to-door pickup & dropoff at any address",
    "Professional English-speaking local chauffeur",
    "Bottled water & luggage assistance included",
    "All highway tolls, fuel, and taxes included",
    "Free cancellation up to 24 hours before pickup",
  ];

  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
              Overview
            </span>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              Your Trip at a Glance
            </h3>
          </div>
        </div>
        {estimatedPrice && (
          <div className="text-right">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
              From
            </span>
            <span className="text-lg font-extrabold text-blue-600 font-mono">
              €{estimatedPrice}
            </span>
          </div>
        )}
      </div>

      {/* Route Timeline */}
      <div className="py-5 relative">
        <div className="space-y-4">
          {/* Pickup */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0 mt-0.5" />
              <div className="w-0.5 h-10 bg-gradient-to-b from-emerald-500 to-blue-500 my-1" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Pickup
              </span>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {pickup || "Your specified address or hotel"}
              </p>
            </div>
          </div>

          {/* Stops if any */}
          {stops.length > 0 && (
            <div className="flex items-start gap-3 relative pl-0.5">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100 shrink-0 mt-0.5" />
                <div className="w-0.5 h-10 bg-gradient-to-b from-amber-500 to-blue-600 my-1" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                  Sightseeing Stops ({stops.length})
                </span>
                <p className="text-xs text-gray-700">
                  {stops.map((s) => s.name).join(" • ")}
                </p>
              </div>
            </div>
          )}

          {/* Dropoff */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100 shrink-0 mt-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Destination
              </span>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {dropoff || "Direct to your destination address"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Pill */}
        <div className="grid grid-cols-2 gap-2 mt-5 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-[10px] text-gray-500 block uppercase">
                Est. Duration
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-800">
                {formatDuration(duration)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <Route className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="text-[10px] text-gray-500 block uppercase">
                Total Distance
              </span>
              <span className="text-xs sm:text-sm font-bold text-gray-800">
                {distance ? `${distance} km` : "Direct route"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Inclusions Checklist */}
      <div className="pt-4 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
          What is included
        </h4>
        <ul className="space-y-2">
          {inclusions.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 text-xs text-gray-600"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA */}
      {(ctaHref || onCtaClick) && (
        <div className="pt-5 mt-4 border-t border-gray-100">
          {ctaHref ? (
            <Link href={ctaHref} className="block w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-11 flex items-center justify-center gap-2 shadow-sm transition-all group">
                <span>Book This Route</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            <Button
              onClick={onCtaClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-11 flex items-center justify-center gap-2 shadow-sm transition-all group"
            >
              <span>Book This Route</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
