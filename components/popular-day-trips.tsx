import { Button } from "@/components/ui/button"
import { Clock, Euro } from "lucide-react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function PopularDayTrips() {
  const trips = [
    {
      id: 1,
      title: "Dublin to Galway via Cliffs",
      description: "Experience Ireland's most stunning coastal drive",
      image: "/dublin-galway-cliffs-of-moher-coastal-drive.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
    {
      id: 2,
      title: "Belfast to Giant's Causeway",
      description: "Discover Northern Ireland's natural wonder",
      image: "/belfast-giants-causeway-natural-wonder.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
    {
      id: 3,
      title: "Limerick to Dingle Peninsula",
      description: "Explore charming coastal villages and beaches",
      image: "/limerick-dingle-peninsula-coastal-villages.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
    {
      id: 4,
      title: "Dublin to Galway via Cliffs of Moher",
      description: "Experience Ireland's most stunning coastal drive",
      image: "/dublin-galway-cliffs-of-moher-coastal-drive.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
    {
      id: 5,
      title: "Belfast to Giant's Causeway",
      description: "Discover Northern Ireland's natural wonder",
      image: "/belfast-giants-causeway-natural-wonder.jpg",
      duration: "6h 30m",
      groupType: "Private group",
      price: "€125",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-12">
            <CarouselPrevious className="static bg-white text-blue-600 border-blue-600 h-12 w-12 rounded-full translate-y-0" />
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Day Trips</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our most popular day trip destinations
              </p>
            </div>
            <CarouselNext className="static bg-white text-blue-600 border-blue-600 h-12 w-12 rounded-full translate-y-0" />
          </div>

          <CarouselContent className="-ml-6">
            {trips.map((trip) => (
              <CarouselItem key={trip.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-64 w-full">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{trip.title}</h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                      <Clock className="w-4 h-4" />
                      <span>{trip.duration}</span>
                      <span>-</span>
                      <span>{trip.groupType}</span>
                    </div>

                    <div className="flex items-center gap-1 text-blue-600 font-bold text-lg mb-3">
                      <Euro className="w-5 h-5" />
                      <span>From {trip.price} / per person</span>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-3 flex-grow leading-relaxed">
                      {trip.description}
                    </p>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl mt-auto text-lg shadow-blue-200 shadow-lg">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
