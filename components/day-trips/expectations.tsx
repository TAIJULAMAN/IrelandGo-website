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
      "Your day trip includes professional driver/guide, comfortable transportation, entrance fees to attractions, and complimentary bottled water. We also provide WiFi on board and flexible stops for photos.",
  },
  {
    title: "Good to know before you go",
    content:
      "Wear comfortable walking shoes and dress in layers as Irish weather can change quickly. Bring a camera, sunscreen, and a light rain jacket. Tours depart on time, so please arrive 15 minutes early at the meeting point.",
  },
  {
    title: "Cancellation policy",
    content:
      "Free cancellation up to 24 hours before the tour starts. Cancellations made within 24 hours are non-refundable. In case of severe weather, we'll offer a full refund or reschedule your tour.",
  },
];

const images = [
  "https://images.pexels.com/photos/19933729/pexels-photo-19933729.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/13147984/pexels-photo-13147984.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/8828396/pexels-photo-8828396.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/17574921/pexels-photo-17574921.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/19933729/pexels-photo-19933729.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/13147984/pexels-photo-13147984.jpeg?auto=compress&cs=tinysrgb&w=400",
];

export default function Expectations() {
  return (
    <div className="bg-slate-800 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-10">
              What to expect on a day trip
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
