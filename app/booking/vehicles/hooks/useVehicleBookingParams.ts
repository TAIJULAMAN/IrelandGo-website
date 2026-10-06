import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import {
  getBookingSession,
  syncUrlParamsToSession,
  cleanBrowserUrl,
  buildSemanticBookingUrl,
  BookingSessionData,
  saveBookingSession,
} from "@/utils/bookingSession";
import { useGetSingleDayTripQuery } from "@/Redux/features/dayTrip/dayTripApi";

export function useVehicleBookingParams(setSelectedVehicleName: (name: string) => void) {
  const { isLoaded } = useGoogleMaps();
  const searchParams = useSearchParams();
  
  const [session, setSession] = useState<BookingSessionData>(() => {
    if (typeof window !== "undefined" && window.location.search) {
      return syncUrlParamsToSession(searchParams);
    }
    return getBookingSession();
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search) {
      const updated = syncUrlParamsToSession(searchParams);
      setSession(updated);
      cleanBrowserUrl(buildSemanticBookingUrl("vehicles", updated));
    } else {
      const s = getBookingSession();
      setSession(s);
      if (s.vehicleName) setSelectedVehicleName(s.vehicleName);
    }
  }, [searchParams, setSelectedVehicleName]);

  const pickupParam = searchParams.get("pickup") || session.pickup || "";
  const dropoffParam = searchParams.get("dropoff") || session.dropoff || "";
  const adults = parseInt(searchParams.get("adults") || session.adults?.toString() || "2");
  const children = parseInt(searchParams.get("children") || session.children?.toString() || "0");
  const extraBags = parseInt(searchParams.get("extraBags") || session.extraBags?.toString() || "0");
  const serviceType = searchParams.get("serviceType") || session.serviceType || "TRANSFER";
  const tripType = searchParams.get("tripType") || session.tripType || "one-way";
  const durationParam = searchParams.get("duration") || session.duration || "";
  const tripId = searchParams.get("id") || session.id;

  const { data: dayTripData } = useGetSingleDayTripQuery(tripId as string, {
    skip: serviceType !== "DAY_TRIP" || !tripId,
  });
  const dayTrip = dayTripData?.data;

  const [localAdults, setLocalAdults] = useState(adults);
  const [localChildren, setLocalChildren] = useState(children);
  const [localExtraBags, setLocalExtraBags] = useState(extraBags);

  useEffect(() => {
    setLocalAdults(adults);
    setLocalChildren(children);
    setLocalExtraBags(extraBags);
  }, [adults, children, extraBags]);

  const handleUpdate = (type: "adults" | "children" | "extraBags", value: number) => {
    const updateObj: Partial<BookingSessionData> = {};
    if (type === "adults") {
      setLocalAdults(value);
      updateObj.adults = value;
    } else if (type === "children") {
      setLocalChildren(value);
      updateObj.children = value;
    } else if (type === "extraBags") {
      setLocalExtraBags(value);
      updateObj.extraBags = value;
    }
    
    saveBookingSession(updateObj);
    
    const newSession = { ...session, ...updateObj };
    setSession(newSession);
    cleanBrowserUrl(buildSemanticBookingUrl("vehicles", newSession));
  };

  const totalPassengers = localAdults + localChildren;
  const totalBags = localAdults + localChildren + localExtraBags;

  const transferRouteParam = searchParams.get("transferRoute");
  let transferRoute: any = null;
  try {
    if (transferRouteParam) {
      transferRoute = JSON.parse(transferRouteParam);
    }
  } catch (e) {
    console.error("Failed to parse transfer route", e);
  }

  const [distanceKm, setDistanceKm] = useState<number | null>(transferRoute?.distanceKm || null);
  const [coords, setCoords] = useState<{
    fromLat: number;
    fromLng: number;
    toLat: number;
    toLng: number;
  } | null>(null);

  useEffect(() => {
    if (serviceType === "DAY_TRIP" && dayTrip?.distanceKm) {
      setDistanceKm(dayTrip.distanceKm);
    }
  }, [dayTrip, serviceType]);

  useEffect(() => {
    let isMounted = true;
    if (isLoaded && pickupParam && dropoffParam && serviceType !== "DAY_TRIP") {
      if (!coords || !distanceKm) {
        const directionsService = new window.google.maps.DirectionsService();

        try {
          directionsService.route(
            {
              origin: pickupParam,
              destination: dropoffParam,
              travelMode: window.google.maps.TravelMode.DRIVING,
              region: "ie",
            },
            (result, status) => {
              if (!isMounted) return;

              if (status === window.google.maps.DirectionsStatus.OK && result) {
                const leg = result.routes[0].legs[0];

                if (!transferRoute?.distanceKm) {
                  setDistanceKm(Math.round((leg.distance?.value || 0) / 1000));
                }

                if (!coords) {
                  setCoords({
                    fromLat: leg.start_location.lat(),
                    fromLng: leg.start_location.lng(),
                    toLat: leg.end_location.lat(),
                    toLng: leg.end_location.lng(),
                  });
                }
              }
            },
          );
        } catch (_e) {}
      }
    }
    return () => {
      isMounted = false;
    };
  }, [isLoaded, pickupParam, dropoffParam, transferRoute, serviceType, coords, distanceKm]);

  return {
    session,
    pickupParam,
    dropoffParam,
    adults,
    children,
    extraBags,
    serviceType,
    tripType,
    durationParam,
    tripId,
    dayTrip,
    localAdults,
    localChildren,
    localExtraBags,
    handleUpdate,
    totalPassengers,
    totalBags,
    distanceKm,
    coords,
  };
}
