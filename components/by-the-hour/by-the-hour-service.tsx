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
    <section className="relative w-full py-14 md:py-16 bg-gray-50">
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

// import { Route, Map, Clock, UserSquare2 } from "lucide-react";

// export default function ByTheHourService() {
//   const features = [
//     {
//       icon: Route,
//       title: "Add stops & explore More",
//       desc: "Customize your journey with multiple destinations",
//     },
//     {
//       icon: Map,
//       title: "100+ destinations",
//       desc: "Explore every corner of beautiful Ireland",
//     },
//     {
//       icon: Clock,
//       title: "Your schedule, your Way",
//       desc: "Travel at your own pace and timing",
//     },
//     {
//       icon: UserSquare2,
//       title: "Professional drivers",
//       desc: "English-speaking local experts",
//     },
//   ];

//   return (
//     <section className="relative w-full py-16 md:py-24 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-5">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map(({ icon: Icon, title, desc }) => (
//             <div
//               key={title}
//               className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-black/5"
//             >
//               <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
//                 <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
//               </div>
//               <h3 className="text-center font-bold text-gray-900 text-lg mb-3">{title}</h3>
//               <p className="text-center text-gray-600 leading-relaxed">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }