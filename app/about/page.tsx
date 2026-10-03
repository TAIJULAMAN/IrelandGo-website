import { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/section-header";
import { OurStory } from "@/components/about/our-story";

const AboutStats = dynamic(() =>
  import("@/components/about/about-stats").then((m) => ({
    default: m.AboutStats,
  })),
);
const OurValues = dynamic(() =>
  import("@/components/about/our-values").then((m) => ({
    default: m.OurValues,
  })),
);
const WhyChooseUs = dynamic(() =>
  import("@/components/home/why-choose-us").then((m) => ({
    default: m.WhyChooseUs,
  })),
);

export const metadata: Metadata = {
  title: "About Tourenzo | Premium Private Transfers in Ireland",
  description:
    "Discover our heritage, our core values, and why travelers across Ireland trust Tourenzo for their journeys.",
  openGraph: {
    title: "About Tourenzo | Premium Private Transfers",
    description:
      "Discover our heritage and why travelers across Ireland trust us.",
    type: "website",
  },
};

export default function About() {
  return (
    <main className="flex flex-col w-full min-h-screen overflow-x-hidden relative">
      <section className="relative text-white flex flex-col justify-center min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] px-5 md:px-10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about.avif"
            alt="About Tourenzo Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center gap-6 mt-10 md:mt-12">
          <div className="w-full max-w-4xl mx-auto">
            <SectionHeader
              isMainHeading={true}
              title="About Tourenzo"
              titleClassName="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center text-white"
              descriptionClassName="text-white"
              description="Discover our heritage, our core values, and why travelers across Ireland trust Tourenzo for their journeys."
            />
          </div>
        </div>
      </section>

      <AboutStats />
      <OurStory />
      <OurValues />
      <WhyChooseUs />
    </main>
  );
}
