"use client";

import Link from "next/link";
import { Header2 } from "@/components/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Car, MapPin, Clock } from "lucide-react";

export default function PaymentStep() {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <Header2 />

      <div className="flex-1 py-10 sm:py-12 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                4
              </div>
              <span>Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold">
                5
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6 sm:mb-8 mt-2 sm:mt-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
            Step 4: Payment
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Select your preferred payment method for your journey.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 items-start">
          {/* Booking summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-7">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                Booking Summary
              </h2>

              <div className="space-y-5 text-xs sm:text-sm text-gray-700 mb-4">
                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                      Pickup Location
                    </p>
                    <p className="font-medium text-gray-900">123 Main Street, Downtown</p>
                    <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                      Destination
                    </p>
                    <p className="font-medium text-gray-900">456 Oak Avenue, Uptown</p>
                    <p className="text-xs text-gray-500">Estimated arrival 3:15 PM</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600">
                    <Car className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Premium Sedan</p>
                    <p className="text-xs text-gray-500">4 passengers • A/C • WiFi</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 text-blue-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Estimated Duration</p>
                    <p className="text-xs text-gray-500">45 minutes</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-1 space-y-2 text-xs sm:text-sm text-gray-700">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                  Price Breakdown
                </p>
                <div className="flex items-center justify-between">
                  <span>Base Fare</span>
                  <span className="text-gray-900">$25.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Distance (12.5 miles)</span>
                  <span className="text-gray-900">$18.75</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Service Fee</span>
                  <span className="text-gray-900">$3.25</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span className="text-gray-900">$4.70</span>
                </div>

                <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100 text-sm font-semibold">
                  <span>Total</span>
                  <span className="text-blue-600">$51.70</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 flex flex-col gap-4">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Payment Method
              </h2>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg py-2.5 text-sm sm:text-base"
                >
                  <Link href="/booking-flow/booking-confirmation">Pay Now with Stripe</Link>
                </Button>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-400 justify-center">
                  <span className="h-px w-8 bg-gray-200" />
                  <span>or</span>
                  <span className="h-px w-8 bg-gray-200" />
                </div>
                <Button
                  asChild
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-2.5 text-sm sm:text-base"
                >
                  <Link href="/booking-flow/booking-confirmation">Pay Now with PayPal</Link>
                </Button>
              </div>

              <p className="mt-1 text-[11px] sm:text-xs text-gray-500">
                Your payment information is secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

