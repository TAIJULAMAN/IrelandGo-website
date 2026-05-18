import { MapPin, CalendarRange, CreditCard, UserCheck, ArrowRight } from "lucide-react";
import { SectionHeader } from "../ui/section-header";

export function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      title: "Choose Your Service",
      description: "Select from Private Transfers, By The Hour, or custom Day Trips across Ireland.",
    },
    {
      icon: CalendarRange,
      title: "Customize Details",
      description: "Pick your date, time, vehicle type, and add special requirements like child seats.",
    },
    {
      icon: CreditCard,
      title: "Secure Booking",
      description: "Pay securely online with instant confirmation. No hidden fees or surprise charges.",
    },
    {
      icon: UserCheck,
      title: "Meet Your Driver",
      description: "Your professional, English-speaking driver will meet you at the designated pickup point.",
    },
  ];

  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-18 xl:py-20 bg-white">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <SectionHeader
          title="Simple 4 Steps to Start Your Journey"
          subtitle="How It Works"
          description="Booking your premium transport in Ireland has never been easier."
          alignment="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 lg:gap-10 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                <div className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100 bg-white lg:bg-transparent">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-blue-100 shadow-lg shadow-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <Icon className="w-8 h-8 text-blue-600" />
                    {/* Step number badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center font-bold text-blue-600 text-sm shadow-sm">
                      {idx + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Arrow */}
                {idx < steps.length - 1 && (
                  <div className="sm:hidden flex justify-center py-4">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
