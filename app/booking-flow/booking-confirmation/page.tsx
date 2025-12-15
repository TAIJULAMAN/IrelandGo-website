"use client";

import Link from "next/link";
import { CheckCircle2, Download, Phone, Printer, Star } from "lucide-react";
import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function BookingConfirmationPage() {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <Header2 />

      <div className="flex-1 py-10 sm:py-12 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Confirmation card */}
        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8">
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
              Booking Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md">
              Your trip is confirmed. Here are your booking details.
            </p>
          </div>

          {/* Trip details + driver info */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Trip details */}
            <div className="md:col-span-2 border border-gray-100 rounded-xl p-4 sm:p-5">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                Trip Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-700 mb-4">
                <div>
                  <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Pickup Location
                  </p>
                  <p className="font-medium text-gray-900">
                    San Francisco International Airport
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    Dec 12, 2024 · 2:30 PM
                  </p>
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Drop-off Location
                  </p>
                  <p className="font-medium text-gray-900">
                    Downtown San Francisco
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    Estimated 3:15 PM
                  </p>
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Vehicle Type
                  </p>
                  <p className="font-medium text-gray-900">Premium Sedan</p>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    4 passengers · A/C · WiFi
                  </p>
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Trip Duration
                  </p>
                  <p className="font-medium text-gray-900">45 minutes</p>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    Distance · 18 miles
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1 text-xs sm:text-sm">
                <span className="text-gray-600 font-medium">Total Amount</span>
                <span className="text-base sm:text-lg font-semibold text-blue-600">
                  $89.50
                </span>
              </div>
            </div>


            {/* Driver Information */}
            <div className="border border-gray-100 rounded-xl p-4 sm:p-5 flex flex-col gap-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                Driver Information
              </h2>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-gray-900">
                      Michael Rodriguez
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      4.9 ★ (234 rides)
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      Honda Accord · Plate: ABC-1234
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button className="h-8 rounded-lg px-3 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Receipt</span>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-8 rounded-lg px-3 text-xs sm:text-sm border-blue-600 text-blue-600 bg-white flex items-center gap-1.5"
                >
                  <Link href="/booking-flow/real-time-tracking">
                    <Printer className="h-3.5 w-3.5" />
                    <span>Track Order</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Feedback card */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8">
            <div className="flex flex-col items-center text-center mb-4">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1">
                How was your booking experience?
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 max-w-md">
                Tell us about your experience to help us improve your next trip.
              </p>
            </div>

            <div className="flex justify-center gap-1 sm:gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-gray-300" />
              ))}
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              <textarea
                rows={3}
                placeholder="Tell us about your experience (optional)"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-center">
                <Button className="px-6 sm:px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg">
                  Submit Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
