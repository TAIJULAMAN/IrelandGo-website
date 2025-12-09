"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { MapPin, Calendar, Users, Luggage, Plus, Clock, Search, BadgeCheck, UserRoundCog, ShieldPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "./header"
import dynamic from "next/dynamic"
import { irishSettlements } from "@/lib/irish-settlements"

// Dynamically import MapRoute with SSR disabled to prevent "window is not defined" error
const MapRoute = dynamic(() => import("./map-route").then(mod => ({ default: mod.MapRoute })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: '340px' }}>
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
})

export function Hero() {
  const [activeTab, setActiveTab] = useState("transfer")
  const [tripType, setTripType] = useState("return")
  const [oneWayStops, setOneWayStops] = useState<string[]>([])
  const [returnStops, setReturnStops] = useState<string[]>([])
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const router = useRouter()

  const tabs = [
    { id: "transfer", label: "Transfer" },
    { id: "hourly", label: "By the hour", icon: Clock, href: "/by-the-hour" },
    { id: "day-trips", label: "Day trips", href: "/day-trips" },
    { id: "multi-day", label: "Multi day tours", href: "/multi-day-tours" },
  ]

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.href) {
      router.push(tab.href)
    } else {
      setActiveTab(tab.id)
    }
  }

  const addStop = () => {
    if (tripType === "one-way") {
      setOneWayStops([...oneWayStops, ""])
    } else {
      setReturnStops([...returnStops, ""])
    }
  }

  const removeStop = (index: number) => {
    if (tripType === "one-way") {
      setOneWayStops(oneWayStops.filter((_, i) => i !== index))
    } else {
      setReturnStops(returnStops.filter((_, i) => i !== index))
    }
  }

  const currentStops = tripType === "one-way" ? oneWayStops : returnStops

  return (
    <section className="relative overflow-hidden min-h-screen">

      <Header />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ireland-hero-bg.jpg"
          alt="Irish landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/10 via-[#000000]/10 to-[#000000]/10 "></div>
      </div>

      <div className="container mx-auto px-5 md:px-0 py-10 md:py-16 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-6 md:mb-10 pt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 text-balance leading-tight px-4">
            Comfortable car transfers in Ireland
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 px-4">Book private transfers and day tours with professional drivers.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-start mb-6 md:mb-10 overflow-x-auto scrollbar-hide scroll-smooth">
          <div className="inline-flex gap-0 bg-white/10 backdrop-blur-sm rounded-full p-1 border-2 border-blue-400/50 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-md"
                  : "bg-transparent text-white"
                  }`}
              >
                {/* {tab.icon && <tab.icon className="w-3 h-3 md:w-4 md:h-4" />} */}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {/* Booking Form Container */}
          <div className="flex flex-col lg:flex-row gap-5 container mx-auto bg-white rounded-xl shadow-xl p-4 md:p-5">
            <div className="w-full ">
              {/* Tabs */}
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setTripType("one-way")}
                  className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${tripType === "one-way"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  One Way
                </button>
                <button
                  onClick={() => setTripType("return")}
                  className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${tripType === "return"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Return
                </button>
              </div>

              {/* Location Inputs */}
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Pickup Location"
                      className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <input
                      type="text"
                      placeholder="Dropoff Location"
                      className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Stops */}
              {currentStops.map((stop, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <input
                      type="text"
                      placeholder={`Stop ${index + 1}`}
                      className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                      value={stop}
                      onChange={(e) => {
                        if (tripType === "one-way") {
                          const newStops = [...oneWayStops]
                          newStops[index] = e.target.value
                          setOneWayStops(newStops)
                        } else {
                          const newStops = [...returnStops]
                          newStops[index] = e.target.value
                          setReturnStops(newStops)
                        }
                      }}
                    />
                    <button
                      onClick={() => removeStop(index)}
                      className="text-red-500 hover:text-red-600 transition"
                      aria-label="Remove stop"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addStop}
                className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium mb-5 transition"
              >
                <Plus className="w-4 h-4" />
                Add Stop
              </button>

              {/* Date, Time, Passengers, Luggage */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
                <div className="col-span-1">
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="04/07/2025 - 09:00 am"
                      className="w-full outline-none text-xs text-gray-700"
                      defaultValue="04/07/2025 - 09:00 am"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <select className="w-full outline-none text-xs bg-white text-gray-700">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3+ Passengers</option>
                    </select>

                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Luggage className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <select className="w-full outline-none text-sm bg-white text-gray-700">
                      <option>1 Luggage</option>
                      <option>2 Luggage</option>
                      <option>3+ Luggage</option>
                    </select>

                  </div>
                </div>
              </div>

              {tripType === "return" && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <input
                      type="text"
                      placeholder="Return"
                      className="w-full outline-none text-sm text-gray-700"
                    />
                  </div>
                </div>
              )}

              <Button className="w-full h-10 py-3" variant="outline">
                <Search className="w-5 h-5" />
                Find a Ride
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg w-[450px] h-[340px] hidden lg:block">
              <MapRoute
                pickup={irishSettlements.find(s => s.name === pickupLocation) ? {
                  lat: irishSettlements.find(s => s.name === pickupLocation)!.lat,
                  lng: irishSettlements.find(s => s.name === pickupLocation)!.lng,
                  name: pickupLocation
                } : undefined}
                dropoff={irishSettlements.find(s => s.name === dropoffLocation) ? {
                  lat: irishSettlements.find(s => s.name === dropoffLocation)!.lat,
                  lng: irishSettlements.find(s => s.name === dropoffLocation)!.lng,
                  name: dropoffLocation
                } : undefined}
              />
            </div>
          </div>

          {/* Features Row */}
          <div className="flex flex-wrap gap-4 md:gap-10 justify-center text-sm md:text-lg font-medium mt-6 md:mt-10 px-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="w-5 h-5 text-green-500" />
              </div>
              <span className="font-medium">Flexible Cancellation</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <UserRoundCog className="w-5 h-5 text-green-500" />
              </div>
              <span className="font-medium">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldPlus className="w-5 h-5 text-green-500" />
              </div>
              <span className="font-medium">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
