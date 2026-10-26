"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TransferDetailsHero from "./transfer-details-hero";
import TransferItinerary from "./transfer-itinerary";

export default function PrivateCarTransferView() {
  const searchParams = useSearchParams();
  const pickupParam = searchParams.get("pickup") || "";
  const dropoffParam = searchParams.get("dropoff") || "";
  const transferRouteParam = searchParams.get("transferRoute");

  const [route, setRoute] = useState<any>(() => {
    if (transferRouteParam) {
      try {
        return JSON.parse(transferRouteParam);
      } catch (e) {}
    }
    return {
      from: pickupParam || "Dublin",
      to: dropoffParam || "Destination",
      title: `Private Transfer from ${pickupParam || "Dublin"} to ${dropoffParam || "Destination"}`,
      h1: `Private Transfer from ${pickupParam || "Dublin"} to ${dropoffParam || "Destination"}`,
    };
  });

  useEffect(() => {
    if (!transferRouteParam) {
      try {
        const stored = sessionStorage.getItem("current_transfer_route");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === "object") {
            setRoute((prev: any) => ({
              ...prev,
              ...parsed,
              from: pickupParam || parsed.from || prev.from,
              to: dropoffParam || parsed.to || prev.to,
            }));
          }
        }
      } catch (e) {}
    }
  }, [transferRouteParam, pickupParam, dropoffParam]);

  return (
    <>
      <TransferDetailsHero transferRoute={route} />
      <TransferItinerary transferRoute={route} />
    </>
  );
}
