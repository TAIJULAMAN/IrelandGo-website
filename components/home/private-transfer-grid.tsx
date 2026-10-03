import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import PrivateTransferCard from "./private-transfer-card";

interface PrivateTransferGridProps {
  transfers: any[];
  visibleTransfers: any[];
  mobileVisibleCount: number;
  handleMobileExploreMore: () => void;
}

export default function PrivateTransferGrid({
  transfers,
  visibleTransfers,
  mobileVisibleCount,
  handleMobileExploreMore,
}: PrivateTransferGridProps) {
  return (
    <>
      {/* Desktop Grid (slider items) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {visibleTransfers.map((transfer: any, idx: number) => (
          <PrivateTransferCard key={transfer.id || idx} transfer={transfer} />
        ))}
      </div>

      {/* Mobile Grid (expandable items) */}
      <div className="grid md:hidden grid-cols-2 gap-3 sm:gap-6">
        {transfers
          .slice(0, mobileVisibleCount)
          .map((transfer: any, idx: number) => (
            <PrivateTransferCard key={transfer.id || idx} transfer={transfer} />
          ))}
      </div>

      {/* Mobile Explore More Button */}
      {mobileVisibleCount < transfers.length && (
        <div className="flex md:hidden items-center justify-center mt-8">
          <Button
            onClick={handleMobileExploreMore}
            variant="outline"
            className="rounded-full px-6 py-2.5 font-semibold text-sm bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 hover:border-blue-400 shadow-sm active:scale-95 transition-all flex items-center gap-2"
          >
            <span>See more</span>
            <ArrowDown className="w-4 h-4" />
          </Button>
        </div>
      )}
    </>
  );
}
