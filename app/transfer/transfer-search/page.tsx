import PopularTransferRoutes from "@/components/airport-transfers/transfer-routes/popular-transfer-routes";
import FAQ from "@/components/day-trips/faq";
import { Footer } from "@/components/layout/footer";
import TransferSearchHero from "@/components/transfer/transfer-search-hero";

export default function TransferSearch() {
    return (
        <div>
            <TransferSearchHero />
            <PopularTransferRoutes />
            <FAQ />
            <Footer />
        </div>
    );
}