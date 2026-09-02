import {
  UserCheck,
  ShieldCheck,
  Clock,
  Map,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import { SectionHeader } from "../ui/section-header";

export function WhyChooseUs() {
  const features = [
    {
      icon: UserCheck,
      title: "Expert Local Drivers",
      description:
        "Our drivers are knowledgeable local guides who share hidden gems and Ireland's rich history with you.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: ShieldCheck,
      title: "Safety First",
      description:
        "Travel with peace of mind in fully insured, rigorously maintained premium vehicles with vetted professional drivers.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Clock,
      title: "Reliable & Punctual",
      description:
        "We value your time. Count on us for prompt pickups and efficient routes, 24/7, across the country.",
      color: "from-indigo-400 to-indigo-600",
    },
    {
      icon: Sparkles,
      title: "Luxury Fleet",
      description:
        "Experience superior comfort in our modern fleet of sedans and vans.",
      color: "from-indigo-500 to-violet-500",
    },
    {
      icon: Map,
      title: "Custom Itineraries",
      description:
        "Your trip, your way. We offer fully flexible schedules and route planning tailored to your specific interests.",
      color: "from-violet-400 to-violet-600",
    },
    {
      icon: HeartHandshake,
      title: "Transparent Pricing",
      description:
        "No hidden fees or metered surprises. Enjoy fixed, competitive rates for all our premium services.",
      color: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <section className="relative py-8 md:py-12 bg-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-50/50 blur-3xl opacity-70 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-violet-50/50 blur-3xl opacity-70 mix-blend-multiply" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-indigo-50/40 blur-3xl opacity-50 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 relative z-10">
        <SectionHeader
          title="Why Travelers Choose Us"
          subtitle="Our Advantages"
          description="We don't just drive you from A to B. We deliver a seamless, premium travel experience that makes your journey as memorable as the destination."
          alignment="center"
        />

        <div className="mt-8 sm:mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col items-center text-center p-3.5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 hover:-translate-y-2 bg-white/60 backdrop-blur-md border border-gray-100 hover:border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-10 overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                />

                {/* Icon Container */}
                <div className="relative mb-3 sm:mb-6">
                  {/* Outer glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-lg opacity-20 group-hover:opacity-60 transition-opacity duration-500`}
                  />

                  <div
                    className={`relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:border-transparent transition-colors duration-500 z-10`}
                  >
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg sm:rounded-xl`}
                    />
                    <Icon className="relative w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 z-10" />
                  </div>
                </div>

                <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-3 sm:line-clamp-none">
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
