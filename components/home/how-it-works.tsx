import { MapPin, CalendarRange, CreditCard, UserCheck, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: MapPin,
      title: "Choose Your Service",
      description: "Select from Private Transfers, hourly chauffeur service, or custom Day Trips across Ireland.",
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple 4 Steps to Start Your Journey
          </h2>
          <p className="text-gray-600 text-lg">
            Booking your premium transport in Ireland has never been easier.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                <div className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100 bg-white md:bg-transparent">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <Icon className="w-8 h-8 text-white" />
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
                  <div className="md:hidden flex justify-center py-4">
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
