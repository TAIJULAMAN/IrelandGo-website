"use client";

export interface BookingSessionData {
  serviceType: string;
  id?: string;
  pickup: string;
  dropoff: string;
  date?: string;
  time?: string;
  adults: number;
  children: number;
  extraBags: number;
  tripType: string;
  returnDate?: string;
  returnTime?: string;
  duration?: string;
  transferRoute?: any;
  vehicleId?: string;
  vehicleName?: string;
  carPrice?: number;
  distanceKm?: number;
  coords?: {
    fromLat?: number;
    fromLng?: number;
    toLat?: number;
    toLng?: number;
  };
  selectedStops?: any[];
  bookingId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  specialRequests?: string;
}

const STORAGE_KEY = "irelandgo_booking_session";

export const defaultBookingSession: BookingSessionData = {
  serviceType: "TRANSFER",
  pickup: "",
  dropoff: "",
  adults: 2,
  children: 0,
  extraBags: 0,
  tripType: "one-way",
  selectedStops: [],
};

/**
 * Get current booking session from sessionStorage
 */
export function getBookingSession(): BookingSessionData {
  if (typeof window === "undefined") {
    return { ...defaultBookingSession };
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultBookingSession };
    return { ...defaultBookingSession, ...JSON.parse(raw) };
  } catch (error) {
    console.error("Error reading booking session from sessionStorage:", error);
    return { ...defaultBookingSession };
  }
}

/**
 * Save / merge updates to booking session in sessionStorage
 */
export function saveBookingSession(
  updates: Partial<BookingSessionData>,
): BookingSessionData {
  if (typeof window === "undefined") {
    return { ...defaultBookingSession, ...updates };
  }

  try {
    const current = getBookingSession();
    const merged = { ...current, ...updates };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch (error) {
    console.error("Error saving booking session to sessionStorage:", error);
    return { ...defaultBookingSession, ...updates };
  }
}

/**
 * Clear the booking session from sessionStorage
 */
export function clearBookingSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing booking session:", error);
  }
}

/**
 * Sync URL searchParams to sessionStorage.
 * If searchParams contain booking data, parse and merge into session.
 */
export function syncUrlParamsToSession(
  searchParams: { get: (key: string) => string | null; toString: () => string },
): BookingSessionData {
  const updates: Partial<BookingSessionData> = {};

  const serviceType = searchParams.get("serviceType");
  if (serviceType) updates.serviceType = serviceType;

  const id = searchParams.get("id");
  if (id) updates.id = id;

  const pickup = searchParams.get("pickup");
  if (pickup) updates.pickup = pickup;

  const dropoff = searchParams.get("dropoff");
  if (dropoff) updates.dropoff = dropoff;

  const date = searchParams.get("date");
  if (date) updates.date = date;

  const time = searchParams.get("time");
  if (time) updates.time = time;

  const adults = searchParams.get("adults");
  if (adults) updates.adults = parseInt(adults, 10) || 2;

  const children = searchParams.get("children");
  if (children) updates.children = parseInt(children, 10) || 0;

  const extraBags = searchParams.get("extraBags");
  if (extraBags) updates.extraBags = parseInt(extraBags, 10) || 0;

  const tripType = searchParams.get("tripType");
  if (tripType) updates.tripType = tripType;

  const returnDate = searchParams.get("returnDate");
  if (returnDate) updates.returnDate = returnDate;

  const returnTime = searchParams.get("returnTime");
  if (returnTime) updates.returnTime = returnTime;

  const duration = searchParams.get("duration");
  if (duration) updates.duration = duration;

  const vehicleId = searchParams.get("vehicleId");
  if (vehicleId) updates.vehicleId = vehicleId;

  const carPrice = searchParams.get("carPrice");
  if (carPrice) updates.carPrice = parseFloat(carPrice) || 0;

  const distanceKm = searchParams.get("distanceKm");
  if (distanceKm) updates.distanceKm = parseFloat(distanceKm) || 0;

  const bookingId = searchParams.get("bookingId");
  if (bookingId) updates.bookingId = bookingId;

  const transferRouteParam = searchParams.get("transferRoute");
  if (transferRouteParam) {
    try {
      updates.transferRoute = JSON.parse(transferRouteParam);
    } catch { }
  }

  const selectedStopsParam = searchParams.get("selectedStops");
  if (selectedStopsParam) {
    try {
      updates.selectedStops = JSON.parse(selectedStopsParam);
    } catch { }
  }

  const fromLat = searchParams.get("fromLat");
  const fromLng = searchParams.get("fromLng");
  const toLat = searchParams.get("toLat");
  const toLng = searchParams.get("toLng");
  if (fromLat && fromLng) {
    updates.coords = {
      fromLat: parseFloat(fromLat),
      fromLng: parseFloat(fromLng),
      toLat: toLat ? parseFloat(toLat) : undefined,
      toLng: toLng ? parseFloat(toLng) : undefined,
    };
  }

  if (Object.keys(updates).length > 0) {
    return saveBookingSession(updates);
  }

  return getBookingSession();
}

/**
 * Clean up the URL query parameters from the browser address bar without triggering a page reload.
 */
export function cleanBrowserUrl(cleanPath: string): void {
  if (typeof window !== "undefined" && window.location.search) {
    window.history.replaceState({}, "", cleanPath);
  }
}

export function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Builds clean semantic URL for booking steps
 * e.g. /booking/transfers/dublin-to-cork/vehicles
 * e.g. /booking/transfers/dublin-to-cork/mercedes-e-class/user-info
 */
export function buildSemanticBookingUrl(
  step: "vehicles" | "stops" | "user-info" | "payment",
  session: Partial<BookingSessionData>,
  vehicleName?: string
): string {
  const serviceType = session.serviceType || "TRANSFER";
  let serviceSlug = "transfers";
  if (serviceType === "DAY_TRIP") serviceSlug = "day-trips";
  else if (serviceType === "AIRPORT_TRANSFER") serviceSlug = "airport-transfers";
  else if (serviceType === "BY_THE_HOUR") serviceSlug = "by-the-hour";

  const pickup = session.pickup ? slugifyText(session.pickup) : "dublin";
  const dropoff = session.dropoff ? slugifyText(session.dropoff) : "ireland";
  const routeSlug = serviceType === "BY_THE_HOUR" ? `${pickup}-hire` : `${pickup}-to-${dropoff}`;

  if (step === "user-info" && vehicleName) {
    const vSlug = slugifyText(vehicleName);
    return `/booking/${serviceSlug}/${routeSlug}/${vSlug}/user-info`;
  }

  return `/booking/${serviceSlug}/${routeSlug}/${step}`;
}
