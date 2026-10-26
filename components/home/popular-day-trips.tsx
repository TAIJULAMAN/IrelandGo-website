import { getBaseUrl } from "@/config/envConfig";
import { PopularDayTripsClient } from "./popular-day-trips-client";

async function getPopularTrips() {
  try {
    const res = await fetch(`${getBaseUrl()}trip-services/day-trip/popular`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Failed to fetch popular trips:", error);
    return [];
  }
}

export async function PopularDayTrips() {
  const trips = await getPopularTrips();
  
  if (!trips || trips.length === 0) return null;

  return <PopularDayTripsClient trips={trips} />;
}
