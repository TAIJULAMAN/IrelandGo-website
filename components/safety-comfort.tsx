import { Shield, Wind, Accessibility, AlertCircle } from "lucide-react"

export function SafetyComfort() {
  const features = [
    {
      icon: Shield,
      title: "Fully insured drivers",
      description: "Our drivers are fully insured and vetted for your safety and peace of mind",
    },
    {
      icon: Wind,
      title: "Clean air-conditioned vehicles",
      description: "All our vehicles are regularly cleaned and maintained with A/C",
    },
    {
      icon: Accessibility,
      title: "Wheelchair accessible cars",
      description: "We offer wheelchair accessible vehicles for guests with mobility needs",
    },
    {
      icon: AlertCircle,
      title: "Professional assistance available",
      description: "Our team is available 24/7 to assist with any requirements",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-balance">Safety & Comfort</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <p>Car Interior Image</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
