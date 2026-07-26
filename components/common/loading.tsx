import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full min-h-[400px] flex flex-col justify-center items-center gap-8 py-12 px-4 relative overflow-hidden">
      <style>{`
        @keyframes drive-h {
          0% { left: -30%; }
          100% { left: 110%; }
        }
        @keyframes dash-h {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        @keyframes wind {
          0% { transform: translateX(100%); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateX(-200%); opacity: 0; }
        }
        .animate-drive-h {
          animation: drive-h 3s linear infinite;
        }
        .animate-dash-h {
          animation: dash-h 0.3s linear infinite;
        }
        .wind-1 { animation: wind 1s linear infinite; }
        .wind-2 { animation: wind 1.2s linear infinite 0.3s; }
        .wind-3 { animation: wind 0.8s linear infinite 0.6s; }
      `}</style>

      {/* Advanced Glassmorphism Track */}
      <div className="relative w-full max-w-md h-36 rounded-[2rem] bg-white/60 backdrop-blur-xl overflow-hidden flex flex-col justify-end">

        {/* Glow Effects */}
        <div className="absolute top-0 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>

        {/* Speed Wind Lines */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
          <div className="absolute top-8 right-0 w-24 h-[2px] bg-gradient-to-l from-transparent via-blue-400 to-transparent rounded-full wind-1"></div>
          <div className="absolute top-16 right-0 w-32 h-[2px] bg-gradient-to-l from-transparent via-blue-300 to-transparent rounded-full wind-2"></div>
          <div className="absolute top-20 right-0 w-16 h-[2px] bg-gradient-to-l from-transparent via-blue-500 to-transparent rounded-full wind-3"></div>
        </div>

        {/* The Road */}
        <div className="absolute bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

        {/* Animated Dashes (w-5 (20px) + mx-2.5 (10px*2) = 40px) */}
        <div className="absolute bottom-[22px] left-0 flex w-[1200px] animate-dash-h opacity-70">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-5 h-1 bg-blue-500/40 rounded-full mx-2.5 shrink-0"></div>
          ))}
        </div>



        {/* The Driving Car (Vector Image) */}
        <div className="absolute bottom-4 w-32 h-16 flex justify-center items-center animate-drive-h">
          <div className="relative w-full h-full">
            <Image
              src="/vector-car-removebg-preview.png"
              alt="Driving car"
              fill
              className="object-contain scale-x-[-1]"
              priority
            />
          </div>
        </div>
      </div>

      {/* Premium Typography */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 bg-white px-6 py-2.5 rounded-full border border-blue-50 shadow-[0_4px_15px_rgba(37,99,235,0.05)]">
          <p className="text-blue-700 font-bold text-sm tracking-[0.2em] uppercase">
            Loading Journey
          </p>
          <div className="flex gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
          </div>
        </div>
        <p className="text-xs text-gray-400 font-medium tracking-wide">
          Securing the best routes for you...
        </p>
      </div>
    </div>
  );
}
