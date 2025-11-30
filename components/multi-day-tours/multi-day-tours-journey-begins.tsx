import { CheckCircle2, Rocket } from "lucide-react";

export default function MultiDayToursJourneyBegins() {
  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Your Journey Begins with{" "}
            <span className="text-blue-600">Confidence</span>
          </h2>
          <p className="mt-4 text-slate-600">
            Arriving in Ireland should feel effortless. With IrelandGO's airport
            transfer service, you're welcomed by a professional driver dedicated
            to making your journey smooth and stress-free. Our transfers combine
            punctuality, comfort, and hospitality, ensuring you travel in style
            from the airport to your destination. Step into a clean,
            air-conditioned vehicle and relax — we'll take care of the rest.
          </p>

          {/* Feature badges */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
            <div className="flex items-center gap-2 rounded-full bg-white">
              <div className="p-2 rounded bg-blue-50">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-slate-900">Punctual</div>
                <div className="text-slate-500">Always on time</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white">
              <div className="p-2 rounded bg-blue-50">
                <Rocket className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-slate-900">Reliable</div>
                <div className="text-slate-500">Professional service</div>
              </div>
            </div>
          </div>

          <button className="mt-5 flex items-center justify-center px-10 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-sm">
            Book Your Transfer
          </button>
        </div>

        {/* Right image */}
        <div>
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <img
              src="/confidence.png"
              alt="Professional driver"
              className="w-full h-64 md:h-90 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-extrabold text-slate-900">500+</div>
            <div className="text-slate-500 text-sm">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">24/7</div>
            <div className="text-slate-500 text-sm">Available Service</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">5★</div>
            <div className="text-slate-500 text-sm">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">100%</div>
            <div className="text-slate-500 text-sm">On-Time Arrivals</div>
          </div>
        </div>
      </div>
    </section>
  );
}
