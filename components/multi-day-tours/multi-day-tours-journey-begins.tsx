import { CheckCircle2, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MultiDayToursJourneyBegins() {
  return (
    <section className="relative py-10 md:py-16 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[5%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/60 blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-50/60 blur-3xl mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-0 lg:px-0 xl:px-0 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Premium Experience</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
              Your Journey Begins with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Confidence
              </span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-lg mb-6 sm:mb-8">
              Arriving in Ireland should feel effortless. With Tourenzo's airport
              transfer service, you're welcomed by a professional driver dedicated
              to making your journey smooth and stress-free. Our transfers combine
              punctuality, comfort, and hospitality, ensuring you travel in style
              from the airport to your destination. Step into a clean,
              air-conditioned vehicle and relax — we'll take care of the rest.
            </p>

            {/* Feature badges */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-10 max-w-lg">
              <div className="group flex items-center gap-2.5 sm:gap-4 rounded-xl bg-white p-2.5 sm:p-3 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 hover:-translate-y-1">
                <div className="p-2 sm:p-3 rounded-lg bg-blue-50 group-hover:bg-blue-600 transition-colors duration-300">
                  <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-base text-gray-900 mb-0.5">Punctual</div>
                  <div className="text-[10px] sm:text-sm text-gray-500">Always on time</div>
                </div>
              </div>
              <div className="group flex items-center gap-2.5 sm:gap-4 rounded-xl bg-white p-2.5 sm:p-3 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 hover:-translate-y-1">
                <div className="p-2 sm:p-3 rounded-lg bg-indigo-50 group-hover:bg-indigo-600 transition-colors duration-300">
                  <Rocket className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-base text-gray-900 mb-0.5">Reliable</div>
                  <div className="text-[10px] sm:text-sm text-gray-500">Professional</div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs sm:text-base font-bold shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span>Book Your Transfer</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Right image */}
          <div className="relative mt-6 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl transform rotate-3 scale-105 opacity-10 blur-lg"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 group">
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
              <img
                src="/confidence.png"
                alt="Professional driver"
                className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-10 sm:mt-16 bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-8 md:p-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1 sm:mb-2">1000+</div>
              <div className="text-gray-500 font-medium text-xs sm:text-sm md:text-base">Happy Customers</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-500 font-medium text-xs sm:text-sm md:text-base">Available Service</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1 sm:mb-2">5★</div>
              <div className="text-gray-500 font-medium text-xs sm:text-sm md:text-base">Average Rating</div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1 sm:mb-2">100%</div>
              <div className="text-gray-500 font-medium text-xs sm:text-sm md:text-base">On-Time Arrivals</div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
