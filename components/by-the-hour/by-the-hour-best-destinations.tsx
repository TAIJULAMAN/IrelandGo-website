import Link from "next/link";

export default function ByTheHourBestDestinations() {
  return (
    <section className="relative w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-slate-900 mb-10">
          Explore Ireland's Best Destinations
        </h2>

        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
              <img
                src="/explore -Ireland-1.jpg"
                alt="Cliffs of Moher"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Cliffs of Moher
            </h3>
            <p className="text-slate-600 mt-2">
              Experience Ireland's most famous cliffs rising 214 meters above
              the Atlantic Ocean. Marvel at the dramatic coastline and spot
              seabirds in their natural habitat.
            </p>
            <Link href="/blog/cliffs-of-moher">
              <button className="mt-5 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
                Explore Route
              </button>
            </Link>
          </div>
        </div>

        {/* Row 2 (alternating) */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold text-slate-900">
              Wicklow Mountains
            </h3>
            <p className="text-slate-600 mt-2">
              Discover the "Garden of Ireland" with its rolling hills, pristine
              lakes, and ancient monastic sites. Perfect for nature lovers and
              photography enthusiasts.
            </p>
            <Link href="/blog/wicklow-mountains">
              <button className="mt-5 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
                Explore Route
              </button>
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
              <img
                src="/explore -Ireland-2.png"
                alt="Wicklow Mountains"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
