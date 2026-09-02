export default function MultiDayToursHero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center text-white overflow-hidden py-24">
      <div className="absolute inset-0 z-0">
        <img
          src="/Images/Tours.webp"
          alt="Touring the Irish landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/10" />
      </div>

      <div className="max-w-7xl mx-auto px-5 w-full flex flex-col items-center text-center gap-8 md:gap-12 relative z-10 mt-10">
        {/* Main Content */}
        <div className="space-y-4 md:space-y-6 max-w-4xl">
          <h1 className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight drop-shadow-2xl text-white">
            Multi-Day Tours Across
            <br className="hidden sm:block" />
            <span className=""> Ireland</span>
          </h1>

          <p className="text-sm md:text-base text-white px-4 font-medium drop-shadow-md leading-relaxed">
            Experience the best of Ireland&apos;s scenic routes, from sweeping
            coastlines to the historic countryside, on a private and fully
            guided journey.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 mt-12 sm:mt-20 md:mt-28 px-6 sm:px-12 py-8 sm:py-6 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center w-full sm:w-auto">
            <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
              50+
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-200 mt-2 sm:mt-1 uppercase tracking-widest text-center">
              Unique Itineraries
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
      </div>
    </section>
  );
}
