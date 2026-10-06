import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Loader2, Clock, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSingleStoppageQuery } from "@/Redux/features/stopage/stopageApi";

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

interface SingleStoppageModalProps {
  stopId: string;
  onClose: () => void;
  baseStop: any;
  existingStop: any;
  onAddOrUpdate: (stop: any) => void;
  onRemove: (stop: any) => void;
  calculatePrice?: any;
}

export function SingleStoppageModal({
  stopId,
  onClose,
  baseStop,
  existingStop,
  onAddOrUpdate,
  onRemove,
  calculatePrice
}: SingleStoppageModalProps) {
  const { data, isFetching } = useGetSingleStoppageQuery(stopId, { skip: !stopId });
  const stopData = data?.data?.data || data?.data || baseStop;

  const [durationMinutes, setDurationMinutes] = useState(existingStop ? existingStop.duration : (stopData?.duration || 120));
  const [imgIndex, setImgIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const currentPrice = calculatePrice
    ? (typeof calculatePrice === "function" ? calculatePrice(stopData, durationMinutes) : calculatePrice)
    : (Number(stopData?.price) || 50);
  const displayPrice = (typeof currentPrice === "number" && !isNaN(currentPrice)) ? currentPrice : 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) setImgIndex(i => (i === images.length - 1 ? 0 : i + 1));
      else setImgIndex(i => (i === 0 ? images.length - 1 : i - 1));
    }
  };

  const images = stopData?.image && stopData?.image?.length > 0 ? stopData.image : [
    "/Images/DayTrip.webp"
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh]">
        <div className="relative h-44 sm:h-56 w-full bg-gray-100 shrink-0 select-none overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <Image
            src={images[imgIndex]}
            alt={stopData?.name || "Stoppage"}
            fill
            className="object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {images.length > 1 && (
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); setImgIndex(i => (i === 0 ? images.length - 1 : i - 1)); }}
                className="pointer-events-auto p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setImgIndex(i => (i === images.length - 1 ? 0 : i + 1)); }}
                className="pointer-events-auto p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full backdrop-blur-md transition-all z-10"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300 bg-blue-900/60 px-2 py-0.5 rounded backdrop-blur-md mb-1.5 inline-block">
              {stopData?.type || "Sightseeing"}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md leading-tight">
              {stopData?.name}
            </h3>
          </div>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-left">
          {isFetching ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-600 h-8 w-8" /></div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Stop duration</div>
                  <div className="font-semibold text-sm flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-blue-600" /> {formatDuration(durationMinutes)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Extra fee</div>
                  <div className="font-semibold text-sm text-green-600">
                    €{displayPrice}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {stopData?.description || "A beautiful attraction to add to your journey."}
              </p>

              <div className="pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 block mb-2">Adjust Stop Duration</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDurationMinutes((prev: number) => Math.max(15, prev - 15))}
                    disabled={durationMinutes <= 15}
                    className="h-9 w-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-bold text-gray-900 w-20 text-center">
                    {formatDuration(durationMinutes)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDurationMinutes((prev: number) => prev + 15)}
                    className="h-9 w-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
          {existingStop ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  onRemove(baseStop);
                  onClose();
                }}
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                Remove Stop
              </Button>
              <Button
                onClick={() => {
                  onAddOrUpdate({
                    ...baseStop,
                    ...stopData,
                    duration: durationMinutes,
                    price: displayPrice
                  });
                  onClose();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Update Stop
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                onAddOrUpdate({
                  ...baseStop,
                  ...stopData,
                  duration: durationMinutes,
                  price: displayPrice
                });
                onClose();
              }}
              className="w-full flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Add this Stop
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
