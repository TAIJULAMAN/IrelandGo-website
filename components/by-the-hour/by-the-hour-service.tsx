import { Route, Map, Clock, UserSquare2 } from "lucide-react";

export default function ByTheHourService() {
  const features = [
    {
      icon: Route,
      title: "Add stops & explore More",
      desc: "Customize your journey with multiple destinations",
    },
    {
      icon: Map,
      title: "100+ destinations",
      desc: "Explore every corner of beautiful Ireland",
    },
    {
      icon: Clock,
      title: "Your schedule, your Way",
      desc: "Travel at your own pace and timing",
    },
    {
      icon: UserSquare2,
      title: "Professional drivers",
      desc: "English-speaking local experts",
    },
  ];

  return (
    <section className="relative w-full py-14 md:py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl p-6 shadow-md ring-1 ring-black/5">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600">
                <Icon className="w-5 h-5" />
              </span>
            </div>
            <h3 className="text-center font-semibold text-slate-900">{title}</h3>
            <p className="text-center text-slate-600 text-sm mt-2">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}