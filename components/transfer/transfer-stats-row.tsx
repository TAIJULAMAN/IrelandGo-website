export function TransferStatsRow() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 mt-4 sm:mt-8 px-6 sm:px-12 py-8 sm:py-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center w-full sm:w-auto">
        <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
          No.1
        </span>
        <span className="text-xs sm:text-sm font-bold text-blue-200 mt-2 sm:mt-1 uppercase tracking-widest text-center">
          For Transfers
        </span>
      </div>
      <div className="w-16 h-px sm:w-px sm:h-16 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-white/50 to-transparent my-2 sm:my-0" />
      <div className="flex flex-col items-center w-full sm:w-auto">
        <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
          1000+
        </span>
        <span className="text-xs sm:text-sm font-bold text-blue-200 mt-2 sm:mt-1 uppercase tracking-widest text-center">
          Happy Travelers
        </span>
      </div>
      <div className="w-16 h-px sm:w-px sm:h-16 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-white/50 to-transparent my-2 sm:my-0" />
      <div className="flex flex-col items-center w-full sm:w-auto">
        <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
          15+
        </span>
        <span className="text-xs sm:text-sm font-bold text-blue-200 mt-2 sm:mt-1 uppercase tracking-widest text-center">
          Years Experience
        </span>
      </div>
    </div>
  );
}
