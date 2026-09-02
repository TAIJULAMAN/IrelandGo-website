import { Metadata } from "next";
import { Suspense } from "react";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";
import TransferJourneyDetails from "@/components/transfer/transfer-journey-details";
import PrivateCarTransferHero from "@/components/private-car-transfer/private-car-transfer-hero";
import TravelTips from "@/components/transfer/travel-tips";
import { getTransferRouteBySlug } from "@/config/seoRoutes";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getTransferRouteBySlug(slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tourenzo.com";
  const canonicalUrl = `${siteUrl}/transfers/${route.slug}/`;

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

export default async function TransferPage({ params }: PageProps) {
  const { slug } = await params;
  const route = getTransferRouteBySlug(slug);

  return (
    <div>
      <Suspense fallback={<div className="min-h-screen bg-gray-100" />}>
        <PrivateCarTransferHero
          initialPickup={route.from}
          initialDropoff={route.to || ""}
          customH1={route.h1}
          customSubtitle={route.description}
        />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-7xl mx-auto items-start px-4">
        <div className="md:col-span-3">
          <TravelTips />
        </div>
        <div className="md:col-span-1">
          <Suspense fallback={<div className="min-h-[400px] bg-gray-50" />}>
            <TransferJourneyDetails />
          </Suspense>
        </div>
      </div>
      <Testimonials />
      <FAQ />
    </div>
  );
}
