import { useState } from "react";

interface UseStopsDataProps {
  stopsData: any[];
  selectedStops: any[];
  setSelectedStops: (stops: any[] | ((prev: any[]) => any[])) => void;
  calculatePrice: (stop: any, duration?: number) => number;
  transportPrice: number;
  dateParam: string;
  timeParam: string;
  baseRideDurationMins: number | null;
  distanceKm: number;
}

export function useStopsData({
  stopsData,
  selectedStops,
  setSelectedStops,
  calculatePrice,
  transportPrice,
  dateParam,
  timeParam,
  baseRideDurationMins,
  distanceKm,
}: UseStopsDataProps) {
  const apiStops = (Array.isArray(stopsData) ? stopsData : []).map((stop: any) => {
    const duration = stop.duration !== undefined ? stop.duration : 60;
    const computedPrice = calculatePrice(stop, duration);
    const safePrice = (typeof computedPrice === "number" && !isNaN(computedPrice))
      ? computedPrice
      : (Number(stop.price) || 50);
    return {
      ...stop,
      duration,
      price: safePrice,
      latitude: stop.latitude ?? stop.location?.lat,
      longitude: stop.longitude ?? stop.location?.lng,
      image: Array.isArray(stop.image) ? stop.image : [stop.image].filter(Boolean),
      type: stop.type || (stop.types && stop.types[0]) || "Activity",
    };
  });

  const sortedStops = [...apiStops].sort((a, b) => {
    const levelA = a.level ?? 4;
    const levelB = b.level ?? 4;
    if (levelA !== levelB) {
      return levelA - levelB;
    }
    return (b.rating || 0) - (a.rating || 0);
  });
  
  const mostPopularId = sortedStops[0]?.id;
  const recommendedId = sortedStops[1]?.id;

  const customStopsInSelected = selectedStops.filter((s: any) => s.isCustom);
  const stops = [...sortedStops, ...customStopsInSelected];

  const toggleStop = (stop: any) => {
    if (selectedStops.find((s) => s.id === stop.id)) {
      setSelectedStops(selectedStops.filter((s) => s.id !== stop.id));
    } else {
      const computed = calculatePrice(stop, stop.duration || 60);
      const safePrice = (typeof stop.price === "number" && !isNaN(stop.price))
        ? stop.price
        : ((typeof computed === "number" && !isNaN(computed)) ? computed : 50);
      setSelectedStops([...selectedStops, { ...stop, price: safePrice }]);
    }
  };

  const handleUpdateStop = (updatedStop: any) => {
    const computed = calculatePrice(updatedStop, updatedStop.duration || 60);
    const safePrice = (typeof updatedStop.price === "number" && !isNaN(updatedStop.price))
      ? updatedStop.price
      : ((typeof computed === "number" && !isNaN(computed)) ? computed : 50);
    const sanitized = {
      ...updatedStop,
      price: safePrice,
    };
    if (selectedStops.find((s) => s.id === sanitized.id)) {
      setSelectedStops(selectedStops.map(s => s.id === sanitized.id ? sanitized : s));
    } else {
      setSelectedStops([...selectedStops, sanitized]);
    }
  };

  const stopsCost = selectedStops.reduce((total, stop) => total + (Number(stop.price) || 0), 0);
  const totalPrice = (Number(transportPrice) || 0) + stopsCost;

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

  return {
    stops,
    mostPopularId,
    recommendedId,
    toggleStop,
    handleUpdateStop,
    stopsCost,
    totalPrice,
    formattedDate,
    dropoffTimeStr,
  };
}
