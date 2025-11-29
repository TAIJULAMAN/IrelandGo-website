import { Button } from "@/components/ui/button"
import { Smartphone } from "lucide-react"

export function BookWithEase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-balance">Book with ease on any device</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Our mobile-friendly platform makes it easy to book your transfer or tour from anywhere, anytime. Whether
              you're using a smartphone, tablet, or computer, the booking process is quick and simple.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Start Booking Now</Button>
          </div>

          <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg p-6 flex items-center justify-center h-96">
            <div className="text-center text-gray-500">
              <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Mobile Booking Interface</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
