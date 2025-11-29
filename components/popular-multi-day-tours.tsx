import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"

export function PopularMultiDayTours() {
  const tours = [
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
      days: "3 Days",
      locations: "3 Locations",
      price: "From €299",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "linear-gradient(135deg, #34495e 0%, #16a085 100%)",
      days: "3 Days",
      locations: "3 Locations",
      price: "From €299",
    },
    {
      title: "Dublin to Galway via Cliffs of Moher",
      image: "linear-gradient(135deg, #16a085 0%, #1abc9c 100%)",
      days: "3 Days",
      locations: "3 Locations",
      price: "From €299",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-balance">Popular Multi-Day Tours</h2>
        <p className="text-center text-gray-600 mb-16">Experience Ireland like never before</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {tours.map((tour, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="h-48 bg-gradient-to-br" style={{ background: tour.image }}></div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{tour.title}</h3>
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{tour.days}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{tour.locations}</span>
                  </div>
                </div>
                <p className="font-bold text-blue-600 mb-4">{tour.price}</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Book Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
