"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date") || "";
  const carPriceParam = searchParams.get("carPrice");
  const tripType = searchParams.get("tripType") || "one-way";
  const bookingId = searchParams.get("bookingId") || "";
  const selectedStopsParam = searchParams.get("selectedStops");
  const transferRouteParam = searchParams.get("transferRoute");
  const vehicleId = searchParams.get("vehicleId");

  let selectedStops: any[] = [];
  try {
    if (selectedStopsParam) selectedStops = JSON.parse(selectedStopsParam);
  } catch (e) { }

  let transferRoute: any = null;
  try {
    if (transferRouteParam) transferRoute = JSON.parse(transferRouteParam);
  } catch (e) { }

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
  } catch (e) { }

  const bookingRef = bookingId
    ? `#${bookingId.slice(0, 8).toUpperCase()}`
    : `#IG-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col py-20">
      <div className="print:hidden">      </div>

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
        {/* What's Next */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 print:hidden">
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
        <div className="bg-blue-600 rounded-lg p-6 sm:p-8 text-white relative overflow-hidden print:hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Need assistance?</h3>
            <p className="text-sm text-blue-100 mb-6 max-w-md">
              Our support team is available 24/7 to help you with any questions
              about your booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                asChild
                variant="secondary"
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg"
              >
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
