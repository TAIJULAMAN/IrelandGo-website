"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Header2 } from "@/components/common/Header2";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2 } from "lucide-react";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";
import { 
  useCreateBookingUsingServiceIdMutation,
  useCreateBookingWithoutIdMutation 
} from "@/Redux/features/booking/bookingApi";

export default function Step3Details() {
  const [showModal, setShowModal] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";
  const dateParam = searchParams.get("date") || "";
  const timeParam = searchParams.get("time") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const extraBags = parseInt(searchParams.get("extraBags") || "0");
  const vehicleId = searchParams.get("vehicleId");
  const transferRouteParam = searchParams.get("transferRoute");
  const selectedStopsParam = searchParams.get("selectedStops");
  const serviceTypeParam = searchParams.get("serviceType") || "TRANSFER";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [childSeat, setChildSeat] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);

  let transferRoute: any = null;
  if (transferRouteParam) {
    try {
      transferRoute = JSON.parse(transferRouteParam);
    } catch (e) {}
  }

  let selectedStops: any[] = [];
  if (selectedStopsParam) {
    try {
      selectedStops = JSON.parse(selectedStopsParam);
    } catch (e) {}
  }

  const { data: vehiclesData } = useGetVehiclesQuery({});
  const vehicles = vehiclesData?.data?.data || [];

  const carPriceParam = searchParams.get("carPrice");
  let transportPrice = 0;
  let basePriceSum = 0;
  let pricePerKmSum = 0;
  const distanceKm = transferRoute?.distanceKm || 0;

  if (carPriceParam) {
    // If the exact price is passed from step 2, use it
    transportPrice = parseFloat(carPriceParam);
  } else if (vehicleId && vehicles.length > 0) {
    // Fallback calculation for older links without carPrice
    const ids = vehicleId.split("+");
    const selectedVehicles = ids
      .map((id: string) => vehicles.find((v: any) => v.id === id))
      .filter(Boolean);

    if (selectedVehicles.length > 0) {
      basePriceSum = selectedVehicles.reduce(
        (sum: number, v: any) => sum + v.basePrice,
        0,
      );
      pricePerKmSum = selectedVehicles.reduce(
        (sum: number, v: any) => sum + v.pricePerKm,
        0,
      );
      const extraBagsCost = extraBags * 10;

      transportPrice =
        Math.round(basePriceSum + pricePerKmSum * distanceKm) + extraBagsCost;
    }
  }

  const stopsCost = selectedStops.reduce(
    (total: number, stop: any) => total + stop.price,
    0,
  );
  const totalPrice = transportPrice + stopsCost;

  let formattedDate = dateParam;
  if (dateParam) {
    try {
      const d = new Date(dateParam);
      formattedDate = d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch (e) {}
  }

  const [createBookingUsingServiceId, { isLoading: isBookingWithIdLoading }] =
    useCreateBookingUsingServiceIdMutation();
  const [createBookingWithoutId, { isLoading: isBookingWithoutIdLoading }] =
    useCreateBookingWithoutIdMutation();

  const isLoading = isBookingWithIdLoading || isBookingWithoutIdLoading;

  const handleBooking = async () => {
    const bookingVehiclesMap: Record<string, number> = {};
    if (vehicleId) {
      vehicleId.split("+").forEach((id) => {
        bookingVehiclesMap[id] = (bookingVehiclesMap[id] || 0) + 1;
      });
    }
    const bookingVehicles = Object.entries(bookingVehiclesMap).map(
      ([id, quantity]) => ({ vehicleId: id, quantity }),
    );
    const bookingStoppages = selectedStops.map((stop) => ({
      stoppageId: stop.id,
      quantity: 1,
    }));

    const body = {
      clientName: `${firstName} ${lastName}`.trim() || "Guest User",
      from: pickupParam,
      fromLat: transferRoute?.fromLat || 53.3498, // Example default if missing
      fromLng: transferRoute?.fromLng || -6.2603,
      to: dropoffParam,
      toLat: transferRoute?.toLat || 53.2707,
      toLng: transferRoute?.toLng || -9.0568,
      serviceType: transferRoute?.serviceType || serviceTypeParam,
      travelDate: dateParam || new Date().toISOString().split("T")[0],
      timeSlot: {
        start: timeParam || "09:00 AM",
        end: timeParam || "09:00 AM",
      },
      passengers: adults + children,
      distanceKm: distanceKm,
      luggage: extraBags + adults + children,
      basePrice: basePriceSum,
      vehiclePrice: transportPrice,
      stoppagePrice: stopsCost,
      returnPrice: 0, // Currently no return flow supported natively here
      totalPrice: totalPrice,
      isReturn: false,
      bookingVehicles,
      bookingStoppages,
    };

    try {
      let res;
      const withoutIdTypes = ["TRANSFER", "BY_THE_HOUR", "PRIVATE_TRANSFER", "AIRPORT_TRANSFER"];
      
      if (withoutIdTypes.includes(body.serviceType)) {
        res = await createBookingWithoutId({ body }).unwrap();
      } else {
        const serviceId = transferRoute?.id || transferRoute?._id || "60d5ec49f3b0b30015f8e500";
        res = await createBookingUsingServiceId({ serviceId, body }).unwrap();
      }
      const id = res?.data?.id || res?.data?._id || "";
      if (id) setBookingId(id);
      setShowModal(true);
    } catch (e) {
      console.error("Booking failed", e);
      alert("Failed to process booking. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col pb-24">
      <Header2 />

      <div className="flex-1 py-10 sm:py-12 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step progress */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                1
              </div>
              <span className="hidden sm:inline">Trip Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                2
              </div>
              <span className="hidden sm:inline">Choose Vehicle</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                3
              </div>
              <span className="hidden sm:inline">Add Stops</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-2" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold">
                4
              </div>
              <span className="hidden sm:inline">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                5
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6 sm:mb-8 mt-2 sm:mt-4 flex justify-between items-end">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
              Step 4: Passenger Details
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
              Please provide your contact information and any special
              requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            {/* Passenger details card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-8 mb-6 sm:mb-8">
              {/* Contact information */}
              <div className="mb-6 sm:mb-7">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className="h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                <textarea
                  id="special-requests"
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
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
                  <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-xs sm:text-sm text-gray-700 cursor-pointer hover:border-blue-500">
                    <input
                      type="checkbox"
                      checked={childSeat}
                      onChange={(e) => setChildSeat(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Child Seat Required</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-xs sm:text-sm text-gray-700 cursor-pointer hover:border-blue-500">
                    <input
                      type="checkbox"
                      checked={wheelchair}
                      onChange={(e) => setWheelchair(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Wheelchair Accessibility</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Booking summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 sticky top-24">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">
                Booking Summary
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-gray-700 mb-5">
                <div>
                  <span className="text-gray-500 block mb-1">Route</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-2">
                    {pickupParam} <span className="text-gray-400">→</span>{" "}
                    {dropoffParam}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Date & Time</span>
                  <span className="font-semibold text-gray-900">
                    {formattedDate} at {timeParam}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Passengers</span>
                  <span className="font-semibold text-gray-900">
                    {adults + children} Passengers ({adults} Adults, {children}{" "}
                    Children)
                  </span>
                </div>
                {selectedStops.length > 0 && (
                  <div>
                    <span className="text-gray-500 block mb-1">
                      Included Stops
                    </span>
                    <ul className="space-y-1">
                      {selectedStops.map((stop, i) => (
                        <li
                          key={i}
                          className="font-medium text-blue-600 flex justify-between"
                        >
                          <span>• {stop.name}</span>
                          <span>€{stop.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Transport
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    €{transportPrice}
                  </span>
                </div>
                {stopsCost > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Stops
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      €{stopsCost}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-100">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    €{totalPrice}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-700 font-medium">
                  Free cancellation up to 24 hours before your pickup time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="fixed bottom-6 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
          <div className="max-w-7xl mx-auto flex justify-start">
            <div className="w-full lg:w-[65%] pointer-events-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 sm:p-3 px-4 sm:px-6 flex items-center justify-between border border-gray-100">
              <Button
                asChild
                variant="ghost"
                className="text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 text-sm sm:text-base px-3 py-2 h-auto rounded-xl"
              >
                <Link href={`/booking-flow/step-3?${searchParams.toString()}`}>
                  ← Back
                </Link>
              </Button>

              <Button
                type="button"
                onClick={handleBooking}
                disabled={isLoading || !firstName || !lastName || !email}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 sm:px-8 py-2.5 sm:py-3 h-auto shadow-md hover:shadow-lg transition-all text-sm sm:text-base disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Complete Booking"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Tour status modal (Success Booking placeholder for now) */}
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

            <h2 className="text-lg sm:text-xl font-semibold text-green-600 mb-1 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              Booking Confirmed!
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Your transfer booking has been successfully created. You will
              receive an email confirmation shortly.
            </p>

            <div className="rounded-2xl bg-gray-50 px-4 py-4 mb-5 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Booking Reference</span>
                <span className="text-sm font-bold text-gray-900">
                  #
                  {bookingId || `IG-${Math.floor(1000 + Math.random() * 9000)}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Amount</span>
                <span className="text-sm font-bold text-blue-600">
                  €{totalPrice}
                </span>
              </div>
            </div>

            <Button
              asChild
              className="w-full bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg py-2.5 mt-1"
            >
              <Link
                href={`/booking-flow/payment?${searchParams.toString()}${bookingId ? `&bookingId=${bookingId}` : ""}`}
              >
                Proceed to Payment
              </Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
