import { Suspense } from "react";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";
import PrivateCarTransferView from "@/components/transfer/private-car-transfer-view";

export default function PrivateCarTransfer() {
  return (
    <main className="bg-white min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-gray-400 text-sm font-medium animate-pulse">
              Loading transfer details...
            </div>
          </div>
        }
      >
        <PrivateCarTransferView />
      </Suspense>
      <Testimonials />
      <FAQ filterByServiceType="TRANSFER" />
    </main>
  );
}
