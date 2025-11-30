"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function PrivateTransfers() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const transfers = [
    {
      from: "Dublin",
      to: "Galway",
      duration: "2h 30min",
      distance: "215km",
      image: "/dublin-waterfront-city-skyline.jpg",
    },
    {
      from: "Cork",
      to: "Limerick",
      duration: "1h 15min",
      distance: "95km",
      image: "/cork-colorful-buildings-architecture.jpg",
    },
    {
      from: "Dublin",
      to: "Cliffs of Moher",
      duration: "2h 30min",
      distance: "215km",
      image: "/cliffs-of-moher-ireland-scenic-landscape.jpg",
    },
  ]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? transfers.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === transfers.length - 1 ? 0 : prevIndex + 1))
  }

  const visibleTransfers = [
    transfers[currentIndex],
    transfers[(currentIndex + 1) % transfers.length],
    transfers[(currentIndex + 2) % transfers.length],
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={goToPrevious}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Previous transfers"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h2 className="text-4xl font-bold text-center text-balance">Private Transfers</h2>

          <button
            onClick={goToNext}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Next transfers"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {visibleTransfers.map((transfer, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={transfer.image || "/placeholder.svg"}
                  alt={`${transfer.from} to ${transfer.to}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">{transfer.from}</span>
                  <div className="flex items-center gap-2 px-3">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="font-semibold text-gray-900">{transfer.to}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {transfer.duration} • {transfer.distance}
                </p>

                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href="/booking-flow/step-2">Book Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
