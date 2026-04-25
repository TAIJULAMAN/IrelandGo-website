import PopularTransferRoutes from "@/components/airport-transfers/transfer-routes/popular-transfer-routes";
import FAQ from "@/app/settings/faq/faq";
import { Footer } from "@/components/layout/footer";


export default function TransferSearch() {
    return (
        <div>
            <PopularTransferRoutes />
            <FAQ />
            <Footer />
        </div>
    );
}