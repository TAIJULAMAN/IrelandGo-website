import { Star } from "lucide-react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing experience! Our driver was knowledgeable and showed us hidden gems we never would have found on our own.",
      rating: 5,
      source: "Tripadvisor",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Michael Chen",
      text: "Professional service from start to finish. The vehicle was spotless and our driver made the journey so enjoyable.",
      rating: 5,
      source: "Trustpilot",
      image: "/placeholder-user.jpg",
    },
    {
      name: "Emma Wilson",
      text: "Exceeded our expectations! Flexible timing and the driver's local knowledge made our trip unforgettable.",
      rating: 5,
      source: "Google",
      image: "/placeholder-user.jpg",
    },
    {
      name: "David Thompson",
      text: "The best way to see Ireland. Comfortable car, safe driving, and excellent recommendations for lunch stops.",
      rating: 5,
      source: "Tripadvisor",
      image: "/placeholder-user.jpg",
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
              <h2 className="text-4xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
              <p className="text-gray-600">Trusted by 1,000,000+ happy travelers</p>
            </div>
            <CarouselNext className="static bg-white text-blue-600 border-blue-600 h-12 w-12 rounded-full translate-y-0" />
          </div>

          <CarouselContent className="-ml-6">
            {testimonials.map((testimonial, idx) => (
              <CarouselItem key={idx} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-blue-600 text-blue-600" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed flex-grow">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.source}</p>
                    </div>
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
