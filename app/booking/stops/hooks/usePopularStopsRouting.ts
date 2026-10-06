import { useState, useEffect } from "react";
import { useSearchPopularStopsMutation } from "@/Redux/features/stopage/stopageApi";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

export function usePopularStopsRouting({
  pickupParam,
  dropoffParam,
  fromLat,
  fromLng,
  toLat,
  toLng,
  distanceKm,
}: {
  pickupParam: string;
  dropoffParam: string;
  fromLat: string | number;
  fromLng: string | number;
  toLat: string | number;
  toLng: string | number;
  distanceKm: number;
}) {
  const { isLoaded } = useGoogleMaps();
  const [popularStopDistances, setPopularStopDistances] = useState<Record<string, number>>({});
  const [baseRideDurationMins, setBaseRideDurationMins] = useState<number | null>(null);
  const [baseDistanceKm, setBaseDistanceKm] = useState<number | null>(null);

  const [searchPopularStops, { data: popularStopsResponse, isLoading, error }] = useSearchPopularStopsMutation();
  const stopsData = popularStopsResponse?.data?.searchableStoppage || [];

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
  }, [isLoaded, stopsData, fromLat, fromLng, toLat, toLng, distanceKm, baseDistanceKm]); 

  return {
    isLoaded,
    stopsData,
    popularStopDistances,
    baseRideDurationMins,
    baseDistanceKm,
    isLoading,
    error,
  };
}
