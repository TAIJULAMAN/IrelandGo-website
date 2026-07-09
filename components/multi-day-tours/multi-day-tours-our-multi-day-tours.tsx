"use client";

import { ChevronLeft, ChevronRight, Star, Clock } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useGetAllMultiDayToursQuery } from "@/Redux/features/multi-day-tours/multiDayToursApi";

export default function MultiDayToursOurMultiDayTours() {
  const { data: response, isLoading } = useGetAllMultiDayToursQuery(undefined);
  const tours = response?.data || [];

  const filters = useMemo(() => {
    if (!tours.length) {
      return [
        "All",
        "2 Day Tour",
        "3 Day Tour",
        "4 Day Tour",
        "5 Day Tour",
        "7 Day Tour",
        "11 Day Tour",
      ];
    }
    const days = new Set(tours.map((t: any) => t.tourDays).filter(Boolean));
    const sortedDays = Array.from(days).sort((a: any, b: any) => a - b);
    return ["All", ...sortedDays.map((d) => `${d} Day Tour`)];
  }, [tours]);

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [page, setPage] = useState<number>(0);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return tours;
    const daysMatch = activeFilter.match(/\d+/);
    const days = daysMatch ? parseInt(daysMatch[0], 10) : 0;
    return tours.filter((t: any) => t.tourDays === days);
  }, [activeFilter, tours]);

  const perPage = 3;
  const total = filtered.length;

  const pagedTours = useMemo(() => {
    if (total === 0) return [];
    if (total <= perPage) return filtered;
    const start = (page * perPage) % total;
    const items: typeof filtered = [];
    for (let i = 0; i < Math.min(perPage, total); i++) {
      items.push(filtered[(start + i) % total]);
    }
    return items;
  }, [filtered, page, total]);

  const onPrev = () => {
    if (total === 0) return;
    setPage(
      (p) =>
        (p - 1 + Math.ceil(total / perPage)) %
        Math.max(1, Math.ceil(total / perPage)),
    );
  };
  const onNext = () => {
    if (total === 0) return;
    setPage((p) => (p + 1) % Math.max(1, Math.ceil(total / perPage)));
  };

  const onFilter = (f: string) => {
    setActiveFilter(f);
    setPage(0);
  };

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  };

  return (
    <section className="relative py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-violet-50/40 blur-3xl opacity-50 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Premium Selection</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Our Multi-Day Tours
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover Ireland's most breathtaking destinations with our carefully curated, immersive multi-day trips.
          </p>
        </div>

        {/* Filters and Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-sm">
          
          <button
            onClick={onPrev}
            disabled={total <= perPage}
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${total <= perPage
              ? "border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed opacity-50"
              : "border-gray-200 text-gray-500 bg-white hover:text-blue-600 hover:border-blue-300 hover:shadow-md hover:-translate-x-1"
              }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center justify-center gap-2 flex-wrap flex-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => onFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${activeFilter === f
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={total <= perPage}
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${total <= perPage
              ? "border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed opacity-50"
              : "border-gray-200 text-gray-500 bg-white hover:text-blue-600 hover:border-blue-300 hover:shadow-md hover:translate-x-1"
              }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && pagedTours.length === 0 && (
          <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-lg text-gray-500 font-medium">No tours found for this filter.</p>
            <button onClick={() => onFilter("All")} className="mt-4 px-6 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">View All Tours</button>
          </div>
        )}

        {/* Cards */}
        {!isLoading && pagedTours.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pagedTours.map((t: any) => (
              <Link key={t.id} href={`/multi-day-tours/${t.id}`} className="group h-full outline-none">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-white transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative">
                  
                  {/* Subtle Glow Behind Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <img
                      src={
                        t.images?.[0] ||
                        "https://images.pexels.com/photos/15092338/pexels-photo-15092338.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      }
                      alt={t.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80" />
                    
                    {t.tourDays && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-blue-700 shadow-sm border border-white/20">
                        <Clock className="w-3.5 h-3.5" />
                        {t.tourDays} Day{t.tourDays > 1 ? "s" : ""}
                      </span>
                    )}
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold shadow-sm border border-white/10">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />{" "}
                      {t.ratings || "5.0"}
                    </span>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 line-clamp-2">
                      {t.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 group-hover:text-gray-700 transition-colors">
                      {stripHtml(t.description)}
                    </p>
                    
                    <div className="mt-auto">
                      <button className="w-full px-4 py-3 rounded-xl text-sm font-bold bg-blue-50 text-blue-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Navigation */}
        {!isLoading && pagedTours.length > 0 && total > perPage && (
          <div className="flex md:hidden items-center justify-center gap-6 mt-10">
            <button
              onClick={onPrev}
              disabled={total <= perPage}
              className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${total <= perPage
                ? "border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed opacity-50"
                : "border-gray-200 text-gray-600 bg-white hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95"
                }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNext}
              disabled={total <= perPage}
              className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${total <= perPage
                ? "border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed opacity-50"
                : "border-gray-200 text-gray-600 bg-white hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95"
                }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
