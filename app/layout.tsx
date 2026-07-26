import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/AuthContext"
import ReduxProvider from "@/Redux/ReduxProvider"
import { Toaster } from "sonner"
import "./globals.css"

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
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
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


