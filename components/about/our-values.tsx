import { HeartIcon, ShieldCheckIcon, StarIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

export function OurValues() {
  return (
    <section className="bg-gray-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          title="Our Values"
          description="We are committed to delivering the highest standards of safety, excellence, and genuine Irish hospitality on every journey."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-3.5 sm:p-8 text-center group">
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-blue-50 group-hover:bg-blue-600 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 transition-colors duration-300 transform group-hover:-rotate-3">
              <span className="text-blue-600 group-hover:text-white transition-colors duration-300">
                <ShieldCheckIcon className="w-5 h-5 sm:w-8 sm:h-8" />
              </span>
            </div>
            <h3 className="text-xs sm:text-xl font-bold text-gray-900 mb-1 sm:mb-3">
              Safety First
            </h3>
            <p className="text-[11px] sm:text-base text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
              Your safety is our top priority. All our vehicles are regularly
              maintained and our drivers are fully licensed and insured.
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-3.5 sm:p-8 text-center group">
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-blue-50 group-hover:bg-blue-600 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 transition-colors duration-300 transform group-hover:rotate-3">
              <span className="text-blue-600 group-hover:text-white transition-colors duration-300">
                <StarIcon className="w-5 h-5 sm:w-8 sm:h-8" />
              </span>
            </div>
            <h3 className="text-xs sm:text-xl font-bold text-gray-900 mb-1 sm:mb-3">
              Excellence
            </h3>
            <p className="text-[11px] sm:text-base text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
              We strive for excellence in every aspect of our service, from
              booking to drop-off, ensuring a premium experience.
            </p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-3.5 sm:p-8 text-center group col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-blue-50 group-hover:bg-blue-600 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 transition-colors duration-300 transform group-hover:-rotate-3">
              <span className="text-blue-600 group-hover:text-white transition-colors duration-300">
                <HeartIcon className="w-5 h-5 sm:w-8 sm:h-8" />
              </span>
            </div>
            <h3 className="text-xs sm:text-xl font-bold text-gray-900 mb-1 sm:mb-3">
              Irish Hospitality
            </h3>
            <p className="text-[11px] sm:text-base text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
              Experience genuine Irish warmth and friendliness with every
              journey. We treat every passenger like family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
