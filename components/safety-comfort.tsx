import { Shield, Car, Clock, Accessibility } from "lucide-react"
import Image from "next/image"

export function SafetyComfort() {
  const features = [
    {
      icon: Shield,
      title: "Fully licensed drivers",
      description: "All our drivers are professionally licensed, insured, and background-checked.",
    },
    {
      icon: Car,
      title: "Clean, air-conditioned vehicles",
      description: "Modern, well-maintained vehicles with climate control for your comfort.",
    },
    {
      icon: Clock,
      title: "On-time guarantee",
      description: "We track your flight and adjust pickup times to ensure punctual service.",
    },
    {
      icon: Accessibility,
      title: "Wheelchair-accessible rides",
      description: "Need extra support? We offer vehicles equipped for wheelchair access-just let us know when booking.",
    },
  ]

  return (
    <section className="container mx-auto px-5 md:px-0 py-10 md:py-16 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-5 md:gap-10 items-center">
        <div className="space-y-4 md:space-y-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-12">Safety & Comfort</h2>
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="flex gap-3 md:gap-5">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative h-64 md:h-[500px] w-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/safe.png"
            alt="Safety and Comfort"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
