import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PopularDayTripCardProps {
  trip: any;
  idx?: number;
}

export default function PopularDayTripCard({
  trip,
  idx,
}: PopularDayTripCardProps) {
  const renderDuration = (minutes: number) => {
    if (!minutes && minutes !== 0) return null;
    const totalMinutes =
      typeof minutes === "string" ? parseInt(minutes, 10) : minutes;
    if (isNaN(totalMinutes)) return null;

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0) {
      return (
        <span>
          {hours}h{mins > 0 ? ` ${mins}m` : ""}
        </span>
      );
    }
    return <span>{mins}m</span>;
  };

  return (
    <div className="card-theme group">
      {/* Subtle Glow Behind Card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      <div className="card-image-wrapper z-10">
        <Image
          src={trip.images?.[0] || "/placeholder.svg"}
          alt={trip.to || "Destination"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-70" />
      </div>

      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 relative z-10 justify-between gap-2 sm:gap-3">
        <div>
          <h3 className="text-xs sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
            {trip.from} to {trip.to}
          </h3>

          <p className="text-[11px] sm:text-sm text-gray-500 mb-2 sm:mb-3 line-clamp-1 sm:line-clamp-2 leading-relaxed min-h-0 sm:min-h-[2.5rem]">
            {trip.description?.replace(/<[^>]*>?/gm, "")}
          </p>

          <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="card-badge text-[10px] sm:text-xs lg:text-lg whitespace-nowrap">
              <Clock className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 shrink-0" />
              {renderDuration(trip.travelTimeMinutes)}
            </span>
            {trip.groupType && (
              <span className="card-badge-indigo text-[10px] sm:text-xs lg:text-lg whitespace-nowrap">
                <Users className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 shrink-0" />
                {trip.groupType}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto pt-1 sm:pt-2">
          <div className="flex items-center justify-between mb-2 sm:mb-3 pt-1.5 sm:pt-2 border-t border-gray-100">
            <span className="text-[11px] sm:text-sm font-medium text-gray-500">
              Starts from
            </span>
            <span className="text-blue-600 font-extrabold text-xs sm:text-lg">
              €
              {trip.price ??
                (trip.vehicles?.length
                  ? Math.min(...trip.vehicles.map((v: any) => v.price))
                  : 0)}
            </span>
          </div>

          <Button
            asChild
            className="w-full !h-8 sm:!h-10 text-xs sm:text-sm rounded-lg sm:rounded-xl"
          >
            <Link href={`/day-trips/details/${trip.id}`} className="group/btn">
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
