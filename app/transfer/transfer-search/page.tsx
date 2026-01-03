import PopularTransferRoutes from "@/components/airport-transfers/transfer-routes/popular-transfer-routes";
import FAQ from "@/components/common/faq";
import { Footer } from "@/components/layout/footer";
import TransferSearchHero from "@/components/transfer/transfer-search-hero";
import { Suspense } from "react";

export default function TransferSearch() {
    return (
        <div>
            <Suspense fallback={<div className="min-h-screen bg-gray-100" />}>
                <TransferSearchHero />
            </Suspense>
            <PopularTransferRoutes />
            <FAQ />
            <Footer />
        </div>
    );
}