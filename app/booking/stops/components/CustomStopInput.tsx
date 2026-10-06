import React, { useState, useEffect, useRef } from "react";
import { Search, Minus, Plus } from "lucide-react";
import { useAddExtraStoppagesMutation } from "@/Redux/features/stopage/stopageApi";

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

interface CustomStopInputProps {
  isLoaded: boolean;
  fromLat: string | number;
  fromLng: string | number;
  toLat: string | number;
  toLng: string | number;
  distanceKm: number;
  baseDistanceKm: number | null;
  calculateStopPrice: (stop: any, duration: number) => number;
  onAddStop: (stop: any) => void;
}

export function CustomStopInput({
  isLoaded,
  fromLat,
  fromLng,
  toLat,
  toLng,
  distanceKm,
  baseDistanceKm,
  calculateStopPrice,
  onAddStop,
}: CustomStopInputProps) {
  const [customStopName, setCustomStopName] = useState("");
  const [customStopDuration, setCustomStopDuration] = useState(60);
  const [customStopLat, setCustomStopLat] = useState<number | null>(null);
  const [customStopLng, setCustomStopLng] = useState<number | null>(null);
  const [customStopPhotoUrl, setCustomStopPhotoUrl] = useState<string | null>(null);
  const [customStopRoadDistance, setCustomStopRoadDistance] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [addExtraStoppages] = useAddExtraStoppagesMutation();

  useEffect(() => {
    let isMounted = true;
    if (isLoaded && customStopLat && customStopLng && fromLat && fromLng && toLat && toLng) {
      const directionsService = new window.google.maps.DirectionsService();

      const originLat = parseFloat(fromLat.toString());
      const originLng = parseFloat(fromLng.toString());
      const destLat = parseFloat(toLat.toString());
      const destLng = parseFloat(toLng.toString());

      directionsService.route(
        {
          origin: { lat: originLat, lng: originLng },
          destination: { lat: destLat, lng: destLng },
          waypoints: [{ location: { lat: customStopLat, lng: customStopLng }, stopover: true }],
          travelMode: window.google.maps.TravelMode.DRIVING,
          region: "ie",
        },
        (result, status) => {
          if (isMounted && status === window.google.maps.DirectionsStatus.OK && result) {
            let totalNewDistanceMeters = 0;
            result.routes[0].legs.forEach((leg: any) => {
              totalNewDistanceMeters += leg.distance?.value || 0;
            });
            const totalNewDistanceKm = totalNewDistanceMeters / 1000;
            const actualBaseDistance = baseDistanceKm !== null ? baseDistanceKm : distanceKm;
            const extraDist = Math.max(0, totalNewDistanceKm - actualBaseDistance);
            setCustomStopRoadDistance(extraDist);
          }
        }
      );
    } else {
      setCustomStopRoadDistance(0);
    }
    return () => {
      isMounted = false;
    };
  }, [isLoaded, customStopLat, customStopLng, fromLat, fromLng, toLat, toLng, distanceKm, baseDistanceKm]);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "ie" },
        fields: ["name", "geometry", "formatted_address", "photos"],
        types: ["establishment"],
      });

      if (fromLat && fromLng && toLat && toLng) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: parseFloat(fromLat.toString()), lng: parseFloat(fromLng.toString()) });
        bounds.extend({ lat: parseFloat(toLat.toString()), lng: parseFloat(toLng.toString()) });
        autocomplete.setBounds(bounds);
      }

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const name = place.name || place.formatted_address || "";
          
          let photoUrl = null;
          if (place.photos && place.photos.length > 0) {
            photoUrl = place.photos[0].getUrl({ maxWidth: 600, maxHeight: 400 });
          }
          
          setCustomStopName(name);
          setCustomStopLat(lat);
          setCustomStopLng(lng);
          setCustomStopPhotoUrl(photoUrl);
        }
      });

      const handleInput = () => {
        const val = inputRef.current?.value || "";
        setCustomStopName(val);
        if (!val.trim()) {
          setCustomStopLat(null);
          setCustomStopLng(null);
          setCustomStopPhotoUrl(null);
        }
      };

      inputRef.current.addEventListener("input", handleInput);
      autocompleteRef.current = autocomplete;

      return () => {
        if (inputRef.current) {
          inputRef.current.removeEventListener("input", handleInput);
        }
      };
    }
  }, [isLoaded, fromLat, fromLng, toLat, toLng]);

  const handleAddCustomStop = async () => {
    const trimmed = customStopName.trim();
    if (!trimmed) return;

    if (!customStopLat || !customStopLng) {
      alert("Please select a valid stop location from the search dropdown.");
      return;
    }

    try {
      const response = await addExtraStoppages({
        location: trimmed,
        latitude: customStopLat,
        longitude: customStopLng,
      }).unwrap();
      const addedStoppage = response?.data?.searchableStoppage?.[0] || response?.data || response;
      const stoppageId = addedStoppage?.id || addedStoppage?._id || `added-${Date.now()}`;
      const stoppageName = addedStoppage?.name || addedStoppage?.googleName || trimmed;
      const stoppageImage = addedStoppage?.image || [];

      const stoppageAddress = addedStoppage?.address || "";

      const customStop = {
        id: stoppageId,
        name: stoppageName,
        duration: customStopDuration,
        price: calculateStopPrice({ roadDistance: customStopRoadDistance }, customStopDuration),
        image: customStopPhotoUrl ? [customStopPhotoUrl, ...stoppageImage] : stoppageImage,
        address: stoppageAddress,
        isCustom: true,
        latitude: customStopLat,
        longitude: customStopLng,
      };

      onAddStop(customStop);
      setCustomStopName("");
      setCustomStopLat(null);
      setCustomStopLng(null);
      setCustomStopPhotoUrl(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (e: any) {
      console.error("Failed to add stoppage:", e);
      alert("Failed to add stoppage. Please select a location from the search dropdown.");
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
        <Search className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
        <p className="text-xs sm:text-sm text-blue-700 font-medium">
          Want a different stop? Add your own custom stop below.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <input
          ref={inputRef}
          type="text"
          onKeyDown={(e) => e.key === "Enter" && handleAddCustomStop()}
          placeholder="Search location to add stop"
          className="w-full lg:flex-1 h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <div className="grid grid-cols-2 sm:flex sm:flex-nowrap gap-2 shrink-0 w-full lg:w-auto">
          <div className="col-span-2 sm:col-span-1 flex items-center border border-gray-200 rounded-lg bg-white h-11 overflow-hidden shrink-0 justify-between">
            <button
              type="button"
              onClick={() => setCustomStopDuration(prev => Math.max(15, prev - 15))}
              disabled={customStopDuration <= 15}
              className="h-full px-3 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center justify-center border-r border-gray-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 text-sm font-semibold text-gray-700 min-w-[70px] text-center select-none">
              {formatDuration(customStopDuration)}
            </span>
            <button
              type="button"
              onClick={() => setCustomStopDuration(prev => Math.min(240, prev + 15))}
              disabled={customStopDuration >= 240}
              className="h-full px-3 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center justify-center border-l border-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="col-span-1 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg h-11 px-3 shrink-0 select-none">
            <span className="text-sm font-bold text-gray-800">
              €{calculateStopPrice({ roadDistance: customStopRoadDistance }, customStopDuration)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddCustomStop}
            disabled={!customStopName.trim() || !customStopLat}
            className="col-span-1 h-11 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-semibold rounded-lg transition-colors shrink-0 flex items-center justify-center gap-1.5 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
