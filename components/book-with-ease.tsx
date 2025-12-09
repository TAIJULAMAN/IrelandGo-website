import { Button } from "@/components/ui/button"
import Image from "next/image"

export function BookWithEase() {
  return (
    <section className="container mx-auto px-5 md:px-0 py-10 md:py-16 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-gray-900">
            Book with ease on <span className="text-blue-600">any device</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
            Access seamless booking, real-time tracking, and exclusive offers directly from our website. No app needed!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-10">
            <Button className="bg-blue-600 text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-base lg:text-lg rounded-xl">
              Start Booking Now
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 bg-gray-50 px-6 md:px-8 py-4 md:py-6 text-sm md:text-base lg:text-lg rounded-xl">
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="relative h-64 md:h-96 lg:h-[600px] w-full md:w-auto">
          <Image
            src="/book.png"
            alt="Mobile Booking Interface"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
