import { ShieldCheck, Car, Map } from "lucide-react";

export default function ByTheHourDedicationSafety() {
  return (
    <section className="relative w-full py-14 md:py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-slate-900 mb-8">
          Dedication to Safety
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-md ring-1 ring-black/5">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>
            <h3 className="text-center font-semibold text-slate-900">Certified local drivers</h3>
            <p className="text-center text-slate-600 text-sm mt-2">
              All our drivers are licensed, insured, and background-checked professionals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-md ring-1 ring-black/5">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600">
                <Car className="w-5 h-5" />
              </span>
            </div>
            <h3 className="text-center font-semibold text-slate-900">Clean, comfortable vehicles</h3>
            <p className="text-center text-slate-600 text-sm mt-2">
              Modern, well‑maintained fleet with regular safety inspections.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-md ring-1 ring-black/5">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600">
                <Map className="w-5 h-5" />
              </span>
            </div>
            <h3 className="text-center font-semibold text-slate-900">Local expertise</h3>
            <p className="text-center text-slate-600 text-sm mt-2">
              Knowledgeable guides who know the best routes and hidden gems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}