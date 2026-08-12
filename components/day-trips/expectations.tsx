"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

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
  "/attractions/1.jpg",
  "/attractions/2.webp",
  "/attractions/3.jpg",
  "/attractions/4.jpg",
  "/attractions/5.jpg",
  "/attractions/6.webp",
];

export default function Expectations() {
  return (
    <div className="relative w-full bg-slate-900 py-16 md:py-24 overflow-hidden z-0">
      {/* Dark glowing orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px] opacity-60" />
        <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold mb-8 md:mb-12 text-center lg:text-left text-white leading-tight">
              What to expect on a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">day trip?</span>
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  value={`item-${index}`}
                  className="bg-slate-800/40 backdrop-blur-md hover:bg-slate-800/60 rounded-2xl border border-slate-700/50 hover:border-slate-600 px-6 lg:px-8 data-[state=open]:bg-slate-800/80 data-[state=open]:border-slate-500 transition-all duration-300 shadow-sm"
                >
                  <AccordionTrigger className="py-5 hover:no-underline group">
                    <span className="font-bold text-lg text-left text-slate-200 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-slate-400 text-base leading-relaxed">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="relative group perspective-1000">
            {/* Ambient shadow glow behind grid */}
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-[3rem] transform rotate-3 group-hover:rotate-0 transition-transform duration-700 -z-10 blur-xl"></div>

            <div className="rounded-3xl p-3 sm:p-4 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative z-10">
              <div className="grid grid-cols-8 auto-rows-[92px] sm:auto-rows-[104px] md:auto-rows-[112px] gap-3">
                {/* Top row: two large tiles */}
                <div style={{ position: "relative" }} className="relative col-span-8 sm:col-span-5 row-span-3 overflow-hidden rounded-2xl group/image">
                  <Image
                    src={images[0]}
                    alt="Irish landscape"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover/image:bg-slate-900/0 transition-colors duration-500" />
                </div>
                <div style={{ position: "relative" }} className="relative col-span-8 sm:col-span-3 row-span-3 overflow-hidden rounded-2xl group/image">
                  <Image
                    src={images[1]}
                    alt="Coastal view"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover/image:bg-slate-900/0 transition-colors duration-500" />
                </div>

                {/* Bottom composition */}
                <div style={{ position: "relative" }} className="relative col-span-8 sm:col-span-3 row-span-2 overflow-hidden rounded-2xl group/image">
                  <Image
                    src={images[2]}
                    alt="Rock formation"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover/image:bg-slate-900/0 transition-colors duration-500" />
                </div>
                <div style={{ position: "relative" }} className="relative col-span-8 sm:col-span-2 row-span-2 overflow-hidden rounded-2xl group/image">
                  <Image
                    src={images[3]}
                    alt="Green hills"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover/image:bg-slate-900/0 transition-colors duration-500" />
                </div>
                <div style={{ position: "relative" }} className="relative col-span-8 sm:col-span-3 row-span-1 overflow-hidden rounded-2xl group/image">
                  <Image
                    src={images[4]}
                    alt="Cliffs"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover/image:bg-slate-900/0 transition-colors duration-500" />
                </div>
                <div style={{ position: "relative" }} className="relative col-span-8 sm:col-span-3 row-span-1 overflow-hidden rounded-2xl group/image">
                  <Image
                    src={images[5]}
                    alt="Scenic road"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover/image:bg-slate-900/0 transition-colors duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
