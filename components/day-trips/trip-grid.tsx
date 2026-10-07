import { Button } from "@/components/ui/button";
import { ArrowDown, MapPinOff } from "lucide-react";
import TripCard from "./trip-card";

interface TripGridProps {
  filteredTrips: any[];
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  selectedCity: string;
}

export default function TripGrid({
  filteredTrips,
  visibleCount,
  setVisibleCount,
  selectedCity,
}: TripGridProps) {
  return (
    <>
      {filteredTrips.length > 0 ? (
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredTrips
              .slice(0, visibleCount)
              .map((trip: any, idx: number) => (
                <TripCard key={trip.id || idx} trip={trip} />
              ))}
          </div>

          {visibleCount < filteredTrips.length && (
            <div className="flex items-center justify-center mt-8 relative z-10">
              <Button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                variant="outline"
                className="rounded-full px-6 py-2.5 font-semibold text-sm bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 hover:border-blue-400 shadow-sm active:scale-95 transition-all flex items-center gap-2"
              >
                <span>See More</span>
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-6 bg-gradient-to-b from-white/80 to-blue-50/30  mx-auto max-w-2xl relative z-10 transition-all duration-300 ">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
            No trips found
          </h3>
          <p className="text-gray-500 text-center max-w-md text-base md:text-lg">
            We couldn't find any day trips for {selectedCity} matching your
            search. Try exploring other destinations!
          </p>
        </div>
      )}
    </>
  );
}
