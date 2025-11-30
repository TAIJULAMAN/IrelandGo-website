import { Button } from "@/components/ui/button"
import Image from "next/image"

export function BookWithEase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-7xl font-bold mb-6 text-gray-900">
              Book with ease on <span className="text-blue-600">any device</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Access seamless booking, real-time tracking, and exclusive offers directly from our website. No app needed!
            </p>
            <div className="flex gap-4 mt-10">
              <Button className="bg-blue-600 text-xs text-white px-8 py-6 text-lg rounded-xl">
                Start Booking Now
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 bg-gray-50 px-8 py-6 text-lg rounded-xl">
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative h-[600px]  w-[800px]">
            <Image
              src="/book.png"
              alt="Mobile Booking Interface"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
