import { Clock, ShieldCheck, Euro } from "lucide-react";
import { SectionHeader } from "../ui/section-header";

const benefits = [
  {
    icon: Clock,
    title: "Always On Time",
    description:
      "Professional drivers who value punctuality and ensure you reach your destination on schedule.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Licensed drivers, insured vehicles, and 24/7 customer support for your peace of mind.",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    icon: Euro,
    title: "Fair Pricing",
    description:
      "Transparent pricing with no hidden fees. Get the best value for your journey.",
    color: "from-violet-400 to-violet-600",
  },
];

export default function AirportTransfersWhyChoose() {
  return (
    <section className="relative py-10 md:py-16 bg-gray-50/50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 relative z-10">
        <SectionHeader
          title="Travel Better with Tourenzo Transfers"
          description="Experience the difference with our premium transfer services across Ireland."
          className="mb-8 sm:mb-12"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col items-center text-center p-3.5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-md border border-gray-100 hover:border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-10 overflow-hidden ${
                idx === 2 ? "col-span-2 md:col-span-1" : "col-span-1"
              }`}
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-2xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:scale-110 relative z-10 group-hover:-rotate-3">
                <benefit.icon className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600 group-hover:text-white transition-colors duration-500" />
              </div>

              <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                {benefit.title}
              </h3>
              <p className="text-[11px] sm:text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-3 sm:line-clamp-none">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
