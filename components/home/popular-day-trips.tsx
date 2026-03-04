"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Euro, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGetPopularTripsQuery } from "@/Redux/features/contents/contentsApi"

export function PopularDayTrips() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data: response, isLoading, isError } = useGetPopularTripsQuery({})

  const trips = response?.data?.data || []

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
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const visibleTrips = trips.length > 0 ? [
    trips[currentIndex % trips.length],
    trips[(currentIndex + 1) % trips.length],
    trips[(currentIndex + 2) % trips.length],
  ].filter(Boolean) : []

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
    <section className="px-5 md:px-0 py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
          <button
            onClick={goToPrevious}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Previous trips"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Popular Day Trips</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Explore our most popular day trip destinations.
            </p>
          </div>

          <button
            onClick={goToNext}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Next trips"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTrips.map((trip, idx) => (
            <div
              key={trip.id || idx}
              className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white h-full flex flex-col hover:shadow-md transition-shadow duration-300 ${idx > 0 ? "hidden md:flex" : ""
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

                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-3 md:mb-4 font-medium">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{formatDuration(trip.travelTimeMinutes)}</span>
                  <span>-</span>
                  <span>{trip.groupType} group</span>
                </div>

                <div className="flex items-center gap-1 text-blue-600 font-bold text-base md:text-lg mb-2 md:mb-3">
                  <Euro className="w-4 h-4 md:w-5 md:h-5" />
                  <span>From {trip.price / 100} / per person</span>
                </div>

                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {trip.description}
                </p>

                <Button asChild className="w-full bg-blue-600 hover:bg-blue-600 text-white font-semibold py-4 md:py-6 rounded-xl mt-auto text-sm md:text-lg shadow-blue-200 shadow-lg">
                  <Link href={`/day-trips/day-trip-details?id=${trip.id}`}>Book Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
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
      </div>
    </section>
  )
}
