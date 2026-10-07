import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ArrowRight } from "lucide-react";

interface TripCardProps {
  trip: any;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Link href={`/day-trips/details/${trip.id}`} className="card-theme group">
      {/* Subtle Glow Behind Card */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      <div className="card-image-wrapper z-10">
        <Image
          src={
            trip.images?.[0] ||
            "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          alt={trip.title || "Trip Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-1 relative z-10 justify-between">
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
            {trip.title}
          </h3>
          <div
            className="text-[11px] sm:text-sm text-gray-500 mb-2 sm:mb-3 line-clamp-2 leading-relaxed min-h-0 sm:min-h-[2.5rem]"
            dangerouslySetInnerHTML={{ __html: trip.description }}
          />
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            {trip.travelTimeMinutes && (
              <span className="card-badge text-[10px] sm:text-xs lg:text-lg whitespace-nowrap shrink-0">
                <Clock className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 shrink-0" />
                {Math.floor(trip.travelTimeMinutes / 60) > 0 ? (
                  <span>
                    {Math.floor(trip.travelTimeMinutes / 60)}h
                    {trip.travelTimeMinutes % 60 > 0 && (
                      <span className="hidden sm:inline">
                        {" "}
                        {trip.travelTimeMinutes % 60}m
                      </span>
                    )}
                  </span>
                ) : (
                  <span>{trip.travelTimeMinutes % 60}m</span>
                )}
              </span>
            )}
            {trip.groupType && (
              <span className="card-badge-indigo text-[10px] sm:text-xs lg:text-lg whitespace-nowrap shrink-0">
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
            <span className="text-blue-600 font-extrabold text-sm sm:text-lg">
              €
              {trip.price ??
                (trip.vehicles?.length
                  ? Math.min(...trip.vehicles.map((v: any) => v.price))
                  : 0)}
            </span>
          </div>
          <div className="btn-theme-primary w-full group/btn text-[11px] sm:text-sm">
            <span className="tracking-wide">View Details</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
