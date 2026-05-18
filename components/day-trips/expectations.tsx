"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    title: "What's included",
    content:
      "Your day trip includes professional driver/guide, comfortable transportation, and complimentary bottled water. We also provide flexible stops for photos.",
  },
  {
    title: "Good to know before you go",
    content:
      "For the best experience, wear comfortable walking shoes and dress in layers to suit Ireland’s ever-changing weather. Don’t forget sunscreen and a light rain jacket.",
  },
  {
    title: "Cancellation policy",
    content:
      "Free cancellation up to 24 hours before the trip starts. Cancellations made between 24 and 12 hours before the trip are eligible for a 50% refund. Cancellations within 12 hours of the trip are non-refundable.",
  },
];

const images = [
  "attractions/1.jpg",
  "attractions/2.webp",
  "attractions/3.jpg",
  "attractions/4.jpg",
  "attractions/5.jpg",
  "attractions/6.jpg",
];

export default function Expectations() {
  return (
    <div className="bg-slate-900 text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-10 text-center lg:text-left">
              What to expect on a day trip?
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  value={`item-${index}`}
                  className="bg-slate-700/50 hover:bg-slate-700 rounded-xl border border-slate-600/50 px-6 data-[state=open]:bg-slate-700"
                >
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="font-medium text-base text-left">
                      {item.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-slate-300 text-sm leading-relaxed">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="rounded-2xl p-2 bg-slate-900/20">
            <div className="grid grid-cols-8 auto-rows-[92px] sm:auto-rows-[104px] md:auto-rows-[112px] gap-3">
              {/* Top row: two large tiles */}
              <div className="relative col-span-8 sm:col-span-5 row-span-3 overflow-hidden rounded-xl">
                <img
                  src={images[0]}
                  alt="Irish landscape"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative col-span-8 sm:col-span-3 row-span-3 overflow-hidden rounded-xl">
                <img
                  src={images[1]}
                  alt="Coastal view"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Bottom composition */}
              <div className="relative col-span-8 sm:col-span-3 row-span-2 overflow-hidden rounded-xl">
                <img
                  src={images[2]}
                  alt="Rock formation"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative col-span-8 sm:col-span-2 row-span-2 overflow-hidden rounded-xl">
                <img
                  src={images[3]}
                  alt="Green hills"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative col-span-8 sm:col-span-3 row-span-1 overflow-hidden rounded-xl">
                <img
                  src={images[4]}
                  alt="Cliffs"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative col-span-8 sm:col-span-3 row-span-1 overflow-hidden rounded-xl">
                <img
                  src={images[5]}
                  alt="Scenic road"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
