import Link from "next/link";
import Image from "next/image";
import { Clock, Route, ArrowRight } from "lucide-react";

interface PrivateTransferCardProps {
  transfer: any;
  idx?: number;
}

export default function PrivateTransferCard({
  transfer,
  idx,
}: PrivateTransferCardProps) {
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      <div className="card-image-wrapper z-10">
        <Image
          src={transfer.images?.[0] || "/placeholder.svg"}
          alt={`${transfer.from} to ${transfer.to}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 relative z-10 justify-between gap-3">
        <div>
          <div className="mb-2 sm:mb-3">
            <h3
              className="font-bold text-gray-900 text-sm sm:text-base md:text-lg group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight"
              title={`${transfer.from} to ${transfer.to}`}
            >
              {transfer.from}
              <ArrowRight className="inline-block w-4 h-4 sm:w-5 sm:h-5 mx-1.5 text-gray-400" />
              {transfer.to}
            </h3>
          </div>

          <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4">
            <span className="card-badge text-[6px] sm:text-xs whitespace-nowrap shrink-0">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              {renderDuration(transfer.travelTimeMinutes)}
            </span>
            <span className="card-badge-indigo text-[6px] sm:text-xs whitespace-nowrap shrink-0">
              <Route className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              {transfer.distanceKm} km
            </span>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <Link
            href={`/transfers/${(transfer.from || "dublin").toLowerCase().replace(/\s+/g, "-")}-to-${(transfer.to || "destination").toLowerCase().replace(/\s+/g, "-")}/`}
            onClick={() => {
              try {
                sessionStorage.setItem(
                  "current_transfer_route",
                  JSON.stringify(transfer),
                );
              } catch (e) {}
            }}
            className="btn-theme-primary w-full group/btn"
          >
            <span className="tracking-wide">Book Now</span>
            <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
