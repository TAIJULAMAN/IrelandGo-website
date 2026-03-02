import PopularTransferRoutes from "@/components/airport-transfers/transfer-routes/popular-transfer-routes";
import TransferRoutesHero from "@/components/airport-transfers/transfer-routes/transfer-routes-hero";
import FAQ from "@/app/settings/faq/faq";

export default function TransferRoutes() {
  return (
    <div>
      <TransferRoutesHero />
      <PopularTransferRoutes />
      <FAQ />
    </div>
  );
}
