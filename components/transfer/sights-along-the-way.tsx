"use client";

import { Button } from "@/components/ui/button";

const sights = [
  {
    title: "Cliffs of Moher",
    duration: "+30 min stop",
    image: "/s1.png",
  },
  {
    title: "Rock of Cashel",
    duration: "+45 min stop",
    image: "/s2.png",
  },
  {
    title: "Limerick City",
    duration: "+20 min stop",
    image: "/s3.png",
  },
  {
    title: "Bunratty Castle",
    duration: "+40 min stop",
    image: "/s4.png",
  },
];

export default function SightsAlongTheWay() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-7 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Sights Along the Way
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-7 max-w-3xl">
            Enjoy a scenic drive through Ireland&apos;s stunning countryside,
            passing through picturesque towns like Limerick, and visiting the
            Cliffs of Moher.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
            {sights.map((sight) => (
              <div
                key={sight.title}
                className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] overflow-hidden"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={sight.image}
                    alt={sight.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="px-3 sm:px-4 py-3">
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {sight.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    {sight.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button className="px-8 sm:px-10 py-2.5 sm:py-3 bg-blue-600  text-white text-sm sm:text-base font-medium rounded-lg">
              Book This Journey Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
