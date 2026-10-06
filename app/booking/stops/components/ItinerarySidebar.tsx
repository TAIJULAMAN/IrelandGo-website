import React from "react";
import Image from "next/image";
import { MapPin, X, Users, Briefcase, Car, CheckCircle2 } from "lucide-react";

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

export function ItinerarySidebar({
  formattedDate,
  pickupParam,
  timeParam,
  dropoffParam,
  dropoffTimeStr,
  selectedStops,
  toggleStop,
  adults,
  children,
  extraBags,
  vehicleName,
  transportPrice,
  stopsCost,
  totalPrice,
}: any) {
  return (
    <>
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6 sticky top-24">
          <h2 className="text-xl font-bold text-gray-900">Itinerary</h2>

          <div>
            <div className="flex justify-between items-center px-2 py-1 mb-4">
              <span className="text-base font-bold text-gray-900">Date</span>
              <span className="text-xs font-semibold text-gray-600">
                {formattedDate || "Select Date"}
              </span>
            </div>

            <div className="relative space-y-6 ml-2">
              <div className="relative">
                <p className="text-base font-bold text-gray-900 mb-4">
                  Pickup :
                </p>
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-900 text-sm">
                    {pickupParam || "Pickup Location"}
                  </p>
                  <p className="text-xs text-gray-500 font-medium whitespace-nowrap ml-2">
                    {timeParam || "9:00 AM"}
                  </p>
                </div>
              </div>
              <div className="relative">
                {/* <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-gray-800" /> */}
                <div className="flex justify-between items-start">
                  <p className="font-bold text-gray-900 text-sm">
                    {dropoffParam || "Dropoff Location"}
                  </p>
                  <p className="text-xs text-gray-500 font-medium whitespace-nowrap ml-2">
                    {dropoffTimeStr}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {selectedStops.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Selected Stops
              </p>
              <div className="space-y-2">
                {selectedStops.map((stop: any) => {
                  const imageUrl =
                    stop.image && stop.image.length > 0
                      ? stop.image[0]
                      : "/Images/DayTrip.webp";
                  return (
                    <div
                      key={stop.id}
                      className="relative flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                        <Image
                          src={imageUrl}
                          alt={stop.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                          {stop.name === "Brú na Bóinne"
                            ? "Newgrange"
                            : stop.name}
                        </h4>
                        {stop.address && (
                          <p className="text-[10px] text-gray-400 font-medium flex items-center gap-0.5 truncate mt-0.5">
                            <MapPin className="h-2.5 w-2.5 text-gray-300 shrink-0" />
                            {stop.address}
                          </p>
                        )}
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            {formatDuration(stop.duration)}
                          </span>
                          <span className="text-[10px] font-bold text-gray-900 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                            €{Number(stop.price) || 0}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStop(stop)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-b border-gray-100 py-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-lg px-2 py-1">
              <Users className="h-3.5 w-3.5 text-gray-500" />
              <span>{adults + children}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-lg px-2 py-1">
              <Briefcase className="h-3.5 w-3.5 text-gray-500" />
              <span>{adults + children + extraBags}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-lg px-2 py-1">
              <Car className="h-3.5 w-3.5 text-gray-500" />
              <span className="truncate max-w-[70px]">{vehicleName}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-lg px-2 py-1">
              <MapPin className="h-3.5 w-3.5 text-gray-500" />
              <span>
                {selectedStops.length} Stop
                {selectedStops.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-900">Price details</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Transport</span>
              <span className="font-semibold text-gray-900">
                €
                {typeof transportPrice === "number" && !isNaN(transportPrice)
                  ? transportPrice
                  : 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Stops</span>
              <span className="font-semibold text-gray-900">
                €
                {typeof stopsCost === "number" && !isNaN(stopsCost)
                  ? stopsCost
                  : 0}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              €
              {typeof totalPrice === "number" && !isNaN(totalPrice)
                ? totalPrice
                : 0}
            </span>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-3">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-700 font-medium">
              Free cancellation up to 24 hours before your pickup time.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile price summary bar – visible only below lg */}
      <div className="lg:hidden mt-4 bg-white rounded-lg shadow-md border border-gray-100 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Total</span>
          <span className="text-xl font-bold text-gray-900">
            €
            {typeof totalPrice === "number" && !isNaN(totalPrice)
              ? totalPrice
              : 0}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {selectedStops.length > 0 && (
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full border border-blue-200">
              {selectedStops.length} stop{selectedStops.length !== 1 ? "s" : ""}{" "}
              selected
            </span>
          )}
          <p className="truncate max-w-[100px] text-xs text-gray-500">
            {vehicleName}
          </p>
        </div>
      </div>
    </>
  );
}
