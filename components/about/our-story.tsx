"use client";

import { useGetAboutQuery } from "@/Redux/features/settings/aboutApi";

export function OurStory() {
  const { data, isLoading } = useGetAboutQuery();
  const description = data?.data?.description;

  console.log(description, "data of about");
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 sm:mb-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
          Our Story
        </h2>
        <div className="space-y-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-left md:text-center">
          <div
            className="prose prose-sm sm:prose-base md:prose-lg prose-gray max-w-7xl"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          />
        </div>
      </div>
    </section>
  );
}
