import { UserCheck, ShieldCheck, Clock, Map, Sparkles, HeartHandshake } from "lucide-react";
import { SectionHeader } from "../ui/section-header";

export function WhyChooseUs() {
  const features = [
    {
      icon: UserCheck,
      title: "Expert Local Drivers",
      description: "Our drivers are knowledgeable local guides who share hidden gems and Ireland's rich history with you.",
    },
    {
      icon: ShieldCheck,
      title: "Safety First",
      description: "Travel with peace of mind in fully insured, rigorously maintained premium vehicles with vetted professional drivers.",
    },
    {
      icon: Clock,
      title: "Reliable & Punctual",
      description: "We value your time. Count on us for prompt pickups and efficient routes, 24/7, across the country.",
    },
    {
      icon: Sparkles,
      title: "Luxury Fleet",
      description: "Experience superior comfort in our modern fleet of sedans and vans.",
    },
    {
      icon: Map,
      title: "Custom Itineraries",
      description: "Your trip, your way. We offer fully flexible schedules and route planning tailored to your specific interests.",
    },
    {
      icon: HeartHandshake,
      title: "Transparent Pricing",
      description: "No hidden fees or metered surprises. Enjoy fixed, competitive rates for all our premium services.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 ">
        <SectionHeader
          title="Why Travelers Choose Us"
          subtitle="Our Advantages"
          description="We don't just drive you from A to B. We deliver a seamless, premium travel experience that makes your journey as memorable as the destination."
          alignment="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col justify-center items-center text-center bg-white p-8 rounded-lg shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-lg bg-blue-50 group-hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
