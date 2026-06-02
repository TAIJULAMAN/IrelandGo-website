"use client"

import { useEffect, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsRenderer } from '@react-google-maps/api'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 53.4129,
    lng: -8.2439
};

interface MapRouteProps {
    pickup?: { lat?: number; lng?: number; name: string }
    dropoff?: { lat?: number; lng?: number; name: string }
}

export function MapRoute({ pickup, dropoff }: MapRouteProps) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: ["places"] as any
    })

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
    const [distance, setDistance] = useState<string | null>(null)

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

    useEffect(() => {
        if (isLoaded && pickup?.name && dropoff?.name && pickup.name.length > 5 && dropoff.name.length > 5) {
            const directionsService = new google.maps.DirectionsService();

            const origin = (pickup.lat !== undefined && pickup.lng !== undefined)
                ? { lat: pickup.lat, lng: pickup.lng }
                : pickup.name;

            const destination = (dropoff.lat !== undefined && dropoff.lng !== undefined)
                ? { lat: dropoff.lat, lng: dropoff.lng }
                : dropoff.name;

            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((result) => {
                const leg = result?.routes[0]?.legs[0];
                if (leg) {
                    const startLat = leg.start_location.lat();
                    const startLng = leg.start_location.lng();
                    const endLat = leg.end_location.lat();
                    const endLng = leg.end_location.lng();
                    
                    const isWithinBounds = (lat: number, lng: number) => {
                        return lat <= 55.5 && lat >= 51.3 && lng <= -5.3 && lng >= -10.8;
                    };

                    if (!isWithinBounds(startLat, startLng) || !isWithinBounds(endLat, endLng)) {
                        setDirections(null);
                        setDistance("Out of service area");
                        return;
                    }

                    setDirections(result);
                    if (leg.distance?.text) {
                        setDistance(leg.distance.text);
                    }
                }
            })
            .catch((e) => {
                // Silently catch the MapsRequestError to prevent console spam
                setDirections(null);
                setDistance(null);
            });
        } else {
            setDirections(null);
            setDistance(null);
        }
    }, [isLoaded, pickup?.name, pickup?.lat, pickup?.lng, dropoff?.name, dropoff?.lat, dropoff?.lng]);

    useEffect(() => {
        if (map && (pickup || dropoff) && !directions) {
            const bounds = new google.maps.LatLngBounds();

            if (pickup && pickup.lat !== undefined && pickup.lng !== undefined) {
                bounds.extend({ lat: pickup.lat, lng: pickup.lng });
            }
            if (dropoff && dropoff.lat !== undefined && dropoff.lng !== undefined) {
                bounds.extend({ lat: dropoff.lat, lng: dropoff.lng });
            }

            if (pickup?.lat !== undefined && dropoff?.lat !== undefined) {
                map.fitBounds(bounds);
            } else if (pickup?.lat !== undefined) {
                map.setCenter({ lat: pickup.lat!, lng: pickup.lng! });
                map.setZoom(12);
            } else if (dropoff?.lat !== undefined) {
                map.setCenter({ lat: dropoff.lat!, lng: dropoff.lng! });
                map.setZoom(12);
            }
        }
    }, [map, pickup, dropoff, directions]);

    if (!isLoaded) {
        return (
            <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: '340px' }}>
                <p className="text-gray-500">Loading map...</p>
            </div>
        )
    }
    const getPickupPos = () => {
        if (pickup?.lat !== undefined && pickup?.lng !== undefined) {
            return { lat: pickup.lat, lng: pickup.lng };
        }
        if (directions && directions.routes[0]?.legs[0]?.start_location) {
            return directions.routes[0].legs[0].start_location;
        }
        return null;
    };

    const getDropoffPos = () => {
        if (dropoff?.lat !== undefined && dropoff?.lng !== undefined) {
            return { lat: dropoff.lat, lng: dropoff.lng };
        }
        if (directions && directions.routes[0]?.legs[0]?.end_location) {
            return directions.routes[0].legs[0].end_location;
        }
        return null;
    };

    const pickupPos = getPickupPos();
    const dropoffPos = getDropoffPos();

    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-200" style={{ minHeight: '340px' }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                {directions && (
                    <DirectionsRenderer
                        directions={directions}
                        options={{
                            suppressMarkers: true,
                            polylineOptions: {
                                strokeColor: "#3b82f6",
                                strokeWeight: 5,
                                strokeOpacity: 0.8
                            },
                        }}
                    />
                )}
                {pickupPos && (
                    <MarkerF
                        position={pickupPos}
                        label={{ text: "P", color: "white" }}
                    />
                )}

                {dropoffPos && (
                    <MarkerF
                        position={dropoffPos}
                        label={{ text: "D", color: "white" }}
                    />
                )}
            </GoogleMap>

            {distance && (
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md z-[1000]">
                    <p className="text-sm font-medium text-gray-700">
                        Distance: <span className="text-blue-600">{distance}</span>
                    </p>
                </div>
            )}
        </div>
    )
}
