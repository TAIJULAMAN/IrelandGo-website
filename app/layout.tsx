import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/AuthContext"
import ReduxProvider from "@/Redux/ReduxProvider"
import { Toaster } from "sonner"
import "./globals.css"
import "leaflet/dist/leaflet.css"
import Script from "next/script"

import { ClientLayout } from "@/components/layout/client-layout"


const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tourenzo.com"),
  title: {
    default: "Tourenzo | Premium Private Transfers & Tours in Ireland",
    template: "%s | Tourenzo",
  },
  description:
    "Book luxury private car transfers, Dublin airport transfers, day trips, and multi-day tours across Ireland. Professional chauffeurs, comfortable vehicles, and 24/7 dedicated support.",
  keywords: [
    "Ireland private transfers",
    "Dublin airport transfer",
    "Ireland day trips",
    "private chauffeur Ireland",
    "multi-day Ireland tours",
    "Tourenzo",
    "Ireland luxury travel",
  ],
  authors: [{ name: "Tourenzo Team" }],
  creator: "Tourenzo",
  publisher: "Tourenzo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tourenzo | Premium Private Transfers & Tours in Ireland",
    description:
      "Book luxury private car transfers, Dublin airport transfers, day trips, and multi-day tours across Ireland.",
    url: "https://tourenzo.com",
    siteName: "Tourenzo",
    images: [
      {
        url: "/Tourenzo.png",
        width: 1200,
        height: 630,
        alt: "Tourenzo Ireland Transfers & Tours",
      },
    ],
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tourenzo | Premium Private Transfers & Tours in Ireland",
    description:
      "Book luxury private car transfers, Dublin airport transfers, day trips, and multi-day tours across Ireland.",
    images: ["/Tourenzo.png"],
  },
  icons: {
    icon: [
      {
        url: "/Tourenzo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Tourenzo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/Tourenzo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/Tourenzo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Tourenzo",
    image: "https://tourenzo.com/Tourenzo.png",
    description:
      "Book luxury private car transfers, Dublin airport transfers, day trips, and multi-day tours across Ireland.",
    url: "https://tourenzo.com",
    telephone: "+353123456789",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IE",
      addressLocality: "Dublin",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.349805,
      longitude: -6.26031,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/Images/Home.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} font-sans antialiased bg-background text-foreground`}
      >

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== "undefined" && (
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="lazyOnload"
          />
        )}
        <ReduxProvider>
          <AuthProvider>
            <ClientLayout>{children}</ClientLayout>
          </AuthProvider>
          <Toaster position="top-center" richColors />
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  )
}




