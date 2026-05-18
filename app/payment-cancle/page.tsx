"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, MapPin, Car, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();

  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";
  const carPriceParam = searchParams.get("carPrice");
  const tripType = searchParams.get("tripType") || "one-way";
  const vehicleId = searchParams.get("vehicleId");
  const selectedStopsParam = searchParams.get("selectedStops");

  let selectedStops: any[] = [];
  try {
    if (selectedStopsParam) selectedStops = JSON.parse(selectedStopsParam);
  } catch (e) {}

  const { data: vehiclesData } = useGetVehiclesQuery({});
  const vehicles = vehiclesData?.data?.data || [];

  let vehicleName = "Standard Vehicle";
  if (vehicleId && vehicles.length > 0) {
    const selectedVehicles = vehicleId
      .split("+")
      .map((id: string) => vehicles.find((v: any) => v.id === id))
      .filter(Boolean);
    if (selectedVehicles.length > 0) {
      vehicleName = selectedVehicles.map((v: any) => v.name).join(" + ");
    }
  }

  let transportPrice = carPriceParam ? parseFloat(carPriceParam) : 0;
  const isReturn = tripType === "return";
  if (isReturn) transportPrice = transportPrice * 2;
  const stopsCost = selectedStops.reduce((t: number, s: any) => t + s.price, 0);
  const totalPrice = transportPrice + stopsCost;

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex-1 py-10 sm:py-16 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Cancel Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-12 w-12 text-red-600" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          Your payment was not completed, and your booking has not been
          confirmed yet. Don't worry, your trip details are saved below.
        </p>

        {/* Common issues alert */}
        <div className="w-full flex items-start gap-3 bg-blue-50 rounded-xl p-4 mb-8 text-left">
          <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">
              Common issues:
            </p>
            <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
              <li>Insufficient funds in your account</li>
              <li>Incorrect card details or expired card</li>
              <li>Bank security block for international payments</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button
            asChild
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 h-auto rounded-xl shadow-lg shadow-blue-100"
          >
            <Link href={`/booking-flow/payment?${searchParams.toString()}`}>
              Try Payment Again
            </Link>
          </Button>
          <Button
            asChild
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 h-auto rounded-xl shadow-lg shadow-red-100"
          >
            <Link href="/" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>    </section>
  );
}
