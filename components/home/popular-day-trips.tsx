"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2, Clock, Users } from "lucide-react"
import Link from "next/link"
import Loading from "@/components/common/loading"
import { useGetPopularTripsQuery } from "@/Redux/features/contents/contentsApi"
import { SectionHeader } from "@/components/ui/section-header"

export function PopularDayTrips() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data: response, isLoading, isError } = useGetPopularTripsQuery({})
  const trips = response?.data || []

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins > 0 ? ` ${mins}m` : ""}`
  }

  if (isLoading) {
    return (
      <section className="relative px-5 md:px-0 py-10 md:py-16 bg-gray-50/50 overflow-hidden">
        <Loading />
      </section>
    )
  }

  if (isError || trips.length === 0) return null

  return (
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-10 md:py-12 xl:py-12 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-violet-50/40 blur-3xl opacity-50 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header row with arrows */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-6 md:mb-10 gap-6 relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:-translate-x-1 shrink-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 w-full max-w-3xl mx-auto">
            <SectionHeader
              title="Popular Day Trips"
              subtitle="Explore Ireland"
              description="Discover our most breathtaking day trip destinations, carefully curated for you."
              alignment="center"
              className="mb-0"
            />
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:translate-x-1 shrink-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Horizontal scroll strip */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        >
          {trips.map((trip: any, idx: number) => (
            <div
              key={trip.id || idx}
              className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-white transition-all duration-500 hover:-translate-y-2 flex flex-col snap-start shrink-0 w-[85vw] sm:w-[340px] lg:w-[360px] relative"
            >
              {/* Subtle Glow Behind Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="relative h-40 md:h-48 w-full bg-gray-200 overflow-hidden z-10">
                <img
                  src={trip.images?.[0] || "/placeholder.svg"}
                  alt={trip.to}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-grow relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 line-clamp-2 leading-tight">
                  {trip.from} to {trip.to}
                </h3>

                <p className="text-sm text-gray-600 mb-5 md:mb-6 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {trip.description?.replace(/<[^>]*>?/gm, "")}
                </p>

                <div className="mt-auto">
                  <div className="flex flex-wrap items-center gap-3 mb-5 md:mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold shadow-sm border border-blue-100/50">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDuration(trip.travelTimeMinutes)}
                    </span>
                    {trip.groupType && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold shadow-sm border border-indigo-100/50">
                        <Users className="w-3.5 h-3.5" />
                        {trip.groupType}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="text-2xl md:text-3xl font-extrabold text-blue-600">€{trip.price}</span>
                      <span className="text-xs text-gray-500 font-medium ml-1">per person</span>
                    </div>
                  </div>

                  <Button asChild className="w-full rounded-xl text-sm md:text-base font-bold bg-blue-50 text-blue-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md py-6 border-none">
                    <Link href={`/day-trips/day-trip-details/${trip.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile arrow buttons */}
        <div className="flex md:hidden items-center justify-center gap-6 mt-8">
          <button
            onClick={() => scroll("left")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
