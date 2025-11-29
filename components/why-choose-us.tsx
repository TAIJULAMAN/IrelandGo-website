import { Users, CheckCircle, MessageSquare } from "lucide-react"

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Users,
      title: "Experienced drivers",
      description: "Our team has years of experience providing the best service in the industry",
    },
    {
      icon: CheckCircle,
      title: "Best rates in town",
      description: "We offer competitive pricing without compromising on quality and comfort",
    },
    {
      icon: MessageSquare,
      title: "Easy communication",
      description: "Contact us anytime for queries or special requests regarding your journey",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-balance">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon
            return (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
