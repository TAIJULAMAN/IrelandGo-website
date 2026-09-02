"use client";

import { use } from "react";
import DayTripsDetailsHero from "@/components/day-trips/day-trips-details/day-trips-details-hero";
import TripItinerary from "@/components/day-trips/day-trips-details/trip-Itinerary";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";
import { useGetSingleDayTripQuery } from "@/Redux/features/dayTrip/dayTripApi";

export default function DayTripDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: response, isLoading } = useGetSingleDayTripQuery(id);

  const trip = response?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading your trip details...
          </p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trip Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the day trip you're looking for.
          </p>
          <a
            href="/day-trips"
            className="text-blue-600 font-semibold hover:underline"
          >
            Return to Day Trips
          </a>
        </div>
      </div>
    );
  }

  return (
    <main>
      <DayTripsDetailsHero trip={trip} />
      <TripItinerary trip={trip} />
      <div className="flex justify-center my-12 md:my-16 px-4">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-theme-primary px-10 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Book Now
        </button>
      </div>
      <Testimonials />
      <FAQ />{" "}
    </main>
  );
}
