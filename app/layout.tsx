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
})

export const metadata: Metadata = {
  title: "Tourenzo",
  description:
    "Book private car transfers, day trips, and multi-day tours across Ireland. Professional drivers, comfortable vehicles, and 24/7 support.",
  generator: "md shah aman patwary",
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
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== "undefined" && (
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className={`${jakarta.variable} font-sans antialiased bg-background text-foreground`}>
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


