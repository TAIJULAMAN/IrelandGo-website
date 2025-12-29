"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { MapPin, Calendar as CalendarIcon, Users, Luggage, Plus, Clock, Search, BadgeCheck, UserRoundCog, ShieldPlus, ChevronDown, Minus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "../common/header"
import dynamic from "next/dynamic"
import { irishSettlements } from "@/lib/irish-settlements"
import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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
  const [isAddStopDropdownOpen, setIsAddStopDropdownOpen] = useState(false)

  // Date and Time state
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")

  // Passengers and Luggage state
  const [passengers, setPassengers] = useState(1)
  const [luggage, setLuggage] = useState(1)

  const router = useRouter()

  const tabs = [
    { id: "transfer", label: "Transfer" },
    { id: "hourly", label: "By the hour", icon: Clock, href: "/by-the-hour" },
    { id: "day-trips", label: "Day trips", href: "/day-trips" },
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
    <section className="relative overflow-hidden min-h-[800px]">

      <Header />
      {/* Background Image */}
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ireland-hero-bg.jpg"
          alt="Irish landscape"
          className="w-full h-full object-cover"
        />
        {/* Removed dark overlay as per request "Make the image in background more brighter" */}
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-0 py-10 md:py-16 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-6 md:mb-10 pt-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 text-balance leading-tight px-4">
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
                    <MapPin className="w-5 h-5 text-blue-500" />
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
                    <MapPin className="w-5 h-5 text-blue-500" />
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

              <div className="relative mb-5">
                <button
                  onClick={() => setIsAddStopDropdownOpen(!isAddStopDropdownOpen)}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Stop
                  <ChevronDown className="w-3 h-3" />
                </button>

                {isAddStopDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[150px] border border-gray-200 z-10">
                    <button
                      onClick={() => {
                        addStop()
                        setIsAddStopDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Add 1 Stop
                    </button>
                    <button
                      onClick={() => {
                        addStop()
                        addStop()
                        setIsAddStopDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Add 2 Stops
                    </button>
                    <button
                      onClick={() => {
                        addStop()
                        addStop()
                        addStop()
                        setIsAddStopDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      Add 3 Stops
                    </button>
                  </div>
                )}
              </div>

              {/* Date, Time, Passengers, Luggage */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
                <div className="col-span-1">
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                        <div className="p-3 border-t">
                          <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start h-auto p-0 hover:bg-transparent font-normal">
                          <Users className="w-4 h-4 text-blue-500 mr-2" />
                          <span className="text-sm text-gray-700">{passengers} Passenger{passengers !== 1 ? 's' : ''}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Passengers</span>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setPassengers(Math.max(1, passengers - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-4 text-center">{passengers}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setPassengers(passengers + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>

                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start h-auto p-0 hover:bg-transparent font-normal">
                          <Luggage className="w-4 h-4 text-blue-500 mr-2" />
                          <span className="text-sm text-gray-700">{luggage} Luggage</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Luggage</span>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setLuggage(Math.max(0, luggage - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-4 text-center">{luggage}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setLuggage(luggage + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
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
              <Link href="/booking-flow/step-2">
                <Button className="w-full h-10 py-3" variant="outline">
                  <Search className="w-5 h-5" />
                  Find a Ride
                </Button>
              </Link>
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
          <div className="flex flex-wrap gap-8 md:gap-16 justify-center text-sm md:text-base font-medium mt-8 md:mt-12 px-4">
            <div className="flex items-center gap-3 bg-white/15 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">Flexible Cancellation</span>
            </div>
            <div className="flex items-center gap-3 bg-white/15 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <UserRoundCog className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-3 bg-white/15 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ShieldPlus className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
