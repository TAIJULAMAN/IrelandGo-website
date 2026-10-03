export function AboutStats() {
  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 md:-mt-10 lg:-mt-10 xl:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-10 sm:mb-14">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl sm:text-4xl md:text-5xl font-black text-blue-600">
            15+
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-bold mt-1 sm:mt-2 uppercase tracking-wide">
            Years Experience
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl sm:text-4xl md:text-5xl font-black text-blue-600">
            1000+
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-bold mt-1 sm:mt-2 uppercase tracking-wide">
            Happy Customers
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl sm:text-4xl md:text-5xl font-black text-blue-600">
            100+
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-bold mt-1 sm:mt-2 uppercase tracking-wide">
            Destinations
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl sm:text-4xl md:text-5xl font-black text-blue-600">
            24/7
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-bold mt-1 sm:mt-2 uppercase tracking-wide">
            Support
          </span>
        </div>
      </div>
    </section>
  );
}
