"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Euro, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PopularDayTrips() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const trips = [
    {
      id: 1,
      title: "Dublin to Galway via Cliffs",
      description: "Experience Ireland's most stunning coastal drive",
      image: "/dublin-galway-cliffs-of-moher-coastal-drive.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
    {
      id: 2,
      title: "Belfast to Giant's Causeway",
      description: "Discover Northern Ireland's natural wonder",
      image: "/belfast-giants-causeway-natural-wonder.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
    {
      id: 3,
      title: "Limerick to Dingle Peninsula",
      description: "Explore charming coastal villages and beaches",
      image: "/limerick-dingle-peninsula-coastal-villages.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
    {
      id: 4,
      title: "Dublin to Galway via Cliffs of Moher",
      description: "Experience Ireland's most stunning coastal drive",
      image: "/dublin-galway-cliffs-of-moher-coastal-drive.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
    {
      id: 5,
      title: "Belfast to Giant's Causeway",
      description: "Discover Northern Ireland's natural wonder",
      image: "/belfast-giants-causeway-natural-wonder.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
  ]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? trips.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === trips.length - 1 ? 0 : prevIndex + 1))
  }

  const visibleTrips = [
    trips[currentIndex],
    trips[(currentIndex + 1) % trips.length],
    trips[(currentIndex + 2) % trips.length],
  ]

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
              key={idx}
              className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white h-full flex flex-col hover:shadow-md transition-shadow duration-300 ${idx > 0 ? "hidden md:flex" : ""
                }`}
            >
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">{trip.title}</h3>

                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-3 md:mb-4 font-medium">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{trip.duration}</span>
                  <span>-</span>
                  <span>{trip.groupType}</span>
                </div>

                <div className="flex items-center gap-1 text-blue-600 font-bold text-base md:text-lg mb-2 md:mb-3">
                  <Euro className="w-4 h-4 md:w-5 md:h-5" />
                  <span>From {trip.price} / per person</span>
                </div>

                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {trip.description}
                </p>

                <Button asChild className="w-full bg-blue-600 hover:bg-blue-600 text-white font-semibold py-4 md:py-6 rounded-xl mt-auto text-sm md:text-lg shadow-blue-200 shadow-lg">
                  <Link href="/day-trips/day-trip-details">Book Now</Link>
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
