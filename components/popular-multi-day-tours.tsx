"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Euro, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PopularMultiDayTours() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const tours = [
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
  ]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? tours.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === tours.length - 1 ? 0 : prevIndex + 1))
  }

  const visibleTours = [
    tours[currentIndex],
    tours[(currentIndex + 1) % tours.length],
    tours[(currentIndex + 2) % tours.length],
  ]

  return (
    <section className="px-5 md:px-0 py-10 md:py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
          <button
            onClick={goToPrevious}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Previous tours"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Popular Multi-Day Tours</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Discover Ireland's most breathtaking destinations with our carefully curated multi-day experiences.
            </p>
          </div>

          <button
            onClick={goToNext}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Next tours"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTours.map((tour, idx) => (
            <div
              key={idx}
              className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white h-full flex flex-col hover:shadow-md transition-shadow duration-300 ${idx > 0 ? "hidden md:flex" : ""
                }`}
            >
              <div className="relative h-48 md:h-64 w-full">
                {tour.image.startsWith("linear-gradient") ? (
                  <div className="w-full h-full" style={{ background: tour.image }}></div>
                ) : (
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">{tour.title}</h3>

                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-3 md:mb-4 font-medium">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{tour.duration}</span>
                  <span>-</span>
                  <span>{tour.groupType}</span>
                </div>

                <div className="flex items-center gap-1 text-blue-600 font-bold text-base md:text-lg mb-2 md:mb-3">
                  <Euro className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{tour.pricePerPerson}</span>
                </div>

                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {tour.description}
                </p>

                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 md:py-6 rounded-xl mt-auto text-sm md:text-lg shadow-blue-200 shadow-lg">
                  <Link href="/booking-flow/step-2">Book Now</Link>
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
            aria-label="Previous tours"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Next tours"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
