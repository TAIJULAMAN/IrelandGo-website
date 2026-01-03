"use client"

import { useState } from "react"
import {
  ChevronDown,
  MapPin,
  Building2,
  Users,
  Navigation,
  Clock,
  Car,
  Lightbulb,
  Calendar,
  Check,
  X,
  Info
} from "lucide-react"
import Link from "next/link"

export default function DayTripItinerary() {
  const [isReadMore, setIsReadMore] = useState(false)

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
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Section 1: About your trip */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About your trip</h2>
          <p className={`text-gray-600 text-sm leading-relaxed ${!isReadMore && "line-clamp-3"}`}>
            A trip to picturesque Hallstatt can be more than just a quick stop to the village so beautiful they copied it in China.
            You'll have the choice to plunge into world's oldest salt mines via thrilling slides, feel the magic at the Dachstein Ice Caves or simply soak in the serene Alpine atmosphere by the lake.
            Whether you're looking for a direct transfer or a scenic tour, our professional drivers ensure a comfortable and memorable journey tailored to your needs.
            Discover local insights you won't find in guidebooks and experience the freedom to explore at your own speed.
          </p>
          <button
            onClick={() => setIsReadMore(!isReadMore)}
            className="text-blue-600 font-medium text-sm mt-2 hover:underline focus:outline-none"
          >
            {isReadMore ? "Read less" : "Read more"}
          </button>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Section 2: Highlights Icons */}
        <div className="space-y-4 mb-10">
          <div className="flex items-start gap-3">
            <Car className="w-5 h-5 text-gray-700 mt-0.5" />
            <p className="text-sm font-medium text-gray-900">Exclusively yours: private vehicle and professional driver</p>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-gray-700 mt-0.5" />
            <p className="text-sm font-medium text-gray-900">Discover local insights you won't find in guidebooks</p>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-700 mt-0.5" />
            <p className="text-sm font-medium text-gray-900">Experience the freedom to explore at your own speed</p>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-gray-700 mt-0.5" />
            <p className="text-sm font-medium text-gray-900">Perfectly planned for families, friends, or solo travelers</p>
          </div>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Section 3: What to expect */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What to expect</h2>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="mt-1">
                <Calendar className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Your day trip begins wherever you are</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Meet our professional driver right where you prefer in Salzburg whenever you prefer.
                  No time wasted getting to the pickup point, grab your bag and start your journey.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1">
                <Lightbulb className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Discover more with local expertise</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your driver's local insights will set the tone for your day trip. A hidden café or a
                  try-restaurant there; insider tips you'll love sharing later. This isn't a guided tour, but the
                  ride will be rich with stories and discoveries along the way.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1">
                <Clock className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Explore at your own pace</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  In Hallstatt, have fun exploring this lakeside village and touring its ancient streets
                  that used to flavor the world. Meanwhile, your driver will wait for you nearby for a
                  simple return trip to Salzburg.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1">
                <Users className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">Perfect for any private group</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Whether you're traveling solo, as a family with kids, or as a large group, this trip is
                  tailored for your comfort and flexibility. It's the ideal option especially if you're short on
                  time or a busy schedule.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Section 4: Good to know */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Good to know</h2>
          <div className="space-y-3">
            {includedItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-sm font-medium text-gray-900">{item.title} - {item.description}</p>
              </div>
            ))}

            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-gray-900">Entry/Admission tickets to paid attractions should be purchased separately</p>
            </div>
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-gray-900">Meals, snacks, and gratuity are not included</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Section 5: Trip at a glance (Mapped from itineraryItems) */}
        <div className="pb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Your trip at a glance</h2>

          <div className="relative border-l-2 border-dashed border-gray-200 ml-3 space-y-12">

            {itineraryItems.map((item, index) => {
              const isLast = index === itineraryItems.length - 1;
              return (
                <div key={index} className={`relative pl-8 ${isLast ? '' : 'pb-4'}`}>
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 underline decoration-gray-400 decoration-1 underline-offset-2 mb-2">
                    {item.time}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>

                  {/* Only show images on the second item as a demo like the design, or randomly */}
                  {index === 1 && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                          <span className="text-xs">Location View 1</span>
                        </div>
                      </div>
                      <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100">
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                          <span className="text-xs">Location View 2</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {index === 1 && (
                    <button className="text-blue-600 font-bold text-sm mt-4 hover:underline">
                      More details & photos
                    </button>
                  )}
                </div>
              )
            })}

          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-gray-900">
            Duration or the stops can be changed upon request after booking
          </p>
        </div>

        {/* CTA - Preserved from original */}
        <div className="mt-8 flex justify-center">
          <Link href={`/booking-flow/step-2`} className="w-full sm:w-auto">
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm w-full">
              Book Your Tour
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}
