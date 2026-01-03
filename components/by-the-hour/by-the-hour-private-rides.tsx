"use client";

import { Play, Check } from "lucide-react";

export default function ByTheHourPrivateRides() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full py-14 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Media with play overlay */}
        <div className="w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <img
              src="https://images.pexels.com/photos/17090014/pexels-photo-17090014.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Private ride arrival"
              className="w-full h-56 sm:h-64 md:h-72 object-cover"
            />
            <button
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/90 hover:bg-blue-700 text-white shadow-md transition"
            >
              <Play className="w-6 h-6" />
            </button>
          </div>
          <p className="text-center text-sm text-slate-500 mt-3">See how it works</p>
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug mb-4">
            Enjoy private rides designed for your peace of mind.
          </h2>

          <ul className="space-y-3 mb-7">
            {[
              'Only you and your travel companions',
              'Professional local drivers',
              'English-speaking chauffeurs',
            ].map((text) => (
              <li key={text} className="flex items-start gap-3 text-slate-700">
                <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}



// "use client";

// import { Play, Check } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function ByTheHourPrivateRides() {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <section className="relative w-full py-16 md:py-24 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
//         {/* Left: Media from Pexels (using img to avoid external domain config issues for now) */}
//         <div className="w-full relative group">
//           <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 aspect-video md:aspect-[4/3]">
//             <img
//               src="https://images.pexels.com/photos/17090014/pexels-photo-17090014.jpeg?auto=compress&cs=tinysrgb&w=1200"
//               alt="Private ride arrival"
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />

//             {/* Play Button */}
//             <button
//               aria-label="Play video"
//               className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-700 text-white shadow-xl backdrop-blur-sm transition-all hover:scale-110"
//             >
//               <Play className="w-7 h-7 ml-1 fill-current" />
//             </button>
//           </div>
//           <p className="text-center text-sm font-medium text-gray-500 mt-4">See how it works</p>
//         </div>

//         {/* Right: Content */}
//         <div className="space-y-8">
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
//               Enjoy private rides designed for your peace of mind.
//             </h2>
//             <p className="text-lg text-gray-600 leading-relaxed">
//               Experience the ultimate comfort and privacy with our dedicated chauffeur service.
//             </p>
//           </div>

//           <ul className="space-y-6">
//             {[
//               'Only you and your travel companions',
//               'Professional local drivers',
//               'English-speaking chauffeurs',
//             ].map((text) => (
//               <li key={text} className="flex items-center gap-4 group">
//                 <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
//                   <Check className="w-5 h-5" />
//                 </span>
//                 <span className="text-lg text-gray-700 font-medium">{text}</span>
//               </li>
//             ))}
//           </ul>

//           <Button
//             onClick={scrollToTop}
//             size="lg"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all text-base px-8 h-12"
//           >
//             Book Now
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

