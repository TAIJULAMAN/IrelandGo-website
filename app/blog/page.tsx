import { Metadata } from "next";
import Image from "next/image";
import { BlogList } from "@/components/blog/blog-list";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Blog | Discover Ireland with Tourenzo",
  description:
    "Insider tips, local guides, and inspiring stories to help you plan the perfect journey across the Emerald Isle.",
};

export default function BlogListingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative text-white flex flex-col justify-center min-h-[35vh] md:min-h-[45vh] px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 pt-8 sm:pt-12 md:pt-24 mb-6 sm:mb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/by-the-hour.jpg"
            alt="Ireland Landscape"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="max-w-7xl mx-auto py-8 sm:py-12 px-2 sm:px-5 md:px-0 flex flex-col items-center justify-center text-center gap-3 md:gap-6 relative z-10">
          <div className="w-full max-w-4xl mx-auto">
            <SectionHeader
              isMainHeading={true}
              title="Explore Ireland with Tourenzo"
              titleClassName="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-md text-balance leading-tight"
              descriptionClassName="text-gray-200 drop-shadow-sm max-w-2xl mx-auto"
              description="Insider tips, local guides, and inspiring stories to help you plan the perfect journey across the Emerald Isle."
            />
          </div>
        </div>
      </section>

      <BlogList />
    </div>
  );
}
