import Link from "next/link";
import Image from "next/image";
import { Star, Clock, ArrowRight } from "lucide-react";

interface PopularMultiDayTourCardProps {
  tour: any;
  idx?: number;
}

export default function PopularMultiDayTourCard({ tour, idx }: PopularMultiDayTourCardProps) {
  const stripHtml = (html: string) => {
    return html?.replace(/<[^>]*>?/gm, "") || "";
  };

  return (
    <div className="card-theme group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      <div className="card-image-wrapper z-10">
        <Image
          src={tour.images?.[0] || "/placeholder.svg"}
          alt={tour.title || "Tour Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60" />

        {tour.tourDays && (
          <span className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/95 backdrop-blur-md text-blue-700 shadow-sm border border-white/20 z-20">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {tour.tourDays} Day{tour.tourDays > 1 ? "s" : ""}
          </span>
        )}
        <span className="absolute right-2.5 bottom-2.5 sm:bottom-auto sm:top-3 sm:right-3 inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-gray-900/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold shadow-sm border border-white/10 z-20">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-yellow-400" />{" "}
          {tour.ratings || "5.0"}
        </span>
      </div>

      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 relative z-10 justify-between gap-2 sm:gap-3">
        <div>
          <h3 className="text-xs sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
            {tour.title}
          </h3>
          <p className="text-[11px] sm:text-sm text-gray-500 mb-2 sm:mb-3 line-clamp-1 sm:line-clamp-2 leading-relaxed min-h-0 sm:min-h-[2.5rem]">
            {stripHtml(tour.description)}
          </p>
        </div>

        <div className="mt-auto pt-1 sm:pt-2">
          <Link href={`/multi-day-tours/${tour.id}`} className="block w-full">
            <div className="btn-theme-primary w-full !h-8.5 sm:!h-11 text-xs sm:text-base group/btn">
              <span className="tracking-wide">View Details</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
