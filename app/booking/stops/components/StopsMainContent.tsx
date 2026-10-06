import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StopCard } from "./StopCard";
import { CustomStopInput } from "./CustomStopInput";
import { getStopImageUrl } from "../utils/stopUtils";
import { saveBookingSession, buildSemanticBookingUrl } from "@/utils/bookingSession";

interface StopsMainContentProps {
  isLoading: boolean;
  error: any;
  stops: any[];
  selectedStops: any[];
  mostPopularId?: string;
  recommendedId?: string;
  toggleStop: (stop: any) => void;
  setSelectedModalStopId: (id: string | null) => void;
  isLoaded: boolean;
  fromLat: string | number;
  fromLng: string | number;
  toLat: string | number;
  toLng: string | number;
  distanceKm: number;
  baseDistanceKm: number | null;
  calculatePrice: (stop: any, durationMinutes?: number) => number;
  setSelectedStops: (value: React.SetStateAction<any[]>) => void;
  session: any;
}

export function StopsMainContent({
  isLoading,
  error,
  stops,
  selectedStops,
  mostPopularId,
  recommendedId,
  toggleStop,
  setSelectedModalStopId,
  isLoaded,
  fromLat,
  fromLng,
  toLat,
  toLng,
  distanceKm,
  baseDistanceKm,
  calculatePrice,
  setSelectedStops,
  session,
}: StopsMainContentProps) {
  return (
    <div className="lg:col-span-2 space-y-3 sm:space-y-5">
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-48 text-red-500">
          Failed to load stops. Please try again.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {stops.map((stop: any) => {
            const isSelected = selectedStops.some((s) => s.id === stop.id);
            return (
              <StopCard
                key={stop.id}
                stop={stop}
                isSelected={isSelected}
                mostPopularId={mostPopularId}
                recommendedId={recommendedId}
                onToggle={toggleStop}
                onEdit={(id) => setSelectedModalStopId(id)}
                imageUrl={getStopImageUrl(stop)}
              />
            );
          })}
        </div>
      )}

      {/* Custom stop entry – shown after the predefined grid */}
      <CustomStopInput
        isLoaded={isLoaded}
        fromLat={fromLat}
        fromLng={fromLng}
        toLat={toLat}
        toLng={toLng}
        distanceKm={distanceKm}
        baseDistanceKm={baseDistanceKm}
        calculateStopPrice={calculatePrice}
        onAddStop={(customStop) =>
          setSelectedStops((prev) => [...prev, customStop])
        }
      />

      {/* Bottom navigation – inline below stops */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] p-3 px-4 sm:px-6 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100 mt-4">
        <Button asChild variant="outline" size="action">
          <Link href={buildSemanticBookingUrl("vehicles", session)}>
            Back
          </Link>
        </Button>
        <Button asChild size="action">
          <Link
            onClick={() => {
              saveBookingSession({
                selectedStops: selectedStops.map((s) => ({
                  id: s.id,
                  name: s.name,
                  price: s.price,
                  duration: s.duration,
                })),
                distanceKm: distanceKm || undefined,
              });
            }}
            href={buildSemanticBookingUrl(
              "user-info",
              session,
              session.vehicleName,
            )}
          >
            Next: Checkout
          </Link>
        </Button>
      </div>
    </div>
  );
}
