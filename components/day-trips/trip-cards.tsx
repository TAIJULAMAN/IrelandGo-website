"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const trips = [
  {
    id: 1,
    title: "Dublin to Galway via Cliffs of Moher",
    description: "Ireland's most iconic road trip",
    duration: "8h 30m",
    groupSize: "Private group",
    price: "€153",
    image:
      "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Belfast to Giant's Causeway",
    description: "Discover Northern Ireland's natural wonder",
    duration: "8h 30m",
    groupSize: "Private group",
    price: "€125",
    image:
      "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Cork to Ring of Kerry",
    description: "Journey through Ireland's most scenic route",
    duration: "8h 30m",
    groupSize: "Private group",
    price: "€135",
    image:
      "https://images.pexels.com/photos/15092338/pexels-photo-15092338.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Limerick to Dingle Peninsula",
    description: "Explore charming coastal villages and beaches",
    duration: "8h 30m",
    groupSize: "Private group",
    price: "€142",
    image:
      "https://images.pexels.com/photos/11880886/pexels-photo-11880886.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Killarney to Skellig Michael",
    description: "Visit the ancient monastic island",
    duration: "8h 30m",
    groupSize: "Private group",
    price: "€165",
    image:
      "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    title: "Galway to Connemara",
    description: "Explore rugged landscapes and wild beauty",
    duration: "8h 30m",
    groupSize: "Private group",
    price: "€148",
    image:
      "https://images.pexels.com/photos/11880886/pexels-photo-11880886.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const cities = ["Popular", "Dublin", "Belfast", "Cork", "Limerick", "Galway"];

export default function TripCards() {
  const [selectedCity, setSelectedCity] = useState("Popular");

  return (
    <div className="px-5 md:px-0 py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
        Explore the world with our 1500+ day trips!
      </h2>

      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-6 py-2.5 rounded-full font-medium transition ${
              selectedCity === city
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full container mx-auto"
      >
        <CarouselContent className="-ml-4">
          {trips.map((trip) => (
            <CarouselItem
              key={trip.id}
              className="pl-4 md:basis-1/2 lg:basis-1/4"
            >
              <Link href={`/day-trips/day-trip-details`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1.5 text-base leading-tight">
                      {trip.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      {trip.description}
                    </p>
                    <div className="text-xs text-gray-600 mb-3">
                      {trip.duration} · {trip.groupSize}
                    </div>
                    <p className="text-gray-900 text-sm">
                      <span className="font-semibold">From {trip.price}</span> /
                      per person
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white text-white hover:bg-blue-700 border-0 w-10 h-10 -left-12" />
        <CarouselNext className="bg-white text-white hover:bg-blue-700 border-0 w-10 h-10 -right-12" />
      </Carousel>
    </div>
  );
}
