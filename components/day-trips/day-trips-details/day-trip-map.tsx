"use client";

import { useEffect, useState, useCallback } from "react";
import { GoogleMap, DirectionsRenderer, MarkerF } from "@react-google-maps/api";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 53.4129,
  lng: -8.2439,
};

interface DayTripMapProps {
  origin: string;
  destination: string;
  stops?: Array<{ name: string; [key: string]: any }>;
}

export function DayTripMap({ origin, destination }: DayTripMapProps) {
  const { isLoaded } = useGoogleMaps();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [startPos, setStartPos] = useState<google.maps.LatLng | null>(null);
  const [destPos, setDestPos] = useState<google.maps.LatLng | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Fetch driving directions
  useEffect(() => {
    if (!isLoaded || !origin || !destination) return;

    let isMounted = true;

    const originQuery = origin.toLowerCase().includes("ireland")
      ? origin
      : `${origin}, Ireland`;

    const destQuery = destination.toLowerCase().includes("ireland")
      ? destination
      : `${destination}, Ireland`;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: originQuery,
        destination: destQuery,
        travelMode: window.google.maps.TravelMode.DRIVING,
        region: "ie",
      },
      (result, status) => {
        if (!isMounted) return;

        if (status === window.google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          const route = result.routes[0];
          if (route && route.legs && route.legs.length > 0) {
            const firstLeg = route.legs[0];
            const lastLeg = route.legs[route.legs.length - 1];

            setStartPos(firstLeg.start_location);
            setDestPos(lastLeg.end_location);
          }
        } else {
          // Graceful fallback: geocode destination if directions fail
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: destQuery }, (results, gStatus) => {
            if (
              isMounted &&
              gStatus === "OK" &&
              results?.[0]?.geometry?.location
            ) {
              setDestPos(results[0].geometry.location);
              if (map) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(10);
              }
            }
          });
        }
      },
    );

    return () => {
      isMounted = false;
    };
  }, [isLoaded, origin, destination, map]);

  // SVGs for custom markers matching reference visual
  const originMarkerIcon =
    typeof window !== "undefined" && window.google?.maps
      ? {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" fill="#ffffff" stroke="#2563eb" stroke-width="3.5" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.25))"/>
              <circle cx="14" cy="14" r="5" fill="#2563eb"/>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(28, 28),
          anchor: new window.google.maps.Point(14, 14),
        }
      : undefined;

  const destinationMarkerIcon =
    typeof window !== "undefined" && window.google?.maps
      ? {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="44" viewBox="0 0 34 44" fill="none">
              <defs>
                <filter id="shadow" x="-20%" y="-10%" width="140%" height="130%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.35"/>
                </filter>
              </defs>
              <path d="M17 1C8.61 1 1 8.61 1 18C1 27.8 15.6 42.5 17.22 44.13C17.65 44.56 18.35 44.56 18.78 44.13C20.4 42.5 35 27.8 35 18C35 8.61 27.39 1 17 1Z" fill="#1d4ed8" stroke="#ffffff" stroke-width="1.5" filter="url(#shadow)"/>
              <circle cx="17" cy="16.5" r="8" fill="#ffffff"/>
              <text x="17" y="20.5" font-size="12" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="bold" fill="#1d4ed8" text-anchor="middle">1</text>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(34, 44),
          anchor: new window.google.maps.Point(17, 43),
        }
      : undefined;

  const mapStyles: google.maps.MapTypeStyle[] = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#dcfce7" }, { visibility: "simplified" }],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e2e8f0" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#bae6fd" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#f1f5f9" }],
    },
  ];

  if (!isLoaded) {
    return (
      <div
        suppressHydrationWarning
        className="bg-white rounded-2xl p-3 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-200/90 animate-pulse"
      >
        <div className="w-full h-[250px] sm:h-[280px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs font-medium">
          Loading route map...
        </div>
      </div>
    );
  }

  return (
    <div
      suppressHydrationWarning
      className="bg-white rounded-2xl p-3 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-200/90 hover:border-gray-300 transition-all"
    >
      {/* Map Container */}
      <div className="relative w-full h-[250px] sm:h-[280px] rounded-xl overflow-hidden border border-gray-200/80 bg-gray-100">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={7}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            zoomControlOptions: {
              position:
                typeof window !== "undefined" && window.google?.maps
                  ? window.google.maps.ControlPosition.RIGHT_BOTTOM
                  : undefined,
            },
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: "cooperative",
            styles: mapStyles,
          }}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                preserveViewport: false,
                polylineOptions: {
                  strokeColor: "#2563eb",
                  strokeWeight: 5,
                  strokeOpacity: 0.9,
                },
              }}
            />
          )}

          {/* Custom Origin Marker (Concentric Circle) */}
          {startPos && originMarkerIcon && (
            <MarkerF
              position={startPos}
              icon={originMarkerIcon}
              title={`Start: ${origin}`}
            />
          )}

          {/* Custom Destination Marker (Numbered Blue Pin) */}
          {destPos && destinationMarkerIcon && (
            <MarkerF
              position={destPos}
              icon={destinationMarkerIcon}
              title={`Destination: ${destination}`}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default DayTripMap;
