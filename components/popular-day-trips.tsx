"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function PopularDayTrips() {
  const trips = [
    {
      id: 1,
      title: "Dublin to Galway via Cliffs of Moher",
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
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? trips.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === trips.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={handlePrev}
            className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Previous trips"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h2 className="text-4xl font-bold text-center flex-1 text-balance">Popular Day Trips</h2>

          <button
            onClick={handleNext}
            className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Next trips"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {trips.map((trip, idx) => (
            <div
              key={trip.id}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{trip.description}</p>

                <div className="space-y-1 mb-4 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">{trip.duration}</span> • {trip.groupType}
                  </p>
                  <p className="underline">
                    From <span className="font-semibold">{trip.price}</span> / per person
                  </p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">Book Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
