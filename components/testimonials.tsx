import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Excellent service! The driver was punctual, courteous and very knowledgeable. Would definitely book again.",
      rating: 5,
    },
    {
      name: "Michael O'Brien",
      text: "Professional and reliable. The entire journey was comfortable and the driver knew all the best routes.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      text: "Amazing experience from start to finish. Highly recommended for anyone visiting Ireland.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-balance">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-16">Thousands of satisfied customers</p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
