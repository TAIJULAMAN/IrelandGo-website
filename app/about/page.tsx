"use client"

import { HeartIcon, ShieldCheckIcon, StarIcon } from "lucide-react";

import Loading from "@/components/common/loading";
import { useGetAboutQuery } from "@/Redux/features/settings/aboutApi";

export default function About() {
  const { data, isLoading } = useGetAboutQuery();
  const about = data?.data;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <>
      <section
        className="relative text-white flex flex-col justify-center min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] bg-cover bg-center bg-no-repeat px-5 md:px-10 py-16 md:py-24"
        style={{
          backgroundImage: 'url("/about.avif")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center gap-6 mt-10 md:mt-12">
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold mb-4 text-balance leading-tight drop-shadow-sm">
              About Tourenzo
            </h1>
            {isLoading ? (
              <Loading />
            ) : about ? (
              <>
                <p className="text-gray-600 mb-8 text-sm sm:text-base">
                  Last updated: {formatDate(about?.updatedAt)}
                </p>
                <div
                  className="prose prose-sm sm:prose-base md:prose-lg prose-gray max-w-none
        prose-headings:font-semibold prose-headings:text-gray-900
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-ul:text-gray-700 prose-li:text-gray-700
        prose-a:text-blue-600 hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: about?.description }}
                />
              </>
            ) : (
              <p className="text-gray-500 text-lg">About information not available.</p>
            )}
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-10 sm:mb-14">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 sm:mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-1 block">
            Our Heritage
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-left md:text-center">
            <div
              className="prose prose-sm sm:prose-base md:prose-lg prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: about?.description ?? "" }}
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-1 block">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              Our Values
            </h2>
          </div>
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

      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-blue-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-1 block">
                The Tourenzo Difference
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto font-medium">
                We go above and beyond to ensure your journey in Ireland is
                nothing short of exceptional.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3.5 sm:p-8 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 flex items-center gap-2 sm:gap-4">
                  <span className="flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white text-xs sm:text-lg font-black transition-colors duration-300 shrink-0">
                    1
                  </span>
                  Professional Drivers
                </h3>
                <p className="text-gray-600 text-[11px] sm:text-base leading-relaxed pl-0 sm:pl-14 line-clamp-3 sm:line-clamp-none">
                  All our drivers are experienced, licensed, and knowledgeable
                  about Irish history and culture.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3.5 sm:p-8 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 flex items-center gap-2 sm:gap-4">
                  <span className="flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white text-xs sm:text-lg font-black transition-colors duration-300 shrink-0">
                    2
                  </span>
                  Modern Fleet
                </h3>
                <p className="text-gray-600 text-[11px] sm:text-base leading-relaxed pl-0 sm:pl-14 line-clamp-3 sm:line-clamp-none">
                  Travel in comfort with our well-maintained, modern vehicles
                  equipped with all amenities.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3.5 sm:p-8 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 flex items-center gap-2 sm:gap-4">
                  <span className="flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white text-xs sm:text-lg font-black transition-colors duration-300 shrink-0">
                    3
                  </span>
                  Flexible Booking
                </h3>
                <p className="text-gray-600 text-[11px] sm:text-base leading-relaxed pl-0 sm:pl-14 line-clamp-3 sm:line-clamp-none">
                  Easy online booking with flexible cancellation policies and
                  instant confirmation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3.5 sm:p-8 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 flex items-center gap-2 sm:gap-4">
                  <span className="flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white text-xs sm:text-lg font-black transition-colors duration-300 shrink-0">
                    4
                  </span>
                  Competitive Pricing
                </h3>
                <p className="text-gray-600 text-[11px] sm:text-base leading-relaxed pl-0 sm:pl-14 line-clamp-3 sm:line-clamp-none">
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
