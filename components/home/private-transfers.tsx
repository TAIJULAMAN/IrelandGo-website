"use client"

import { useState } from "react"
import Link from "next/link"
import Loading from "@/components/common/loading"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2, Clock, Route } from "lucide-react"
import Image from "next/image"
import { useGetPrivateTransfersQuery } from "@/Redux/features/contents/contentsApi"
import { SectionHeader } from "../ui/section-header"
import { useRouter } from "next/navigation"

export function PrivateTransfers() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data: response, isLoading, isError } = useGetPrivateTransfersQuery({})
  const transfers = response?.data || []

  const goToPrevious = () => {
    if (transfers.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? transfers.length - 1 : prevIndex - 1))
  }
  const goToNext = () => {
    if (transfers.length === 0) return
    setCurrentIndex((prevIndex) => (prevIndex === transfers.length - 1 ? 0 : prevIndex + 1))
  }


  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
  }

  const showSlider = transfers.length >= 3;
  const visibleTransfers = showSlider ? [
    transfers[currentIndex % transfers.length],
    transfers[(currentIndex + 1) % transfers.length],
    transfers[(currentIndex + 2) % transfers.length],
  ].filter(Boolean) : transfers;

  if (isLoading) {
    return (
      <section className="relative px-5 md:px-0 py-10 md:py-16 bg-gray-50/50 overflow-hidden">
        <Loading />
      </section>
    )
  }

  if (isError || transfers.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 font-medium">No private transfers available at the moment.</p>
      </div>
    )
  }

  return (
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 2xl:px-0 py-12 md:py-16 xl:py-20 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[5%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/80 blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50/80 blur-3xl mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-10 gap-6 relative">
          {showSlider && (
            <button
              onClick={goToPrevious}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:-translate-x-1"
              aria-label="Previous transfers"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="flex-1 w-full max-w-3xl mx-auto">
            <SectionHeader
              title="Private Transfers"
              subtitle="Reliable Chauffeur"
              description="Explore our most popular private transfers."
              alignment="center"
              className="mb-0"
            />
          </div>

          {showSlider && (
            <button
              onClick={goToNext}
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all shadow-sm z-10 hover:translate-x-1"
              aria-label="Next transfers"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleTransfers.map((transfer: any, idx: number) => (
            <div
              key={transfer.id || idx}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-white transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative ${showSlider && idx === 2 ? 'hidden lg:flex' : 'flex'} ${showSlider && idx === 1 ? 'hidden md:flex' : 'flex'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="relative h-40 md:h-48 overflow-hidden bg-gray-100 z-10">
                <img
                  src={transfer.images?.[0] || "/placeholder.svg"}
                  alt={`${transfer.from} to ${transfer.to}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-1 relative z-10">
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span className="font-bold text-gray-900 text-sm md:text-base lg:text-lg truncate max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-none group-hover:text-blue-700 transition-colors" title={transfer.from}>{transfer.from}</span>
                  <div className="flex items-center shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Image src="/divider.png" alt="to" width={80} height={12} className="w-12 sm:w-16 md:w-20 h-auto" />
                  </div>
                  <span className="font-bold text-gray-900 text-sm md:text-base lg:text-lg truncate max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-none group-hover:text-blue-700 transition-colors" title={transfer.to}>{transfer.to}</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold shadow-sm border border-blue-100/50">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDuration(transfer.travelTimeMinutes)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold shadow-sm border border-indigo-100/50">
                    <Route className="w-3.5 h-3.5" />
                    {transfer.distanceKm} km
                  </span>
                </div>

                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full rounded-xl text-sm md:text-base font-bold bg-blue-50 text-blue-700 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md py-6 border-none"
                  >
                    <Link href={`/transfer/private-car-transfer?pickup=${encodeURIComponent(transfer.from)}&dropoff=${encodeURIComponent(transfer.to)}&serviceType=${encodeURIComponent(transfer.serviceType || 'PRIVATE_TRANSFER')}&transferRoute=${encodeURIComponent(JSON.stringify({ ...transfer, description: undefined, images: undefined, includedContent: undefined, excludedContent: undefined }))}`}>Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        {showSlider && (
          <div className="flex md:hidden items-center justify-center gap-6 mt-10">
            <button
              onClick={goToPrevious}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95 transition-all"
              aria-label="Previous transfers"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 shadow-sm active:scale-95 transition-all"
              aria-label="Next transfers"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
