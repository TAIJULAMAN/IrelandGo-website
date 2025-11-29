import { MapPin, MessageSquare, Car, Smile } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      title: "Select your route",
      description: "Tell us where and when you want to travel",
    },
    {
      icon: MessageSquare,
      title: "Add Contact Steps",
      description: "Provide your contact information",
    },
    {
      icon: Car,
      title: "Book your ride",
      description: "Confirm your booking and payment",
    },
    {
      icon: Smile,
      title: "Enjoy your trip",
      description: "Relax and enjoy the comfortable journey",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-balance">How it Works</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
