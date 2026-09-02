import { Metadata } from "next";
import { Suspense } from "react";
import AirportTransfersHero from "@/components/airport-transfers/airport-transfers-hero";
import PopularTransferRoutes from "@/components/airport-transfers/transfer-routes/popular-transfer-routes";
import AirportTransfersWhyChoose from "@/components/airport-transfers/airport-transfers-why-choose";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";
import { getAirportTransferBySlug } from "@/config/seoRoutes";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getAirportTransferBySlug(slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tourenzo.com";
  const canonicalUrl = `${siteUrl}/airport-transfers/${route.slug}`;

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

export default async function AirportHubPage({ params }: PageProps) {
  const { slug } = await params;
  const route = getAirportTransferBySlug(slug);

  return (
    <>
      <AirportTransfersHero />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Popular Private Transfers from {route.from}
        </h2>
        <Suspense fallback={<div className="min-h-[300px] bg-gray-50 animate-pulse rounded-xl" />}>
          <PopularTransferRoutes initialLocation={route.from} />
        </Suspense>
      </div>
      <AirportTransfersWhyChoose />
      <Testimonials />
      <FAQ />
    </>
  );
}
