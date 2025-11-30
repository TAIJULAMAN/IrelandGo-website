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

export function PopularMultiDayTours() {
  const tours = [
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "/home.png",
      duration: "6h 30m",
      groupType: "Private Group",
      description: "Experience Ireland's most stunning coastal drive with breathtaking views and charming villages.",
      pricePerPerson: "From €125 / per person",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex items-center justify-between mb-12">
            <CarouselPrevious className="static bg-white translate-y-0 border-blue-600 text-blue-600 h-12 w-12 rounded-full" />
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Multi-Day Tours</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover Ireland's most breathtaking destinations with our carefully curated multi-day experiences
              </p>
            </div>
            <CarouselNext className="static bg-white translate-y-0 border-blue-600 text-blue-600 h-12 w-12 rounded-full" />
          </div>

          <CarouselContent className="-ml-6">
            {tours.map((tour, idx) => (
              <CarouselItem key={idx} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-64 w-full">
                    {tour.image.startsWith("linear-gradient") ? (
                      <div className="w-full h-full" style={{ background: tour.image }}></div>
                    ) : (
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{tour.title}</h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                      <span>-</span>
                      <span>{tour.groupType}</span>
                    </div>

                    <div className="flex items-center gap-1 text-blue-600 font-bold text-lg mb-3">
                      <Euro className="w-5 h-5" />
                      <span>{tour.pricePerPerson}</span>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-3 flex-grow leading-relaxed">
                      {tour.description}
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
