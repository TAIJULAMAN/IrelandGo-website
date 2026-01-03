"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { irishSettlements } from "@/lib/irish-settlements";
import Link from "next/link";

export default function SightsAlongTheWay() {
  const searchParams = useSearchParams();
  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // Find settlement data
  const pickupSettlement = irishSettlements.find(s => s.name === pickupParam);
  const dropoffSettlement = irishSettlements.find(s => s.name === dropoffParam);

  // Combine popular places from both locations (max 4)
  const popularPlaces = [
    ...(pickupSettlement?.popularPlaces || []),
    ...(dropoffSettlement?.popularPlaces || [])
  ].slice(0, 4);

  // If no places found, show default message
  if (popularPlaces.length === 0) {
    return (
      <section className="bg-white py-10 sm:py-16">
        <div className="container mx-auto px-5 md:px-0 lg:px-0">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-7 md:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              Sights Along the Way
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-7 max-w-3xl">
              Select your pickup and dropoff locations to see popular attractions along your route.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <Link href="/booking-flow/step-2">
            <Button className="px-8 sm:px-10 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors">
              Book This Journey Now
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="container mx-auto px-5 md:px-0 lg:px-0">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-7 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Popular Places in {pickupParam && dropoffParam ? `${pickupParam} & ${dropoffParam}` : 'Your Destinations'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-7 max-w-3xl">
            Discover amazing attractions and landmarks in your pickup and dropoff locations.
            {pickupParam && dropoffParam && ` Traveling from ${pickupParam} to ${dropoffParam} offers unique experiences.`}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
            {popularPlaces.map((place, index) => (
              <div
                key={`${place.name}-${index}`}
                className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="px-3 sm:px-4 py-3">
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {place.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Must-see attraction
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">

            <Button
              onClick={scrollToTop}
              className="px-8 sm:px-10 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors">
              Book This Journey Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
