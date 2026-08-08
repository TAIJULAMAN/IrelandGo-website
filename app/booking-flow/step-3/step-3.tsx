"use client";

import Link from "next/link";
import { MapPin, CheckCircle2, Loader2, Plus, Pencil, X, Users, Briefcase, Car, ChevronLeft, ChevronRight, Minus, AlertCircle, Clock, Map, Search, CloudCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useSearchPopularStopsMutation, useGetSingleStoppageQuery, useAddExtraStoppagesMutation } from "@/Redux/features/stopage/stopageApi";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function SingleStoppageModal({
  stopId,
  onClose,
  baseStop,
  existingStop,
  onAddOrUpdate,
  onRemove,
  calculatePrice
}: any) {
  const { data, isFetching } = useGetSingleStoppageQuery(stopId, { skip: !stopId });
  const stopData = data?.data?.data || data?.data || baseStop;


  const [durationMinutes, setDurationMinutes] = useState(existingStop ? existingStop.duration : (stopData?.duration || 120));
  const [imgIndex, setImgIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

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
    touchStartX.current = null;
  };

  const isDurationChanged = existingStop && durationMinutes !== existingStop.duration;

  if (!stopId) return null;

  const images = Array.isArray(stopData?.image) ? stopData.image : [stopData?.image].filter(Boolean);
  if (images.length === 0) images.push("/placeholder.jpg");

  return (
    <div className="fixed inset-0 z-[100] flex items-center md:items-center justify-center bg-black/60 backdrop-blur-sm md:p-5">
      <div className="bg-white rounded-lg sm:rounded-lg max-w-sm md:max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[70vh] md:max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{stopData?.name || baseStop?.name}</h2>
          <button onClick={onClose} className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 vehicle-scroll">
          {isFetching ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              <div
                className="relative h-44 sm:h-64 w-full rounded-lg overflow-hidden group"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img src={images[imgIndex]} alt={stopData?.name} className="w-full h-full object-cover" />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImgIndex(i => (i === 0 ? images.length - 1 : i - 1)); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow-sm hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setImgIndex(i => (i === images.length - 1 ? 0 : i + 1)); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow-sm hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_: any, idx: number) => (
                        <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === imgIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex-1 min-w-[100px]">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Clock className="h-3.5 w-3.5 text-purple-500" /> Suggested time
                  </div>
                  <div className="font-semibold text-sm">{formatDuration(stopData?.duration || 120)}</div>
                </div>
                <div className="flex-1 min-w-[100px] border-l border-gray-200 pl-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Map className="h-3.5 w-3.5 text-green-500" /> Attraction type
                  </div>
                  <div className="font-semibold text-sm">{stopData?.type || stopData?.types?.[0] || "Traveler favorite"}</div>
                </div>
                <div className="flex-1 min-w-[100px] border-l border-gray-200 pl-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <AlertCircle className="h-3.5 w-3.5 text-yellow-500" /> Entrance
                  </div>
                  <div className="font-semibold text-sm">Not included</div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {stopData?.description || "A beautiful attraction to add to your journey."}
              </p>
            </>
          )}
        </div>

        <div className="p-4 border-t flex items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-full border border-gray-200">
            <button onClick={() => setDurationMinutes((p: number) => Math.max(15, p - 15))} className="p-1.5 hover:bg-gray-200 rounded-full text-blue-600 transition-colors">
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-semibold w-8 text-center text-sm">{formatDuration(durationMinutes)}</span>
            <button onClick={() => setDurationMinutes((p: number) => p + 15)} className="p-1.5 hover:bg-gray-200 rounded-full text-blue-600 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {existingStop ? (
            <div className="flex flex-1 gap-2">
              <Button
                onClick={() => { onRemove(baseStop); onClose(); }}
                variant="outline"
                className="flex-1 bg-blue-600 text-white border-transparent hover:bg-blue-700 hover:text-white"
              >
                Remove
              </Button>
              {isDurationChanged && (
                <Button
                  onClick={() => { onAddOrUpdate({ ...baseStop, duration: durationMinutes, price: calculatePrice(baseStop, durationMinutes) }); onClose(); }}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                >
                  €{calculatePrice(baseStop, durationMinutes)} - Update
                </Button>
              )}
            </div>
          ) : (
            <Button onClick={() => { onAddOrUpdate({ ...baseStop, duration: durationMinutes, price: calculatePrice(baseStop, durationMinutes) }); onClose(); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              €{calculatePrice(baseStop, durationMinutes)} - Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Step3() {
  const searchParams = useSearchParams();
  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";
  const dateParam = searchParams.get("date") || "";
  const timeParam = searchParams.get("time") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const extraBags = parseInt(searchParams.get("extraBags") || "0");
  const vehicleId = searchParams.get("vehicleId");
  const transferRouteParam = searchParams.get("transferRoute");

  let distanceKm = 0;
  let transferRoute: any = null;
  if (transferRouteParam) {
    try {
      transferRoute = JSON.parse(transferRouteParam);
      distanceKm = transferRoute.distanceKm || 0;
    } catch (e) { }
  }

  const fromLat = searchParams.get("fromLat") || transferRoute?.fromLat || "";
  const fromLng = searchParams.get("fromLng") || transferRoute?.fromLng || "";
  const toLat = searchParams.get("toLat") || transferRoute?.toLat || "";
  const toLng = searchParams.get("toLng") || transferRoute?.toLng || "";
  const coordsParam = fromLat ? `&fromLat=${fromLat}&fromLng=${fromLng}&toLat=${toLat}&toLng=${toLng}` : "";

  const { isLoaded } = useGoogleMaps();

  const [selectedStops, setSelectedStops] = useState<any[]>([]);
  const [selectedModalStopId, setSelectedModalStopId] = useState<string | null>(null);
  const [customStopName, setCustomStopName] = useState("");
  const [customStopDuration, setCustomStopDuration] = useState(60);
  const [customStopLat, setCustomStopLat] = useState<number | null>(null);
  const [customStopLng, setCustomStopLng] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const router = useRouter();

  const [customStopRoadDistance, setCustomStopRoadDistance] = useState(0);
  const [popularStopDistances, setPopularStopDistances] = useState<Record<string, number>>({});
  const [baseRideDurationMins, setBaseRideDurationMins] = useState<number | null>(null);
  const [baseDistanceKm, setBaseDistanceKm] = useState<number | null>(null);

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

  const customStopEstimatedDistance = customStopRoadDistance;

  const [addExtraStoppages] = useAddExtraStoppagesMutation();

  useEffect(() => {
    let isMounted = true;
    if (isLoaded && pickupParam && dropoffParam) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickupParam,
          destination: dropoffParam,
          travelMode: window.google.maps.TravelMode.DRIVING,
          region: "ie",
        },
        (result, status) => {
          if (isMounted && status === window.google.maps.DirectionsStatus.OK && result) {
            const leg = result.routes[0].legs[0];
            const durationSecs = leg.duration?.value || 0;
            const distMeters = leg.distance?.value || 0;
            setBaseRideDurationMins(Math.round(durationSecs / 60));
            setBaseDistanceKm(distMeters / 1000);
          }
        }
      );
    }
    return () => {
      isMounted = false;
    };
  }, [isLoaded, pickupParam, dropoffParam]);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "ie" },
        fields: ["name", "geometry", "formatted_address"],
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
          setCustomStopName(name);
          setCustomStopLat(lat);
          setCustomStopLng(lng);
        }
      });

      const handleInput = () => {
        const val = inputRef.current?.value || "";
        setCustomStopName(val);
        if (!val.trim()) {
          setCustomStopLat(null);
          setCustomStopLng(null);
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


      console.log("image", stoppageImage)
      const stoppageAddress = addedStoppage?.address || "";

      const customStop = {
        id: stoppageId,
        name: stoppageName,
        duration: customStopDuration,
        price: calculateStopPrice({ roadDistance: customStopEstimatedDistance }, customStopDuration),
        image: stoppageImage,
        address: stoppageAddress,
        isCustom: true,
        latitude: customStopLat,
        longitude: customStopLng,
      };

      setSelectedStops(prev => [...prev, customStop]);
      setCustomStopName("");
      setCustomStopLat(null);
      setCustomStopLng(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (e: any) {
      console.error("Failed to add stoppage:", e);
      alert("Failed to add stoppage. Please select a location from the search dropdown.");
    }
  };

  const serviceType = searchParams.get("serviceType") || "TRANSFER";

  useEffect(() => {
    if (serviceType === "DAY_TRIP" || serviceType === "BY_THE_HOUR") {
      router.replace(`/booking-flow/step-3-details?${searchParams.toString()}`);
    }
  }, [serviceType, searchParams, router]);



  // console.log("Stoppages Page Coordinates:", { fromLat, fromLng, toLat, toLng });

  const [searchPopularStops, { data: popularStopsResponse, isLoading, error }] = useSearchPopularStopsMutation();
  // console.log("popularStopsResponse", popularStopsResponse)

  useEffect(() => {
    if (pickupParam && dropoffParam && fromLat && fromLng && toLat && toLng) {
      searchPopularStops({
        from: {
          location: pickupParam.split(",")[0].trim(),
          coordinates: [parseFloat(fromLat.toString()), parseFloat(fromLng.toString())],
        },
        to: {
          location: dropoffParam.split(",")[0].trim(),
          coordinates: [parseFloat(toLat.toString()), parseFloat(toLng.toString())],
        },
      });
    }
  }, [pickupParam, dropoffParam, searchPopularStops, fromLat, fromLng, toLat, toLng]);

  const { data: vehiclesData } = useGetVehiclesQuery({});
  const vehicles = vehiclesData?.data?.data || [];
  const carPriceParam = searchParams.get("carPrice");

  let transportPrice = 0;
  let vehicleName = "Vehicle";
  let pricePerKmSumForStops = 0;

  if (vehicleId && vehicles.length > 0) {
    const ids = vehicleId.split("+");
    const selectedVehicles = ids.map((id: string) => vehicles.find((v: any) => v.id === id)).filter(Boolean);

    if (selectedVehicles.length > 0) {
      vehicleName = selectedVehicles.map((v: any) => v.name).join(" + ");

      const basePriceSum = selectedVehicles.reduce((sum: number, v: any) => sum + v.basePrice, 0);

      const km = distanceKm || 0;
      pricePerKmSumForStops = selectedVehicles.reduce((sum: number, vehicle: any) => {
        const name = vehicle.name.toLowerCase();
        let isLSedan = name.includes("luxury sedan") || name.includes("l sedan") || name.includes("lsedan");
        let isMPV = !isLSedan && (name.includes("mpv") || name.includes("mvp") || name.includes("minivan"));
        let isVan = !isLSedan && !isMPV && name.includes("van");

        type Band = [number, number, number];
        const sedanBands: Band[] = [[25, 1.8, 50], [50, 1.8, 40], [100, 1.8, 30], [150, 1.8, 15], [Infinity, 1.9, 0]];
        const mpvBands: Band[] = [[25, 2.0, 65], [50, 2.0, 55], [100, 2.0, 45], [150, 2.0, 30], [Infinity, 2.1, 0]];
        const vanBands: Band[] = [[25, 2.2, 80], [50, 2.2, 70], [100, 2.2, 60], [150, 2.2, 45], [Infinity, 2.3, 0]];
        const lSedanBands: Band[] = [[25, 2.1, 70], [50, 2.1, 60], [100, 2.1, 50], [150, 2.1, 35], [Infinity, 2.15, 0]];

        const bands = isLSedan ? lSedanBands : isMPV ? mpvBands : isVan ? vanBands : sedanBands;
        const [, rate,] = bands.find(([max]) => km <= max) || bands[bands.length - 1];

        return sum + rate;
      }, 0);

      if (carPriceParam) {
        transportPrice = parseFloat(carPriceParam);
      } else {
        transportPrice = Math.round(basePriceSum + (pricePerKmSumForStops * distanceKm));
      }
    }
  }

  const calculateStopPrice = (stop: any, durationMinutes: number) => {
    let stopDistance = stop.roadDistance || stop.roaddistance || stop.distance || stop.distanceKm || 0;
    
    if (stop.id && popularStopDistances[stop.id] !== undefined) {
      stopDistance = popularStopDistances[stop.id];
    }

    const baseHourPrice = Math.round(50 + (stopDistance * pricePerKmSumForStops));

    const extraMinutes = durationMinutes - 60;
    if (extraMinutes <= 0) {
      return baseHourPrice;
    }

    const extraHours = Math.floor(extraMinutes / 60);
    const remainingMinutes = extraMinutes % 60;

    let extraCost = extraHours * 50;
    if (remainingMinutes >= 31) {
      extraCost += 50;
    } else if (remainingMinutes > 0) {
      extraCost += 30;
    }

    return baseHourPrice + extraCost;
  };

  const getStopImageUrl = (stop: any) => {
    let imgUrl = null;
    if (stop.image) {
      if (typeof stop.image === "string") {
        if (stop.image.startsWith("http") || stop.image.startsWith("/")) {
          imgUrl = stop.image;
        }
      } else if (Array.isArray(stop.image) && stop.image.length > 0) {
        const firstImg = stop.image[0];
        if (typeof firstImg === "string" && (firstImg.startsWith("http") || firstImg.startsWith("/"))) {
          imgUrl = firstImg;
        } else if (firstImg && typeof firstImg === "object" && firstImg.url) {
          imgUrl = firstImg.url;
        }
      }
    }

    if (imgUrl) return imgUrl;

    if (stop.latitude && stop.longitude && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== "undefined") {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      return `https://maps.googleapis.com/maps/api/staticmap?center=${stop.latitude},${stop.longitude}&zoom=15&size=500x300&markers=color:blue%7C${stop.latitude},${stop.longitude}&key=${apiKey}`;
    }
    return "/placeholder.jpg";
  };

  const stopsData = popularStopsResponse?.data?.searchableStoppage || [];

  useEffect(() => {
    let isMounted = true;
    if (isLoaded && stopsData.length > 0 && fromLat && fromLng && toLat && toLng) {
      const directionsService = new window.google.maps.DirectionsService();
      const originLat = parseFloat(fromLat.toString());
      const originLng = parseFloat(fromLng.toString());
      const destLat = parseFloat(toLat.toString());
      const destLng = parseFloat(toLng.toString());

      stopsData.forEach((stop: any) => {
        const stopLat = stop.latitude ?? stop.location?.lat;
        const stopLng = stop.longitude ?? stop.location?.lng;
        
        if (stopLat && stopLng && popularStopDistances[stop.id] === undefined) {
          directionsService.route(
            {
              origin: { lat: originLat, lng: originLng },
              destination: { lat: destLat, lng: destLng },
              waypoints: [{ location: { lat: stopLat, lng: stopLng }, stopover: true }],
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
                setPopularStopDistances(prev => ({ ...prev, [stop.id]: extraDist }));
              }
            }
          );
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [isLoaded, stopsData, fromLat, fromLng, toLat, toLng, distanceKm, baseDistanceKm]); // excluded popularStopDistances to avoid infinite dependency loops

  const apiStops = (Array.isArray(stopsData) ? stopsData : []).map((stop: any) => {
    const duration = stop.duration !== undefined ? stop.duration : 60;
    return {
      ...stop,
      duration,
      price: calculateStopPrice(stop, duration),
      latitude: stop.latitude ?? stop.location?.lat,
      longitude: stop.longitude ?? stop.location?.lng,
      image: Array.isArray(stop.image) ? stop.image : [stop.image].filter(Boolean),
      type: stop.type || (stop.types && stop.types[0]) || "Activity",
    };
  });

  const sortedStops = [...apiStops].sort((a, b) =>
    (b.totalRatings || b.user_ratings_total || b.rating || 0) - (a.totalRatings || a.user_ratings_total || a.rating || 0)
  );
  const mostPopularId = sortedStops[0]?.id;
  const recommendedId = sortedStops[1]?.id;

  const customStopsInSelected = selectedStops.filter((s: any) => s.isCustom);
  const stops = [...apiStops, ...customStopsInSelected].sort((a: any, b: any) => {
    const rank = (id: string) => id === mostPopularId ? 0 : id === recommendedId ? 1 : 2;
    return rank(a.id) - rank(b.id);
  });

  const toggleStop = (stop: any) => {
    if (selectedStops.find((s) => s.id === stop.id)) {
      setSelectedStops(selectedStops.filter((s) => s.id !== stop.id));
    } else {
      setSelectedStops([...selectedStops, stop]);
    }
  };

  const handleUpdateStop = (updatedStop: any) => {
    if (selectedStops.find((s) => s.id === updatedStop.id)) {
      setSelectedStops(selectedStops.map(s => s.id === updatedStop.id ? updatedStop : s));
    } else {
      setSelectedStops([...selectedStops, updatedStop]);
    }
  };

  const stopsCost = selectedStops.reduce((total, stop) => total + stop.price, 0);
  const totalPrice = transportPrice + stopsCost;

  let formattedDate = "";
  if (dateParam) {
    try {
      const d = new Date(dateParam);
      formattedDate = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    } catch (e) {
      formattedDate = dateParam;
    }
  }


  let dropoffTimeStr = "TBD";
  if (timeParam) {
    const totalStopsDuration = selectedStops.reduce((sum, stop) => sum + (stop.duration || 60), 0);
    const totalDuration = (baseRideDurationMins || Math.round(distanceKm * 1.2)) + totalStopsDuration;
    if (totalDuration > 0) {
      const parts = timeParam.split(":");
      if (parts.length >= 2) {
        let dateObj = new Date();
        dateObj.setHours(parseInt(parts[0]), parseInt(parts[1]), 0, 0);
        dateObj.setMinutes(dateObj.getMinutes() + totalDuration);
        const newHours = dateObj.getHours().toString().padStart(2, "0");
        const newMinutes = dateObj.getMinutes().toString().padStart(2, "0");
        dropoffTimeStr = `${newHours}:${newMinutes}`;
      }
    }
  }

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col pt-20">
      <div className="flex-1 py-6 sm:py-12 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step progress */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold shrink-0">
                1
              </div>
              <span className="hidden sm:inline">Trip Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-600 mx-1 sm:mx-2" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold shrink-0">
                2
              </div>
              <span className="hidden sm:inline">Choose Vehicle</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-600 mx-1 sm:mx-2" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold shrink-0">
                3
              </div>
              <span className="hidden sm:inline">Add Stops</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-1 sm:mx-2" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold shrink-0">
                4
              </div>
              <span className="hidden sm:inline">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-1 sm:mx-2" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold shrink-0">
                5
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6 sm:mb-8 mt-4 sm:mt-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-2">
            Step 3: Add Stops
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Select your stops for a fully personalized experience. Choose where
            you want to go, and we'll handle the rest.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3 mb-6 sm:mb-8 lg:mb-10">
          {/* Stops grid */}
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
                    <div
                      key={stop.id}
                      onClick={() => toggleStop(stop)}
                      className={`relative bg-white rounded-lg overflow-hidden transition-all cursor-pointer border-2
                        flex flex-row sm:flex-col
                        ${isSelected
                          ? "border-blue-600 ring-2 ring-blue-100 shadow-lg"
                          : "border-transparent shadow-md hover:border-blue-300 hover:shadow-lg"
                        }`}
                    >
                      {/* Image – full width on sm+, fixed size on mobile */}
                      <div className="relative w-32 shrink-0 sm:w-full h-32 sm:h-44">
                        <Image
                          src={getStopImageUrl(stop)}
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
                        {/* Name and Address only visible on sm+ inside image */}
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

                      {/* Info row – stacks differently on mobile */}
                      <div
                        className={`flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 transition-colors gap-1 sm:gap-0 ${isSelected ? "bg-blue-600" : "bg-white"
                          }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                          {/* Name visible on mobile inside info row */}
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
                            <span className={isSelected ? "text-white" : "text-gray-900"}>€{stop.price}</span>
                          </div>
                        </div>
                        <div
                          onClick={(e) => {
                            if (isSelected) {
                              e.stopPropagation();
                              setSelectedModalStopId(stop.id);
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
                })}
              </div>
            )}

            {/* Custom stop entry – shown after the predefined grid */}
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
                <Search className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm text-blue-700 font-medium">
                  Want a different stop? Add your own custom stop below.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  onKeyDown={(e) => e.key === "Enter" && handleAddCustomStop()}
                  placeholder="Search location to add stop"
                  className="flex-1 h-10 sm:h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <div className="flex gap-2 shrink-0 justify-between sm:justify-start">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white h-10 sm:h-11 overflow-hidden shrink-0">
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

                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg h-10 sm:h-11 px-3 shrink-0 select-none">
                    <span className="text-sm font-bold text-gray-800">
                      €{calculateStopPrice({ roadDistance: customStopEstimatedDistance }, customStopDuration)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCustomStop}
                    disabled={!customStopName.trim() || !customStopLat}
                    className="h-10 sm:h-11 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom navigation – inline below stops */}
            <div className="bg-white rounded-lg shadow-[0_4px_20px_rgb(0,0,0,0.08)] p-2 sm:p-3 px-4 sm:px-6 flex flex-col md:flex-row gap-2 items-center justify-between border border-gray-100 mt-2">
              <Button
                asChild

                className="w-full  sm:w-auto text-white bg-blue-600 x-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg flex items-center justify-center"
              >
                <Link href={`/booking-flow/step-2?${searchParams.toString()}`}>Back</Link>
              </Button>
              <Button
                asChild
                className="w-full  sm:w-auto text-white bg-blue-600 x-10 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg flex items-center justify-center"
              >
                <Link
                  href={`/booking-flow/step-3-details?${searchParams.toString()}&selectedStops=${encodeURIComponent(
                    JSON.stringify(selectedStops.map(s => ({ id: s.id, name: s.name, price: s.price, duration: s.duration })))
                  )}&distanceKm=${distanceKm}${coordsParam}`}
                >
                  Next: Checkout
                </Link>
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Itinerary</h2>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View details
                </button>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-gray-100 rounded-lg px-2 py-1 mb-4">
                  <span className="text-xs text-gray-600">📅</span>
                  <span className="text-xs font-semibold text-gray-800">
                    {formattedDate || "Select Date"}
                  </span>
                </div>

                <div className="relative pl-4 border-l-2 border-gray-200 space-y-6 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-gray-400" />
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-gray-900 text-sm">
                        {pickupParam || "Pickup Location"}
                      </p>
                      <p className="text-xs text-gray-500 font-medium whitespace-nowrap ml-2">
                        {timeParam || "9:00 AM"}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-gray-800" />
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-gray-900 text-sm">
                        {dropoffParam || "Dropoff Location"}
                      </p>
                      <p className="text-xs text-gray-500 font-medium whitespace-nowrap ml-2">
                        {dropoffTimeStr}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedStops.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Selected Stops</p>
                  <div className="space-y-2">
                    {selectedStops.map((stop) => {
                      const imageUrl = getStopImageUrl(stop);
                      return (
                        <div
                          key={stop.id}
                          className="relative flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                            <Image
                              src={imageUrl}
                              alt={stop.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 pr-6">
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                              {stop.name === "Brú na Bóinne" ? "Newgrange" : stop.name}
                            </h4>
                            {stop.address && (
                              <p className="text-[10px] text-gray-400 font-medium flex items-center gap-0.5 truncate mt-0.5">
                                <MapPin className="h-2.5 w-2.5 text-gray-300 shrink-0" />
                                {stop.address}
                              </p>
                            )}
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                {formatDuration(stop.duration)}
                              </span>
                              <span className="text-[10px] font-bold text-gray-900 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                €{stop.price}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleStop(stop)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-b border-gray-100 py-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-lg px-2 py-1">
                  <Users className="h-3.5 w-3.5 text-gray-500" />
                  <span>{adults + children}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-lg px-2 py-1">
                  <Briefcase className="h-3.5 w-3.5 text-gray-500" />
                  <span>{adults + children + extraBags}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-lg px-2 py-1">
                  <Car className="h-3.5 w-3.5 text-gray-500" />
                  <span className="truncate max-w-[70px]">
                    {vehicleName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 rounded-lg px-2 py-1">
                  <MapPin className="h-3.5 w-3.5 text-gray-500" />
                  <span>
                    {selectedStops.length} Stop
                    {selectedStops.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-900">Price details</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Transport</span>
                  <span className="font-semibold text-gray-900">
                    €{transportPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Stops</span>
                  <span className="font-semibold text-gray-900">€{stopsCost}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  €{totalPrice}
                </span>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-700 font-medium">
                  Free cancellation up to 24 hours before your pickup time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile price summary bar – visible only below lg */}
        <div className="lg:hidden mt-4 bg-white rounded-lg shadow-md border border-gray-100 px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Total</span>
            <span className="text-xl font-bold text-gray-900">€{totalPrice}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {selectedStops.length > 0 && (
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-full border border-blue-200">
                {selectedStops.length} stop{selectedStops.length !== 1 ? "s" : ""} selected
              </span>
            )}
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span>🚗 {vehicleName}</span>
            </div>
          </div>
        </div>

      </div>
      {selectedModalStopId && (
        <SingleStoppageModal
          stopId={selectedModalStopId}
          onClose={() => setSelectedModalStopId(null)}
          baseStop={stops.find((s: any) => s.id === selectedModalStopId) || {}}
          existingStop={selectedStops.find((s: any) => s.id === selectedModalStopId)}
          onAddOrUpdate={handleUpdateStop}
          onRemove={toggleStop}
          calculatePrice={calculateStopPrice}
        />
      )}

      <style jsx>{`
        .vehicle-scroll {
          scrollbar-width: none;
        }
        .vehicle-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <style>{`
        .pac-max-w-7xl {
          z-index: 999999 !important;
          border-radius: 12px !important;
          border: 1px solid #e5e7eb !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
          font-family: inherit !important;
          margin-top: 4px !important;
        }
        .pac-item {
          padding: 10px 14px !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
        }
        .pac-item:hover {
          background-color: #f3f4f6 !important;
        }
        .pac-item-query {
          font-size: 14px !important;
          color: #1f2937 !important;
        }
        .pac-matched {
          font-weight: 600 !important;
        }
      `}</style>
    </section >
  );
}
