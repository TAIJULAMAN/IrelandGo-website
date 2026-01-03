import { ShieldCheck, Car, Map } from "lucide-react";

export default function ByTheHourDedicationSafety() {
  const safetyFeatures = [
    {
      icon: ShieldCheck,
      title: "Certified local drivers",
      desc: "All our drivers are licensed, insured, and background-checked professionals."
    },
    {
      icon: Car,
      title: "Clean, comfortable vehicles",
      desc: "Modern, well‑maintained fleet with regular safety inspections."
    },
    {
      icon: Map,
      title: "Local expertise",
      desc: "Knowledgeable guides who know the best routes and hidden gems."
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-blue-50">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Dedication to Safety
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {safetyFeatures.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-black/5"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-center font-bold text-gray-900 text-lg mb-3">{title}</h3>
              <p className="text-center text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}