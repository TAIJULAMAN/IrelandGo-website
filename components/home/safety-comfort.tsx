import {
  Shield,
  Car,
  Clock,
  Accessibility,
  Star,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "../ui/section-header";

export function SafetyComfort() {
  const features = [
    {
      icon: Shield,
      title: "Fully licensed drivers",
      description:
        "All our drivers are professionally licensed, insured, and background-checked.",
      color: "from-blue-400 to-blue-600",
      iconColor: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Car,
      title: "Clean, air-conditioned vehicles",
      description:
        "Modern, well-maintained vehicles with climate control for your comfort.",
      color: "from-blue-500 to-indigo-600",
      iconColor: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: Clock,
      title: "On-time guarantee",
      description:
        "We track your flight and adjust pickup times to ensure punctual service.",
      color: "from-indigo-500 to-violet-600",
      iconColor: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      icon: Accessibility,
      title: "Wheelchair-accessible rides",
      description:
        "Need extra support? We offer vehicles equipped for wheelchair access-just let us know when booking.",
      color: "from-violet-500 to-purple-600",
      iconColor: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-8 md:py-12 bg-gray-100 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          title="Safety & Comfort"
          description="Your well-being is our top priority. We go above and beyond to ensure every journey is safe, relaxing, and completely stress-free."
          className="mb-10 md:mb-16 text-center"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5 flex-1">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-500 bg-white/50 hover:bg-white hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/80 hover:border-blue-100 backdrop-blur-sm overflow-hidden"
                  >
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/60 to-transparent rounded-tl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex-shrink-0 relative z-10">
                      <div className="relative">
                        {/* Hover Glow */}
                        <div
                          className={`absolute -inset-2 bg-gradient-to-br ${feature.color} rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                        />

                        {/* Icon Container */}
                        <div
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${feature.bg} group-hover:bg-white rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 border border-transparent group-hover:border-gray-100/80 shadow-sm group-hover:shadow-xl`}
                        >
                          <div
                            className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                          />
                          <Icon
                            className={`w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 ${feature.iconColor} group-hover:scale-110 transition-transform duration-500`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 flex-1">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-lg md:text-xl mb-1.5 group-hover:text-blue-700 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative lg:ml-8 flex flex-col justify-between group">
            <div className="relative flex-1 flex flex-col mb-5 md:mb-0 lg:pb-5">
              <div className="absolute -inset-6 md:-inset-10 bg-gradient-to-tr from-blue-300 via-indigo-200 to-purple-200 rounded-[3rem] blur-3xl opacity-50 mix-blend-multiply transition-all duration-700 group-hover:opacity-70 group-hover:scale-105" />
              <div className="absolute -left-6 -bottom-6 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-40 animate-pulse mix-blend-multiply pointer-events-none" />
              <div className="absolute -right-6 -top-6 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full blur-2xl opacity-40 animate-pulse delay-700 mix-blend-multiply pointer-events-none" />

              <div className="relative h-64 sm:h-80 lg:h-auto min-h-[256px] w-full rounded-[1.5rem] overflow-hidden flex-1">
                <Image
                  src="/Safety&Comfort.jpg"
                  alt="Safety and Comfort"
                  fill
                  className="object-cover transition-transform duration-1000 origin-center rounded-xl"
                />
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/95 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5 md:gap-2 transform group-hover:-translate-y-1 transition-transform duration-500 z-10">
                  <span className="flex text-yellow-500">
                    <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                  </span>
                  <span className="text-xs md:text-sm font-bold text-gray-900">
                    5.0 Rated
                  </span>
                </div>
              </div>
            </div>

            {/* Under Image Glassmorphic Card */}
            <div className="group relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-500 bg-white/50 hover:bg-white hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/80 hover:border-blue-100 backdrop-blur-sm overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/60 to-transparent rounded-tl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex-shrink-0 relative z-10">
                <div className="relative">
                  {/* Hover Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                  {/* Icon Container */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-50 group-hover:bg-white rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 border border-transparent group-hover:border-gray-100/80 shadow-sm group-hover:shadow-xl">
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                    <BadgeCheck className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-gray-900 text-sm sm:text-lg md:text-xl mb-1.5 group-hover:text-blue-700 transition-colors duration-300">
                  Your Safety First
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 line-clamp-2">
                  Rigorous vehicle inspections and strict safety standards
                  ensure you travel with complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
