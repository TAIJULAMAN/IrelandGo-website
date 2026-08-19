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

      <section className="relative z-20 -mt-8 md:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black text-blue-600">
              15+
            </span>
            <span className="text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-wide">
              Years Experience
            </span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black text-blue-600">
              1000+
            </span>
            <span className="text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-wide">
              Happy Customers
            </span>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black text-blue-600">
              100+
            </span>
            <span className="text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-wide">
              Destinations
            </span>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black text-blue-600">
              24/7
            </span>
            <span className="text-xs md:text-sm text-gray-500 font-bold mt-2 uppercase tracking-wide">
              Support
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
            Our Heritage
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
            Our Story
          </h2>
          <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed text-left md:text-center">
            <div
              className="prose prose-sm sm:prose-base md:prose-lg prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: about?.description ?? "" }}
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              Core Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Our Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-8 text-center group">
              <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300 transform group-hover:-rotate-3">
                <span className="text-blue-600 group-hover:text-white transition-colors duration-300">
                  <ShieldCheckIcon className="w-8 h-8" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Safety First
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your safety is our top priority. All our vehicles are regularly
                maintained and our drivers are fully licensed and insured.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-8 text-center group">
              <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300 transform group-hover:rotate-3">
                <span className="text-blue-600 group-hover:text-white transition-colors duration-300">
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

            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-8 text-center group">
              <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300 transform group-hover:-rotate-3">
                <span className="text-blue-600 group-hover:text-white transition-colors duration-300">
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

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
                The Tourenzo Difference
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
                We go above and beyond to ensure your journey in Ireland is
                nothing short of exceptional.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white text-lg font-black transition-colors duration-300">
                    1
                  </span>
                  Professional Drivers
                </h3>
                <p className="text-gray-600 leading-relaxed pl-14">
                  All our drivers are experienced, licensed, and knowledgeable
                  about Irish history and culture.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white text-lg font-black transition-colors duration-300">
                    2
                  </span>
                  Modern Fleet
                </h3>
                <p className="text-gray-600 leading-relaxed pl-14">
                  Travel in comfort with our well-maintained, modern vehicles
                  equipped with all amenities.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white text-lg font-black transition-colors duration-300">
                    3
                  </span>
                  Flexible Booking
                </h3>
                <p className="text-gray-600 leading-relaxed pl-14">
                  Easy online booking with flexible cancellation policies and
                  instant confirmation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white text-lg font-black transition-colors duration-300">
                    4
                  </span>
                  Competitive Pricing
                </h3>
                <p className="text-gray-600 leading-relaxed pl-14">
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
