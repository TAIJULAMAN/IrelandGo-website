import Image from "next/image";
import { MapPin, Plus, Pencil } from "lucide-react";
import { memo, useState, useEffect } from "react";

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

interface StopCardProps {
  stop: any;
  isSelected: boolean;
  mostPopularId?: string;
  recommendedId?: string;
  onToggle: (stop: any) => void;
  onEdit: (stopId: string) => void;
  imageUrl: string;
}

export const StopCard = memo(({
  stop,
  isSelected,
  mostPopularId,
  recommendedId,
  onToggle,
  onEdit,
  imageUrl
}: StopCardProps) => {
  const [actualImageUrl, setActualImageUrl] = useState(imageUrl);

  useEffect(() => {
    if (imageUrl !== "/Images/DayTrip.webp") {
      setActualImageUrl(imageUrl);
      return;
    }
    
    if (typeof window !== "undefined" && window.google && window.google.maps && window.google.maps.places) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      
      const baseQuery = stop.googleName || stop.name || stop.address;
      if (baseQuery) {
        const queryStr = baseQuery.toLowerCase().includes("ireland") ? baseQuery : `${baseQuery}, Ireland`;
        
        const request: any = {
          query: queryStr,
          fields: ['photos', 'name']
        };

        if (stop.latitude && stop.longitude) {
          request.locationBias = {
            lat: Number(stop.latitude),
            lng: Number(stop.longitude)
          };
        }

        service.findPlaceFromQuery(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            // Find first result with photos
            const placeWithPhoto = results.find(r => r.photos && r.photos.length > 0);
            if (placeWithPhoto && placeWithPhoto.photos) {
              setActualImageUrl(placeWithPhoto.photos[0].getUrl({ maxWidth: 600, maxHeight: 400 }));
            }
          }
        });
      }
    }
  }, [imageUrl, stop.name, stop.googleName, stop.address, stop.latitude, stop.longitude]);

  return (
    <div
      onClick={() => onToggle(stop)}
      className={`relative bg-white rounded-lg overflow-hidden transition-all cursor-pointer border-2
        flex flex-row sm:flex-col
        ${isSelected
          ? "border-blue-600 ring-2 ring-blue-100 shadow-lg"
          : "border-transparent shadow-md hover:border-blue-300 hover:shadow-lg"
        }`}
    >
      <div className="relative w-32 shrink-0 sm:w-full h-32 sm:h-44">
        <Image
          src={actualImageUrl}
          alt={stop.name}
          fill
          sizes="(max-width: 640px) 128px, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent sm:from-black/80 sm:via-black/20" />
        {stop.id === mostPopularId && (
          <div className="absolute top-2 left-2 flex items-center bg-yellow-400 shadow-sm rounded-lg px-1.5 py-0.5 gap-0.5 sm:top-3 sm:left-3 sm:px-2 sm:py-1 sm:gap-1">
            <span className="text-white text-[9px] sm:text-[10px]">★</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wide">
              Most popular
            </span>
          </div>
        )}
        {stop.id === recommendedId && (
          <div className="absolute top-2 left-2 flex items-center bg-blue-600 shadow-sm rounded-lg px-1.5 py-0.5 gap-0.5 sm:top-3 sm:left-3 sm:px-2 sm:py-1 sm:gap-1">
            <span className="text-white text-[9px] sm:text-[10px]">👍</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wide">
              Recommended
            </span>
          </div>
        )}
        <div className="hidden sm:flex absolute bottom-3 left-4 right-4 flex-col text-white">
          <h3 className="text-lg font-bold leading-snug drop-shadow-md">
            {stop.googleName || stop.name}
          </h3>
          {stop.address && (
            <span className="text-[11px] font-medium opacity-90 flex items-center gap-1 mt-0.5 drop-shadow-sm">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{stop.address}</span>
            </span>
          )}
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 transition-colors gap-1 sm:gap-0 ${isSelected ? "bg-blue-600" : "bg-white"
          }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
          <p className={`sm:hidden font-bold text-sm leading-tight ${isSelected ? "text-white" : "text-gray-900"}`}>
            {stop.name}
          </p>
          {stop.address && (
            <span className={`sm:hidden text-[10px] flex items-center gap-1 mb-1 leading-tight ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
              <MapPin className="h-2.5 w-2.5 shrink-0" />
              <span className="truncate max-w-[150px]">{stop.address}</span>
            </span>
          )}
          <div className="flex items-center gap-1 text-sm font-medium">
            <span className={isSelected ? "text-blue-100" : "text-blue-600"}>
              {formatDuration(stop.duration)}
            </span>
            <span className={isSelected ? "text-blue-100" : "text-gray-500"}>for</span>
            <span className={isSelected ? "text-white" : "text-gray-900"}>€{Number(stop.price) || 50}</span>
          </div>
        </div>
        <div
          onClick={(e) => {
            if (isSelected) {
              e.stopPropagation();
              onEdit(stop.id);
            }
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors shrink-0 ${isSelected
            ? "bg-white text-blue-600 hover:bg-gray-100"
            : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          {isSelected ? <Pencil className="h-4 w-4" /> : <Plus className="h-5 w-5" />}
        </div>
      </div>
    </div>
  );
});

StopCard.displayName = "StopCard";
