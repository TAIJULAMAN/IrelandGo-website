export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

export function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
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

export const calculateStopPrice = (
  stop: any,
  durationMinutes: number | undefined,
  pricePerKmSumForStops: number,
  popularStopDistances: Record<string, number>
) => {
  let actualStop = stop;
  let actualDuration = durationMinutes;

  if (typeof stop === "number" && durationMinutes === undefined) {
    actualDuration = stop;
    actualStop = {};
  } else if (!actualStop || typeof actualStop !== "object") {
    actualStop = {};
  }

  const duration = typeof actualDuration === "number" && !isNaN(actualDuration)
    ? actualDuration
    : (Number(actualStop.duration) || 60);

  let stopDistance = actualStop.roadDistance || actualStop.roaddistance || actualStop.distance || actualStop.distanceKm || 0;

  if (actualStop.id && popularStopDistances[actualStop.id] !== undefined) {
    stopDistance = popularStopDistances[actualStop.id];
  }

  const effectiveRatePerKm = (typeof pricePerKmSumForStops === "number" && !isNaN(pricePerKmSumForStops) && pricePerKmSumForStops > 0)
    ? pricePerKmSumForStops
    : 1.8;

  const baseHourPrice = Math.round(50 + ((Number(stopDistance) || 0) * effectiveRatePerKm));

  const extraMinutes = duration - 60;
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

  const finalPrice = baseHourPrice + extraCost;
  return (typeof finalPrice === "number" && !isNaN(finalPrice)) ? finalPrice : 50;
};

export const getStopImageUrl = (stop: any) => {
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

  return "/Images/DayTrip.webp";
};
