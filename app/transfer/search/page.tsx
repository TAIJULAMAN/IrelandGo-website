import PopularTransferRoutes from "@/components/airport-transfers/transfer-routes/popular-transfer-routes";
import FAQ from "@/app/settings/faq/faq";
import TransferSearchHero from "@/components/transfer-search/transfer-search-hero";
import { Suspense } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Transfers in Ireland | Tourenzo",
  description:
    "Search and book private transfers across Ireland. Find the best routes, vehicles, and prices for your journey with Tourenzo.",
};

export default function TransferSearch() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-gray-100" />}>
        <TransferSearchHero />
      </Suspense>
      <PopularTransferRoutes />
      <FAQ />
    </>
  );
}
