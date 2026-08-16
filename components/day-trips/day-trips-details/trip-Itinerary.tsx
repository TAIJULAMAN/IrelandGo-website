"use client"


import {
  Info
} from "lucide-react"

export default function DayTripItinerary({ trip }: { trip: any }) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Section 1: About your trip */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About your trip</h2>
          <div
            className="text-gray-600 text-xl font-semibold"
            dangerouslySetInnerHTML={{ __html: trip?.description || "No description for this trip yet...." }}
          />
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-gray-900">
            Duration or the stops can be changed upon request after booking
          </p>
        </div>
      </div>
    </section>
  )
}
