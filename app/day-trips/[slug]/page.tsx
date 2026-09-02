import { Metadata } from "next";
import Hero from "@/components/day-trips/day-trips-hero";
import Expectations from "@/components/day-trips/expectations";
import FAQ from "@/app/settings/faq/faq";
import Memories from "@/components/day-trips/memories";
import TripCards from "@/components/day-trips/trip-cards";
import { Testimonials } from "@/components/common/testimonials";
import { getDayTripBySlug } from "@/config/seoRoutes";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getDayTripBySlug(slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tourenzo.com";
  const canonicalUrl = `${siteUrl}/day-trips/${route.slug}/`;

  return {
    title: route.title,
    description: route.description,
    keywords: route.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "/Tourenzo.png",
          width: 1200,
          height: 630,
          alt: route.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: ["/Tourenzo.png"],
    },
  };
}

export default async function DayTripSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const route = getDayTripBySlug(slug);

  return (
    <main>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          {route.h1}
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mb-8">
          {route.description}
        </p>
      </div>
      <TripCards />
      <Expectations />
      <Memories />
      <Testimonials />
      <FAQ />
    </main>
  );
}
