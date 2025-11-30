"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const tours = [
  {
    days: 2,
    title: "Ring of Kerry Adventure",
    desc: "Explore Ireland's most scenic drive with stunning mountains and coastal views",
    price: 450,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/15092338/pexels-photo-15092338.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    days: 4,
    title: "Wild Atlantic Way",
    desc: "Journey along Ireland's rugged western coastline and experience dramatic landscapes",
    price: 750,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/17574921/pexels-photo-17574921.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    days: 3,
    title: "Dublin to Galway Explorer",
    desc: "Cross Ireland from capital to coast, visiting historic sites and charming towns",
    price: 620,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function MultiDayToursOurMultiDayTours() {
  const filters = [
    "2 Day Tour",
    "3 Day Tour",
    "4 Day Tour",
    "5 Day Tour",
    "6 Day Tour",
  ];
  const [activeFilter, setActiveFilter] = useState<string>(filters[0]);
  const [page, setPage] = useState<number>(0);

  const filtered = useMemo(() => {
    const days = parseInt(activeFilter, 10);
    return tours.filter((t) => t.days === days);
  }, [activeFilter]);

  const perPage = 3;
  const total = filtered.length || tours.length;
  const source = filtered.length ? filtered : tours;

  const pagedTours = useMemo(() => {
    if (source.length <= perPage) return source;
    const start = (page * perPage) % source.length;
    const items: typeof source = [] as any;
    for (let i = 0; i < Math.min(perPage, source.length); i++) {
      items.push(source[(start + i) % source.length]);
    }
    return items;
  }, [source, page]);

  const onPrev = () =>
    setPage(
      (p) =>
        (p - 1 + Math.ceil(total / perPage)) %
        Math.max(1, Math.ceil(total / perPage))
    );
  const onNext = () =>
    setPage((p) => (p + 1) % Math.max(1, Math.ceil(total / perPage)));

  const onFilter = (f: string) => {
    setActiveFilter(f);
    setPage(0);
  };

  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onPrev}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center flex-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Our Multi-day tours
            </h2>
            <p className="text-slate-600 mt-1">
              Discover Ireland's most breathtaking destinations with our
              carefully curated multi-day experiences
            </p>
          </div>
          <button
            onClick={onNext}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                activeFilter === f
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link href="/day-trips/day-trip-details">
            {pagedTours.map((t) => (
              <div
                key={t.title}
                className="bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-200"
              >
                <div className="relative h-44">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute left-3 top-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                    {t.days} Day{t.days > 1 ? "s" : ""}
                  </span>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 text-slate-800 text-xs font-medium">
                    <Star className="w-3.5 h-3.5 text-amber-500" /> {t.rating}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900">{t.title}</h3>
                  <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                    {t.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-blue-700 font-bold">€{t.price}</div>
                    <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Link>
        </div>
      </div>
    </section>
  );
}
