"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
    <section className="py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onPrev}
            disabled={total <= perPage}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${total <= perPage
                ? "border-slate-200 text-slate-300 cursor-not-allowed"
                : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
          >
            <ChevronLeft className="w-9 h-9" />
          </button>
          <div className="text-center flex-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Our Multi-day tours
            </h2>
            <p className="text-slate-600 mt-1">
              Discover Ireland's most breathtaking destinations with our
              carefully curated day trips.
            </p>
          </div>
          <button
            onClick={onNext}
            disabled={total <= perPage}
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${total <= perPage
                ? "border-slate-200 text-slate-300 cursor-not-allowed"
                : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
          >
            <ChevronRight className="w-9 h-9" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${activeFilter === f
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-10 text-slate-500">
            Loading tours...
          </div>
        )}

        {/* Empty State */}
        {!isLoading && pagedTours.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            No tours found.
          </div>
        )}

        {/* Cards */}
        {!isLoading && pagedTours.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pagedTours.map((t: any) => (
              <Link key={t.id} href={`/multi-day-tours/${t.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-200 h-full flex flex-col hover:shadow-lg transition-shadow">
                  <div className="relative h-44">
                    <img
                      src={
                        t.images?.[0] ||
                        "https://images.pexels.com/photos/15092338/pexels-photo-15092338.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      }
                      alt={t.title}
                      className="w-full h-full object-cover"
                    />
                    {t.tourDays && (
                      <span className="absolute left-3 top-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                        {t.tourDays} Day{t.tourDays > 1 ? "s" : ""}
                      </span>
                    )}
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 text-slate-800 text-xs font-medium">
                      <Star className="w-3.5 h-3.5 text-amber-500" />{" "}
                      {t.ratings || "0"}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-slate-900">{t.title}</h3>
                    <p className="text-slate-600 text-sm mt-1 line-clamp-2 flex-1">
                      {stripHtml(t.description)}
                    </p>
                    <div className="mt-5">
                      <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
