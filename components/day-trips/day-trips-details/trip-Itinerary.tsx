"use client"

import { useState } from "react"
import { ChevronDown, MapPin, Building2, Users, Navigation } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function DayTripItinerary() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const itineraryItems = [
    {
      time: "09:00 AM",
      title: "Departure from Paris",
      description: "Pick-up from your hotel or preferred location in Paris",
      icon: MapPin,
    },
    {
      time: "10:30 AM",
      title: "Arrive at Giverny",
      description: "Explore Monet's House and Gardens with guided tour",
      icon: Building2,
    },
    {
      time: "01:00 PM",
      title: "Lunch Break",
      description: "Traditional French lunch at local restaurant",
      icon: Users,
    },
    {
      time: "04:00 PM",
      title: "Return to Paris",
      description: "Comfortable drive back with scenic countryside views",
      icon: Navigation,
    },
  ]

  const includedItems = [
    { title: "Transportation", description: "Luxury coach with WiFi" },
    { title: "Accommodation", description: "2 nights in 4-star hotel" },
    { title: "Meals", description: "2 meals as specified" },
    { title: "Expert Guide", description: "Professional tour guide" },
    { title: "Entry Fees", description: "All attractions included" },
    { title: "Insurance", description: "Travel insurance covered" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">Your Day Trip Itinerary</h1>
          <p className="text-gray-600 text-lg">Discover what awaits you on this unforgettable journey</p>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-4 mb-12">
          {itineraryItems.map((item, index) => {
            const IconComponent = item.icon
            const isExpanded = expandedIndex === index

            return (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="flex items-start gap-4 px-5 py-2">
                  {/* Icon Circle */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          <span className="text-blue-600">{item.time}</span> - {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""
                          }`}
                      />
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-700">
                          Experience the highlights of this incredible destination with our expert local guides. This
                          segment includes comfortable transportation, professional guidance, and all entrance fees.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* What's Included Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What's Included</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {includedItems.map((item, index) => (
              <div key={index} className="flex gap-3">
                {/* Checkmark Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-500">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* CTA */}
        <div className="mt-5 flex justify-center">
          <Link href={`/booking-flow/step-2`}>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm w-full sm:w-auto">
              Book Your Tour
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
