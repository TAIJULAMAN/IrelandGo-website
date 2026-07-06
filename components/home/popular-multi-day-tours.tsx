"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Loader2, Star } from "lucide-react"
import Link from "next/link"
import { useGetPopularMultiDayToursQuery } from "@/Redux/features/contents/contentsApi"
import { SectionHeader } from "@/components/ui/section-header"

export function PopularMultiDayTours() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data: response, isLoading, isError } = useGetPopularMultiDayToursQuery({})

  const tours = response?.data || []
  // console.log("response of multi day tours", tours)

  const goToPrevious = () => {
    if (tours.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? tours.length - 1 : prevIndex - 1))
  }
  const goToNext = () => {
    if (tours.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex === tours.length - 1 ? 0 : prevIndex + 1))
  }
  const stripHtml = (html: string) => {
    return html?.replace(/<[^>]*>?/gm, "") || "";
  };

  const showSlider = tours.length >= 4;
  const visibleTours = showSlider ? [
    tours[currentIndex % tours.length],
    tours[(currentIndex + 1) % tours.length],
    tours[(currentIndex + 2) % tours.length],
  ].filter(Boolean) : tours;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    )
  }

  if (isError || tours.length === 0) {
    return null
  }

  return (
    <section className="px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-10 md:py-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
          {showSlider && (
            <button
              onClick={goToPrevious}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              aria-label="Previous tours"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <SectionHeader
            title="Popular Multi-Day Tours"
            subtitle="Curated Experiences"
            description="Discover Ireland's most breathtaking destinations with our carefully curated multi-day experiences."
            alignment="center"
            className="mb-0"
          />

          {showSlider && (
            <button
              onClick={goToNext}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              aria-label="Next tours"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTours.map((tour: any, idx: number) => (
            <div
              key={tour.id || idx}
              className={`bg-white rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-200 h-full flex flex-col hover:shadow-lg transition-shadow duration-300 ${showSlider && idx === 2 ? "hidden lg:flex" : ""
                } ${showSlider && idx === 1 ? "hidden md:flex" : ""}`}
            >
              <div className="relative h-44">
                <img
                  src={tour.images?.[0] || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                {tour.tourDays && (
                  <span className="absolute left-3 top-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-sm">
                    {tour.tourDays} Day{tour.tourDays > 1 ? "s" : ""}
                  </span>
                )}
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 text-slate-800 text-xs font-medium backdrop-blur-sm shadow-sm border border-white/50">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />{" "}
                  {tour.ratings || "0"}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-slate-900 text-lg leading-tight">{tour.title}</h3>
                <p className="text-slate-600 text-sm mt-2 line-clamp-2 flex-grow leading-relaxed">
                  {stripHtml(tour.description)}
                </p>

                <div className="mt-4 flex items-center justify-between mb-4 pt-4 border-t border-slate-50">
                  <Link href={`/multi-day-tours/${tour.id}`}>
                    <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        {showSlider && (
          <div className="flex md:hidden items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              aria-label="Previous tours"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              aria-label="Next tours"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
