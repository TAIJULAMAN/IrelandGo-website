import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import TripCard from "./trip-card";

interface TripGridProps {
  filteredTrips: any[];
  visibleTrips: any[];
  mobileVisibleCount: number;
  setMobileVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  selectedCity: string;
}

export default function TripGrid({
  filteredTrips,
  visibleTrips,
  mobileVisibleCount,
  setMobileVisibleCount,
  selectedCity,
}: TripGridProps) {
  return (
    <>
      {filteredTrips.length > 0 ? (
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Desktop Grid (slider items) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {visibleTrips.map((trip: any, idx: number) => (
              <TripCard key={trip.id || idx} trip={trip} />
            ))}
          </div>

          {/* Mobile Grid (expandable items) */}
          <div className="grid md:hidden grid-cols-2 gap-3 sm:gap-6">
            {filteredTrips
              .slice(0, mobileVisibleCount)
              .map((trip: any, idx: number) => (
                <TripCard key={trip.id || idx} trip={trip} />
              ))}
          </div>

          {/* Mobile See More Button */}
          {mobileVisibleCount < filteredTrips.length && (
            <div className="flex md:hidden items-center justify-center mt-8 relative z-10">
              <Button
                onClick={() => setMobileVisibleCount((prev) => prev + 4)}
                variant="outline"
                className="rounded-full px-6 py-2.5 font-semibold text-sm bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 hover:border-blue-400 shadow-sm active:scale-95 transition-all flex items-center gap-2"
              >
                <span>See more</span>
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300 mx-auto max-w-2xl relative z-10">
          <p className="text-gray-500 text-lg font-medium">
            No day trips found for {selectedCity}.
          </p>
        </div>
      )}
    </>
  );
}
