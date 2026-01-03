import { Users, CheckCircle, MessageSquare } from "lucide-react"

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Users,
      title: "Experienced drivers",
      description: "Our team has years of experience providing the best service in the industry",
    },
    {
      icon: CheckCircle,
      title: "Best rates in town",
      description: "We offer competitive pricing without compromising on quality and comfort",
    },
    {
      icon: MessageSquare,
      title: "Easy communication",
      description: "Contact us anytime for queries or special requests regarding your journey",
    },
  ]

  return (
    <section className=" px-5 md:px-0 py-10 md:py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-balance">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon
            return (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}




// import { UserCheck, ShieldCheck, Clock, Map, Sparkles, HeartHandshake } from "lucide-react";

// export function WhyChooseUs() {
//   const features = [
//     {
//       icon: UserCheck,
//       title: "Expert Local Drivers",
//       description: "Our drivers are knowledgeable local guides who share hidden gems and Ireland's rich history with you.",
//     },
//     {
//       icon: ShieldCheck,
//       title: "Safety First",
//       description: "Travel with peace of mind in fully insured, rigorously maintained premium vehicles with vetted professional drivers.",
//     },
//     {
//       icon: Clock,
//       title: "Reliable & Punctual",
//       description: "We value your time. Count on us for prompt pickups and efficient routes, 24/7, across the country.",
//     },
//     {
//       icon: Sparkles,
//       title: "Luxury Fleet",
//       description: "Experience superior comfort in our modern fleet of Mercedes-Benz sedans and vans, equipped with Wi-Fi and water.",
//     },
//     {
//       icon: Map,
//       title: "Custom Itineraries",
//       description: "Your trip, your way. We offer fully flexible schedules and route planning tailored to your specific interests.",
//     },
//     {
//       icon: HeartHandshake,
//       title: "Transparent Pricing",
//       description: "No hidden fees or metered surprises. Enjoy fixed, competitive rates for all our premium services.",
//     },
//   ];

//   return (
//     <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
//       <div className="container mx-auto px-5">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3 block">
//             The IrelandGo Difference
//           </span>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//             Why Travelers Choose Us
//           </h2>
//           <p className="text-gray-600 text-lg">
//             We don't just drive you from A to B. We deliver a seamless, premium travel experience that makes your journey as memorable as the destination.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, idx) => {
//             const Icon = feature.icon;
//             return (
//               <div
//                 key={idx}
//                 className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
//               >
//                 <div className="w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center mb-6">
//                   <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
