"use client";

import { useState } from "react";
import Link from "next/link";
import { Header2 } from "@/components/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { X, Circle, Clock } from "lucide-react";

export default function Step3Details() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <Header2 />

      <div className="flex-1 py-10 sm:py-12 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step progress */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                1
              </div>
              <span>Trip Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                2
              </div>
              <span>Choose Vehicle</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                3
              </div>
              <span>Add Stops</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold">
                4
              </div>
              <span>Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                5
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6 sm:mb-8 mt-2 sm:mt-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
            Step 3: Passenger Details
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Please provide your contact information and any special requirements.
          </p>
        </div>

        {/* Passenger details card */}
        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
          {/* Contact information */}
          <div className="mb-6 sm:mb-7">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Special requests */}
          <div className="mb-6 sm:mb-7">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
              Special Requests
            </h2>
            <label className="sr-only" htmlFor="special-requests">
              Additional Notes
            </label>
            <textarea
              id="special-requests"
              rows={4}
              placeholder="Add special requests or additional information..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Additional services */}
          <div className="mb-6 sm:mb-7">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
              Additional Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs sm:text-sm text-gray-700 cursor-pointer hover:border-blue-500">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span>Child Seat</span>
              </label>
              <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs sm:text-sm text-gray-700 cursor-pointer hover:border-blue-500">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span>Wheelchair Access</span>
              </label>
            </div>
          </div>

          {/* Form buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2 border-t border-gray-100 mt-2">
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto rounded-lg border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm"
            >
              <Link href="/booking-flow/step-2">Back to Vehicle Selection</Link>
            </Button>

            <Button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg px-6 py-2.5"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>

        {/* Booking summary */}
        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-7 max-w-xl">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
            Booking Summary
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-gray-700 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Route</span>
              <span className="font-medium text-gray-900">Dublin → Airport</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Date & Time</span>
              <span className="font-medium text-gray-900">Dec 15, 2024 at 10:30 AM</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-1">
            <span className="text-sm font-medium text-gray-900">Total</span>
            <span className="text-base sm:text-lg font-semibold text-blue-600">$145.00</span>
          </div>
        </div>
      </div>

      <Footer />

      {/* Tour status modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6 sm:p-7">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-1">
              Your Ongoing Tour Is Running
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Your tour is currently in progress. Click below to view details.
            </p>

            <div className="rounded-2xl bg-blue-50 px-4 py-3 mb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />
                  <span>On the Way</span>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] sm:text-xs text-blue-700 shadow-sm">
                  <Clock className="h-3 w-3" />
                  <span>15 min</span>
                </div>
              </div>

              <div className="relative h-28">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[11px] text-gray-600">
                  Pickup
                </div>
                <div className="absolute right-6 top-3 text-[11px] text-gray-600">
                  Destination
                </div>
                <svg
                  viewBox="0 0 200 80"
                  className="absolute inset-0 w-full h-full text-blue-300"
                >
                  <defs>
                    <marker
                      id="dot"
                      viewBox="0 0 8 8"
                      refX="4"
                      refY="4"
                      markerWidth="8"
                      markerHeight="8"
                    >
                      <circle cx="4" cy="4" r="3" fill="currentColor" />
                    </marker>
                  </defs>
                  <path
                    d="M10 60 C 60 20, 140 20, 190 30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    markerStart="url(#dot)"
                    markerEnd="url(#dot)"
                  />
                  <Circle cx="105" cy="35" r="5" className="text-blue-600" />
                </svg>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg py-2.5 mt-1"
            >
              <Link href="/booking-flow/payment">View Tour Details</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

