"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing experience! Our driver was knowledgeable and showed us hidden gems we never would have found on our own.",
      rating: 5,
      source: "Tripadvisor",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Michael Chen",
      text: "Professional service from start to finish. The vehicle was spotless and our driver made the journey so enjoyable.",
      rating: 5,
      source: "Trustpilot",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Emma Wilson",
      text: "Exceeded our expectations! Flexible timing and the driver's local knowledge made our trip unforgettable.",
      rating: 5,
      source: "Google",
      image: "/placeholder-user.jpg",
    },
    {
      name: "David Thompson",
      text: "The best way to see Ireland. Comfortable car, safe driving, and excellent recommendations for lunch stops.",
      rating: 5,
      source: "Tripadvisor",
      image: "/placeholder-user.jpg",
    },
  ]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section className="px-5 md:px-0 py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
          <button
            onClick={goToPrevious}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">What Our Customers Say</h2>
            <p className="text-sm md:text-base text-gray-600">Trusted by 1,000,000+ happy travelers</p>
          </div>

          <button
            onClick={goToNext}
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100 h-full flex flex-col ${idx > 0 ? "hidden md:flex" : ""
                }`}
            >
              <div className="flex gap-1 mb-4 md:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-blue-600 text-blue-600" />
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed flex-grow">"{testimonial.text}"</p>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm md:text-base">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-gray-500">{testimonial.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-8">
          <button
            onClick={goToPrevious}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
