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
    <section className="relative w-full py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-white relative overflow-hidden flex flex-col items-center"
            >
              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:scale-110 relative z-10 group-hover:-rotate-3">
                <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-center font-bold text-gray-900 text-lg mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 relative z-10 leading-tight">
                {title}
              </h3>
              <p className="text-center text-gray-600 leading-relaxed text-sm relative z-10 group-hover:text-gray-700 transition-colors">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}