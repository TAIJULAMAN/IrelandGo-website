import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import PopularMultiDayTourCard from "./popular-multi-day-tour-card";

interface PopularMultiDayTourGridProps {
  tours: any[];
  visibleTours: any[];
  mobileVisibleCount: number;
  handleMobileExploreMore: () => void;
}

export default function PopularMultiDayTourGrid({
  tours,
  visibleTours,
  mobileVisibleCount,
  handleMobileExploreMore,
}: PopularMultiDayTourGridProps) {
  return (
    <>
      {/* Desktop Grid (slider items) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {visibleTours.map((tour: any, idx: number) => (
          <PopularMultiDayTourCard key={tour.id || idx} tour={tour} />
        ))}
      </div>

      {/* Mobile Grid (expandable items) */}
      <div className="grid md:hidden grid-cols-2 gap-3 sm:gap-6">
        {tours
          .slice(0, mobileVisibleCount)
          .map((tour: any, idx: number) => (
            <PopularMultiDayTourCard key={tour.id || idx} tour={tour} />
          ))}
      </div>

      {/* Mobile Explore More Button */}
      {mobileVisibleCount < tours.length && (
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
