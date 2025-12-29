"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

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
    <section className="px-5 md:px-0 py-10 md:py-18 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
          <button
            onClick={goToPrevious}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Previous transfers"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Private Transfers</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Explore our most popular private transfers.
            </p>
          </div>

          <button
            onClick={goToNext}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Next transfers"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTransfers.map((transfer, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${idx > 0 ? 'hidden md:block' : ''
                }`}
            >
              <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
                <img
                  src={transfer.image || "/placeholder.svg"}
                  alt={`${transfer.from} to ${transfer.to}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900 text-sm md:text-base">{transfer.from}</span>
                  <div className="flex items-center gap-2 px-2 md:px-3">
                    <Image src="/divider.png" alt="" width={80} height={80} />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm md:text-base">{transfer.to}</span>
                </div>

                <p className="text-xs md:text-sm text-gray-600 mb-4">
                  {transfer.duration} • {transfer.distance}
                </p>

                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
                >
                  <Link href="/airport-transfers/journey-details">Book Now</Link>
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
            aria-label="Previous transfers"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Next transfers"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section >
  )
}
