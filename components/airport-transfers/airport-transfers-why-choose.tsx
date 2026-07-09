import { Clock, ShieldCheck, Euro } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Always On Time",
    description: "Professional drivers who value punctuality and ensure you reach your destination on schedule.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Licensed drivers, insured vehicles, and 24/7 customer support for your peace of mind.",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    icon: Euro,
    title: "Fair Pricing",
    description: "Transparent pricing with no hidden fees. Get the best value for your journey.",
    color: "from-violet-400 to-violet-600",
  },
];

export default function AirportTransfersWhyChoose() {
  return (
    <section className="relative py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Travel Better with Tourenzo Transfers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our premium transfer services across Ireland.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-md border border-gray-100 hover:border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-10 overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
              
              {/* Icon Container */}
              <div className="relative mb-6">
                {/* Outer glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-xl blur-lg opacity-20 group-hover:opacity-60 transition-opacity duration-500`} />
                
                <div className={`relative w-16 h-16 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:border-transparent transition-colors duration-500 z-10`}>
                   {/* Gradient overlay on hover */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                   <benefit.icon className="relative w-8 h-8 text-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 z-10" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}