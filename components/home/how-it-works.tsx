import { MapPin, CalendarRange, CreditCard, UserCheck } from "lucide-react";
import { SectionHeader } from "../ui/section-header";

export function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      title: "Choose Your Service",
      description: "Select from Private Transfers, By The Hour, or custom Day Trips across Ireland.",
      color: "from-blue-400 to-blue-600",
      shadow: "shadow-blue-500/20"
    },
    {
      icon: CalendarRange,
      title: "Customize Details",
      description: "Pick your date, time, vehicle type, and add special requirements like child seats.",
      color: "from-blue-500 to-indigo-600",
      shadow: "shadow-indigo-500/20"
    },
    {
      icon: CreditCard,
      title: "Secure Booking",
      description: "Pay securely online with instant confirmation. No hidden fees or surprise charges.",
      color: "from-indigo-500 to-violet-600",
      shadow: "shadow-violet-500/20"
    },
    {
      icon: UserCheck,
      title: "Meet Your Driver",
      description: "Your professional, English-speaking driver will meet you at the designated pickup point.",
      color: "from-violet-500 to-purple-600",
      shadow: "shadow-purple-500/20"
    },
  ];

  return (
    <section className="py-12 md:py-16 xl:py-20 relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-50/50 blur-3xl opacity-80 mix-blend-multiply" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-50/50 blur-3xl opacity-80 mix-blend-multiply" />
        <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] rounded-full bg-violet-50/30 blur-3xl opacity-50 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-0 relative z-10">
        <SectionHeader
          title="Simple 4 Steps to Start Your Journey"
          subtitle="How It Works"
          description="Booking your premium transport in Ireland has never been easier."
          alignment="center"
        />

        <div className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden lg:block absolute top-[3rem] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-100 via-indigo-100 to-violet-100 -z-10" />

            {/* Animated Dashed Line (Overlay) */}
            <div className="hidden lg:block absolute top-[3rem] left-[15%] right-[15%] h-[2px] -z-10 overflow-hidden">
              <div className="w-full h-full border-t-2 border-dashed border-blue-300/40" />
            </div>

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  <div className="flex flex-col items-center text-center">
                    {/* Icon Container */}
                    <div className="relative mb-8">
                      {/* Glow effect behind icon */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                      {/* Card itself */}
                      <div className={`relative w-24 h-24 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-xl ${step.shadow} flex items-center justify-center group-hover:-translate-y-2 transition-all duration-500 ease-out`}>
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                        {/* Icon */}
                        <div className="relative z-10 text-gray-700 group-hover:text-blue-600 transition-colors duration-500">
                          <Icon className="w-10 h-10 group-hover:scale-110 transition-transform duration-500 ease-out" />
                        </div>

                        {/* Number Badge */}
                        <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} text-white flex items-center justify-center font-bold text-sm shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform duration-500 ease-out`}>
                          {idx + 1}
                        </div>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="relative z-10 px-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm md:text-base group-hover:text-gray-600 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile connector */}
                  {idx < steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-8 mb-4">
                      <div className="w-[2px] h-10 bg-gradient-to-b from-blue-100 to-transparent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
