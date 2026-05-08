"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { useGetAllDayTripsQuery } from "@/Redux/features/dayTrip/dayTripApi";

const cities = ["Killarney", "Dublin", "Belfast", "Cork", "Limerick", "Galway"];

export default function TripCards() {
  const [selectedCity, setSelectedCity] = useState("Dublin");
  const { data: response, isLoading } = useGetAllDayTripsQuery(undefined);

  const allTrips = response?.data || [];

  const filteredTrips = allTrips.filter((trip: any) => {
    return trip.from?.toLowerCase().includes(selectedCity.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading day trips...</p>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-0 py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
        Explore the world with our 100+ day trips!
      </h2>

      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-6 py-2.5 rounded-full font-medium transition ${selectedCity === city
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            {city}
          </button>
        ))}
      </div>

      {filteredTrips.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            loop: filteredTrips.length > 4,
          }}
          className="w-full container mx-auto"
        >
          <CarouselContent className="-ml-4">
            {filteredTrips.map((trip: any) => (
              <CarouselItem
                key={trip.id}
                className="pl-4 md:basis-1/2 lg:basis-1/4"
              >
                <Link href={`/day-trips/day-trip-details/${trip.id}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 h-full flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={trip.images?.[0] || "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=800"}
                        alt={trip.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {/* {trip.isPopular && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          Popular
                        </div>
                      )} */}
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-bold text-gray-900 mb-1.5 text-base leading-tight line-clamp-2">
                        {trip.title}
                      </h3>
                      <div
                        className="text-gray-500 text-sm mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: trip.description }}
                      />
                      <div className="text-xs text-gray-600 mb-3">
                        {trip.travelTimeMinutes ? `${Math.floor(trip.travelTimeMinutes / 60)}h ${trip.travelTimeMinutes % 60}m` : "N/A"} · {trip.groupType}
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-blue-600">€{trip.price}</span>
                        <span className="text-xs text-gray-400">per person</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white px-8 py-2.5 rounded-full font-medium transition shadow-md hover:bg-blue-700">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-white text-blue-600 hover:bg-blue-50 border border-gray-200 w-10 h-10 -left-12" />
          <CarouselNext className="hidden md:flex bg-white text-blue-600 hover:bg-blue-50 border border-gray-200 w-10 h-10 -right-12" />
        </Carousel>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 mx-auto max-w-2xl">
          <p className="text-gray-500 text-lg">No day trips found for {selectedCity}.</p>
        </div>
      )}
    </div>
  );
}

