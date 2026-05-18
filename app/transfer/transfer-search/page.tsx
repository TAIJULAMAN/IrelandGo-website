import PopularTransferRoutes from "@/components/airport-transfers/transfer-routes/popular-transfer-routes";
import FAQ from "@/app/settings/faq/faq";
import TransferSearchHero from "@/components/transfer-search/transfer-search-hero";
import { Suspense } from "react";


export default function TransferSearch() {
    return (
        <div>
            <Suspense fallback={<div className="min-h-screen bg-gray-100" />}>
                <TransferSearchHero />
            </Suspense>
            <PopularTransferRoutes />
            <FAQ />        </div>
    );
}
