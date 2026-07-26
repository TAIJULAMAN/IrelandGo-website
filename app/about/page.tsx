import { HeartIcon, ShieldCheckIcon, StarIcon } from "lucide-react";

export default function About() {
  return (
    <>
      <section
        className="relative text-white flex flex-col min-h-screen bg-cover bg-center bg-no-repeat px-5 md:px-10 pt-10"
        style={{
          backgroundImage: 'url("/about.avif")',
        }}
      >
        <div className="max-w-7xl pt-10 md:pt-32 pb-10 md:pb-20 mx-auto px-5 sm:px-5 md:px-10  flex flex-col items-center justify-center text-center gap-5 md:gap-8 ">
          <div className="space-y-2 max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4 text-balance leading-tight px-4">
              About Tourenzo
            </h1>
            <p className="text-base md:text-lg text-white mb-6 md:mb-8 px-4">
              Discover the beauty of Ireland with Tourenzo. As your trusted
              travel partner, we provide premium immersive guided tours,
              ensuring every journey across the Emerald Isle is comfortable,
              safe, and unforgettable.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 mt-4 sm:mt-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                15+
              </span>
              <span className="text-sm text-white/90 font-medium mt-1">
                Years Experience
              </span>
            </div>
            <div className="hidden sm:block w-1 h-10 bg-white rounded-full opacity-60" />
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                1000+
              </span>
              <span className="text-sm text-white/90 font-medium mt-1">
                Happy Customers
              </span>
            </div>
            <div className="hidden sm:block w-1 h-10 bg-white rounded-full opacity-60" />
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                100+
              </span>
              <span className="text-sm text-white/90 font-medium mt-1">
                Destinations
              </span>
            </div>
            <div className="hidden md:block w-1 h-10 bg-white rounded-full opacity-60" />
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                24/7
              </span>
              <span className="text-sm text-white/90 font-medium mt-1">
                Support
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 -mt-16 md:-mt-24 relative z-10 mb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl border border-gray-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Founded in 2010, Tourenzo has been connecting travelers with
              Ireland's most beautiful destinations for over 15 years. What
              started as a small family-run business with just two vehicles
              has grown into one of Ireland's most trusted transfer and tour
              services.
            </p>
            <p>
              Our passion for Irish culture, history, and hospitality drives
              everything we do. We believe that every journey should be more
              than just transportation—it should be an experience that creates
              lasting memories.
            </p>
            <p>
              Today, we operate a modern fleet of comfortable vehicles and
              work with a team of experienced, friendly drivers who are as
              passionate about Ireland as we are. Whether you're traveling for
              business or pleasure, we're committed to making your journey
              safe, comfortable, and memorable.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 py-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-8 text-center group">
              <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <span className="text-3xl group-hover:text-white transition-colors duration-300">
                  <ShieldCheckIcon className="w-8 h-8" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Safety First
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your safety is our top priority. All our vehicles are
                regularly maintained and our drivers are fully licensed and
                insured.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-8 text-center group">
              <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <span className="text-3xl group-hover:text-white transition-colors duration-300">
                  <StarIcon className="w-8 h-8" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We strive for excellence in every aspect of our service, from
                booking to drop-off, ensuring a premium experience.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-8 text-center group">
              <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <span className="text-3xl group-hover:text-white transition-colors duration-300">
                  <HeartIcon className="w-8 h-8" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Irish Hospitality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Experience genuine Irish warmth and friendliness with every
                journey. We treat every passenger like family.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We go above and beyond to ensure your journey in Ireland is
                nothing short of exceptional.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-100 hover:border-blue-100 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
                    1
                  </span>
                  Professional Drivers
                </h3>
                <p className="text-gray-600 leading-relaxed pl-11">
                  All our drivers are experienced, licensed, and knowledgeable
                  about Irish history and culture.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-100 hover:border-blue-100 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
                    2
                  </span>
                  Modern Fleet
                </h3>
                <p className="text-gray-600 leading-relaxed pl-11">
                  Travel in comfort with our well-maintained, modern vehicles
                  equipped with all amenities.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-100 hover:border-blue-100 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
                    3
                  </span>
                  Flexible Booking
                </h3>
                <p className="text-gray-600 leading-relaxed pl-11">
                  Easy online booking with flexible cancellation policies and
                  instant confirmation.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-100 hover:border-blue-100 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
                    4
                  </span>
                  Competitive Pricing
                </h3>
                <p className="text-gray-600 leading-relaxed pl-11">
                  Transparent pricing with no hidden fees. Get the best value
                  for your money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
