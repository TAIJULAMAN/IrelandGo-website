"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  MapPin,
  Car,
  Users,
  Luggage,
  ArrowRight,
} from "lucide-react";
import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();

  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";
  const dateParam = searchParams.get("date") || "";
  const timeParam = searchParams.get("time") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const extraBags = parseInt(searchParams.get("extraBags") || "0");
  const carPriceParam = searchParams.get("carPrice");
  const tripType = searchParams.get("tripType") || "one-way";
  const bookingId = searchParams.get("bookingId") || "";
  const selectedStopsParam = searchParams.get("selectedStops");
  const transferRouteParam = searchParams.get("transferRoute");

  let selectedStops: any[] = [];
  try {
    if (selectedStopsParam) selectedStops = JSON.parse(selectedStopsParam);
  } catch (e) {}

  let transferRoute: any = null;
  try {
    if (transferRouteParam) transferRoute = JSON.parse(transferRouteParam);
  } catch (e) {}

  // Price
  let transportPrice = carPriceParam ? parseFloat(carPriceParam) : 0;
  const isReturn = tripType === "return";
  if (isReturn) transportPrice = transportPrice * 2;
  const stopsCost = selectedStops.reduce((t: number, s: any) => t + s.price, 0);
  const totalPrice = transportPrice + stopsCost;

  // Format date
  let formattedDate = dateParam;
  try {
    if (dateParam) {
      formattedDate = new Date(dateParam).toLocaleDateString("en-IE", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  } catch (e) {}

  // Booking reference
  const bookingRef = bookingId
    ? `#${bookingId.slice(0, 8).toUpperCase()}`
    : `#IG-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <div className="print:hidden">
        <Header2 />
      </div>

      <div className="flex-1 py-10 sm:py-14 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Success Banner */}
        <div className="bg-white p-6 sm:p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 print:hidden">
            <CheckCircle2 className="h-9 w-9 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-gray-500 mb-3 print:hidden">
            Your transfer has been successfully booked. A confirmation email has
            been sent to you.
          </p>
          <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-sm px-4 py-1.5 rounded-full print:bg-transparent print:border-0 print:text-gray-900 print:p-0 print:text-lg">
            Booking Reference: {bookingRef}
          </span>
        </div>

        {/* Trip Details */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 print:shadow-none print:border-gray-200 print:p-0">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
            Trip Details
          </h2>

          <div className="space-y-4 text-sm text-gray-700">
            {/* Route */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 bg-blue-50 rounded-lg shrink-0">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Route
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900">
                    {pickupParam || "—"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span className="font-semibold text-gray-900">
                    {dropoffParam || "—"}
                  </span>
                  {isReturn && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      Return
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 bg-blue-50 rounded-lg shrink-0">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Pickup Date & Time
                </p>
                <p className="font-semibold text-gray-900">
                  {formattedDate}
                  {timeParam ? ` at ${timeParam}` : ""}
                </p>
              </div>
            </div>

            {/* Vehicle & Passengers */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 bg-blue-50 rounded-lg shrink-0">
                <Car className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Passengers & Luggage
                </p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-gray-900 font-medium">
                    <Users className="h-3.5 w-3.5 text-gray-500" />
                    {adults + children} passenger
                    {adults + children !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1 text-gray-900 font-medium">
                    <Luggage className="h-3.5 w-3.5 text-gray-500" />
                    {adults + children + extraBags} bag
                    {adults + children + extraBags !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Stops */}
            {selectedStops.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 bg-blue-50 rounded-lg shrink-0">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Included Stops
                  </p>
                  <ul className="space-y-0.5">
                    {selectedStops.map((stop: any, i: number) => (
                      <li key={i} className="text-gray-700 font-medium">
                        • {stop.name}{" "}
                        <span className="text-gray-400 text-xs">
                          (€{stop.price})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="mt-5 pt-4 border-t border-gray-100 space-y-2 text-sm">
            {isReturn && (
              <>
                <div className="flex justify-between text-gray-600">
                  <span>Transport (one-way)</span>
                  <span>€{Math.round(transportPrice / 2)}</span>
                </div>
                <div className="flex justify-between text-blue-600 font-medium">
                  <span>Return trip (×2)</span>
                  <span>€{Math.round(transportPrice / 2)}</span>
                </div>
              </>
            )}
            {!isReturn && (
              <div className="flex justify-between text-gray-600">
                <span>Transport</span>
                <span>€{transportPrice}</span>
              </div>
            )}
            {stopsCost > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Stops</span>
                <span>€{stopsCost}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
              <span>Total Paid</span>
              <span className="text-blue-600">€{totalPrice}</span>
            </div>
          </div>
        </div>
        {/* What's Next */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 print:hidden">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
              ?
            </span>
            What happens next?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="text-blue-600 font-bold text-lg">01</div>
              <p className="text-sm font-semibold text-gray-900">
                Email Confirmation
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Check your inbox for a detailed summary of your booking and
                receipt.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-blue-600 font-bold text-lg">02</div>
              <p className="text-sm font-semibold text-gray-900">
                Driver Assignment
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                We'll notify you once a professional driver is assigned to your
                trip.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-blue-600 font-bold text-lg">03</div>
              <p className="text-sm font-semibold text-gray-900">
                Enjoy Your Ride
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your driver will meet you at the pickup location at the
                scheduled time.
              </p>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="bg-blue-600 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden print:hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Need assistance?</h3>
            <p className="text-sm text-blue-100 mb-6 max-w-md">
              Our support team is available 24/7 to help you with any questions
              about your booking.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-100 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print Receipt
              </button>
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full opacity-20" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 print:hidden">
          <Button
            asChild
            variant="outline"
            className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-semibold rounded-xl px-8 h-12"
          >
            <Link href="/">Return to Home</Link>
          </Button>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 h-12 shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
          >
            <Link href="/user/bookings">View My Bookings</Link>
          </Button>
        </div>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </section>
  );
}
