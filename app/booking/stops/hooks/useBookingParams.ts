import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  getBookingSession,
  syncUrlParamsToSession,
  cleanBrowserUrl,
  buildSemanticBookingUrl,
  BookingSessionData,
} from "@/utils/bookingSession";

export function useBookingParams() {
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
      cleanBrowserUrl(buildSemanticBookingUrl("stops", updated));
    } else {
      setSession(getBookingSession());
    }
  }, [searchParams]);

  const pickupParam = searchParams.get("pickup") || session.pickup || "";
  const dropoffParam = searchParams.get("dropoff") || session.dropoff || "";
  const dateParam = searchParams.get("date") || session.date || "";
  const timeParam = searchParams.get("time") || session.time || "";
  const adults = parseInt(searchParams.get("adults") || session.adults?.toString() || "2");
  const children = parseInt(searchParams.get("children") || session.children?.toString() || "0");
  const extraBags = parseInt(searchParams.get("extraBags") || session.extraBags?.toString() || "0");
  const vehicleId = searchParams.get("vehicleId") || session.vehicleId;
  const transferRouteParam = searchParams.get("transferRoute");
  const sessionCarPrice = searchParams.get("carPrice") || session.carPrice;
  const serviceType = searchParams.get("serviceType") || session.serviceType || "TRANSFER";

  let distanceKm = session.distanceKm || 0;
  let transferRoute: any = session.transferRoute || null;
  if (transferRouteParam) {
    try {
      transferRoute = JSON.parse(transferRouteParam);
      distanceKm = transferRoute.distanceKm || distanceKm;
    } catch (e) { }
  }

  const fromLat = searchParams.get("fromLat") || session.coords?.fromLat || transferRoute?.fromLat || "";
  const fromLng = searchParams.get("fromLng") || session.coords?.fromLng || transferRoute?.fromLng || "";
  const toLat = searchParams.get("toLat") || session.coords?.toLat || transferRoute?.toLat || "";
  const toLng = searchParams.get("toLng") || session.coords?.toLng || transferRoute?.toLng || "";
  const coordsParam = fromLat ? `&fromLat=${fromLat}&fromLng=${fromLng}&toLat=${toLat}&toLng=${toLng}` : "";

  return {
    session,
    pickupParam,
    dropoffParam,
    dateParam,
    timeParam,
    adults,
    children,
    extraBags,
    vehicleId,
    distanceKm,
    fromLat,
    fromLng,
    toLat,
    toLng,
    coordsParam,
    sessionCarPrice,
    serviceType,
  };
}
