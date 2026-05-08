"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Euro, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGetPopularTripsQuery } from "@/Redux/features/contents/contentsApi"
import { SectionHeader } from "@/components/ui/section-header"

export function PopularDayTrips() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data: response, isLoading, isError } = useGetPopularTripsQuery({})
  console.log("response", response)

  const trips = response?.data || []
  console.log("trips", trips)

  const goToPrevious = () => {
    if (trips.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? trips.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    if (trips.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex === trips.length - 1 ? 0 : prevIndex + 1))
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const showSlider = trips.length >= 3;
  const visibleTrips = showSlider ? [
    trips[currentIndex % trips.length],
    trips[(currentIndex + 1) % trips.length],
    trips[(currentIndex + 2) % trips.length],
  ].filter(Boolean) : trips;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    )
  }

  if (isError || trips.length === 0) {
    return null
  }

  return (
    <section className="px-5 md:px-0 py-10 md:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8 md:mb-12 gap-4 relative">
          <div className="hidden md:flex items-center w-12 h-12">
            {showSlider && (
              <button
                onClick={goToPrevious}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
                aria-label="Previous trips"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          </div>

          <SectionHeader
            title="Popular Day Trips"
            subtitle="Explore Ireland"
            description="Explore our most popular day trip destinations."
            alignment="center"
            className="mb-0"
          />

          <div className="hidden md:flex items-center w-12 h-12">
            {showSlider && (
              <button
                onClick={goToNext}
                className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
                aria-label="Next trips"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTrips.map((trip: any, idx: number) => (
            <div
              key={trip.id || idx}
              className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white h-full flex flex-col hover:shadow-md transition-shadow duration-300 ${showSlider && idx > 0 ? "hidden md:flex" : ""
                }`}
            >
              <div className="relative h-48 md:h-64 w-full bg-gray-200">
                <img
                  src={trip.images?.[0] || "/placeholder.svg"}
                  alt={trip.to}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">
                  {trip.from} to {trip.to}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {trip.description?.replace(/<[^>]*>?/gm, "")}
                </p>

                <div className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 font-medium">
                  {formatDuration(trip.travelTimeMinutes)} · {trip.groupType}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg md:text-xl font-bold text-blue-600">€{trip.price / 100}</span>
                  <span className="text-xs text-gray-400">per person</span>
                </div>



                <Button asChild className="w-full bg-blue-600 hover:bg-blue-600 text-white font-semibold py-4 md:py-6 rounded-xl mt-auto text-sm md:text-lg shadow-blue-200 shadow-lg">
                  <Link href={`/day-trips/day-trip-details/${trip.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        {showSlider && (
          <div className="flex md:hidden items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Previous trips"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Next trips"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
