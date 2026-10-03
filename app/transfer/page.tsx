import { Metadata } from "next";
import dynamic from "next/dynamic";
import TransfersHero from "@/components/transfer/transfer-hero";
import AirportTransfersWhyChoose from "@/components/airport-transfers/airport-transfers-why-choose";

const DreamTour = dynamic(() => import("@/components/transfer/dream-tour"));
const FAQ = dynamic(() => import("@/app/settings/faq/faq"));

export const metadata: Metadata = {
  title: "Private Transfers Across Ireland | IrelandGo",
  description:
    "Book reliable private transfers, city-to-city transport, and airport transfers across Ireland with professional drivers.",
  openGraph: {
    title: "Private Transfers Across Ireland",
    description: "Book reliable private transfers and city-to-city transport.",
    type: "website",
  },
};

export default function Transfer() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden relative">
      <TransfersHero />
      <AirportTransfersWhyChoose />
      <DreamTour />
      <FAQ />
    </main>
  );
}
