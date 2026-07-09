import { Shield, Car, Clock, Accessibility } from "lucide-react"
import Image from "next/image"
import { SectionHeader } from "../ui/section-header"

export function SafetyComfort() {
  const features = [
    {
      icon: Shield,
      title: "Fully licensed drivers",
      description: "All our drivers are professionally licensed, insured, and background-checked.",
      color: "from-blue-400 to-blue-600",
      iconColor: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Car,
      title: "Clean, air-conditioned vehicles",
      description: "Modern, well-maintained vehicles with climate control for your comfort.",
      color: "from-blue-500 to-indigo-600",
      iconColor: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      icon: Clock,
      title: "On-time guarantee",
      description: "We track your flight and adjust pickup times to ensure punctual service.",
      color: "from-indigo-500 to-violet-600",
      iconColor: "text-violet-600",
      bg: "bg-violet-50"
    },
    {
      icon: Accessibility,
      title: "Wheelchair-accessible rides",
      description: "Need extra support? We offer vehicles equipped for wheelchair access-just let us know when booking.",
      color: "from-violet-500 to-purple-600",
      iconColor: "text-purple-600",
      bg: "bg-purple-50"
    },
  ]

  return (
    <section className="relative px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
          <SectionHeader
            title="Safety & Comfort"
            subtitle="Our Priority"
            className="mb-8 md:mb-12 text-center lg:text-left [&_span]:lg:text-left [&_h2]:lg:text-left"
          />
          <div className="space-y-2">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div 
                  key={idx} 
                  className="group flex gap-4 md:gap-5 p-4 md:p-5 -mx-4 md:-mx-5 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-transparent hover:border-gray-100"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="relative">
                      {/* Hover Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
                      
                      {/* Icon Container */}
                      <div className={`relative w-12 h-12 md:w-14 md:h-14 ${feature.bg} group-hover:bg-white rounded-xl flex items-center justify-center transition-colors duration-300 border border-transparent group-hover:border-gray-100 shadow-sm group-hover:shadow-md`}>
                         <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                         <Icon className={`w-6 h-6 md:w-7 md:h-7 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
           {/* Decorative Image Background Glow */}
           <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 via-indigo-100 to-violet-100 rounded-[2rem] blur-2xl opacity-60 mix-blend-multiply" />
           
           <div className="relative h-72 sm:h-96 lg:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/60 bg-white group">
             {/* Image */}
             <Image
               src="/safe.png"
               alt="Safety and Comfort"
               fill
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             
             {/* Gradient overlay on image */}
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             {/* Glassmorphic badge overlay */}
             <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 bg-white/80 backdrop-blur-md border border-white/50 rounded-xl p-4 shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                     <Shield className="w-5 h-5 text-blue-600" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900">Your safety first</p>
                     <p className="text-xs text-gray-600">Travel with peace of mind</p>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  )
}
