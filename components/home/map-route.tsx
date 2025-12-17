"use client"

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapRouteProps {
    pickup?: { lat: number; lng: number; name: string }
    dropoff?: { lat: number; lng: number; name: string }
}

function MapUpdater({ pickup, dropoff }: MapRouteProps) {
    const map = useMap()

    useEffect(() => {
        if (pickup && dropoff) {
            const bounds = L.latLngBounds([
                [pickup.lat, pickup.lng],
                [dropoff.lat, dropoff.lng]
            ])
            map.fitBounds(bounds, { padding: [50, 50] })
        } else if (pickup) {
            map.setView([pickup.lat, pickup.lng], 10)
        } else if (dropoff) {
            map.setView([dropoff.lat, dropoff.lng], 10)
        }
    }, [pickup, dropoff, map])

    return null
}

export function MapRoute({ pickup, dropoff }: MapRouteProps) {
    const [route, setRoute] = useState<[number, number][]>([])
    const [distance, setDistance] = useState<number | null>(null)
    const [isClient, setIsClient] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [mapKey, setMapKey] = useState(0)
    const [hasError, setHasError] = useState(false)

    // Ensure component only renders on client side
    useEffect(() => {
        console.log('MapRoute component mounted')
        setIsClient(true)
        // Increase delay to ensure DOM is fully ready
        const timer = setTimeout(() => {
            setIsMounted(true)
        }, 200)
        return () => {
            clearTimeout(timer)
            console.log('MapRoute component unmounted')
        }
    }, [])

    // Force map recreation when pickup or dropoff changes
    useEffect(() => {
        if (pickup?.name || dropoff?.name) {
            // Add a small delay before recreating the map
            const timer = setTimeout(() => {
                setMapKey(prev => prev + 1)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [pickup?.name, dropoff?.name])

    // Fetch route from OSRM when both locations are available
    useEffect(() => {
        console.log('Pickup:', pickup, 'Dropoff:', dropoff)
        if (pickup && dropoff) {
            const fetchRoute = async () => {
                try {
                    const url = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}?overview=full&geometries=geojson`
                    const response = await fetch(url)
                    const data = await response.json()

                    if (data.routes && data.routes[0]) {
                        const coordinates = data.routes[0].geometry.coordinates.map(
                            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
                        )
                        setRoute(coordinates)
                        setDistance(data.routes[0].distance / 1000) // Convert to km
                    }
                } catch (error) {
                    console.error('Error fetching route:', error)
                }
            }

            fetchRoute()
        } else {
            setRoute([])
            setDistance(null)
        }
    }, [pickup, dropoff])

    // Default center (Ireland)
    const defaultCenter: [number, number] = [53.4129, -8.2439]
    const defaultZoom = 7

    if (!isClient || !isMounted) {
        return (
            <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: '400px' }}>
                <p className="text-gray-500">Loading map...</p>
            </div>
        )
    }

    if (hasError) {
        return (
            <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: '400px' }}>
                <p className="text-gray-500">Map temporarily unavailable</p>
            </div>
        )
    }

    try {
        return (
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-200" style={{ minHeight: '400px' }}>
                <MapContainer
                    center={defaultCenter}
                    zoom={defaultZoom}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%', minHeight: '400px' }}
                    key={`map-${mapKey}`}
                    whenReady={() => {
                        console.log('Map is ready');
                    }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapUpdater pickup={pickup} dropoff={dropoff} />

                    {pickup && (
                        <Marker position={[pickup.lat, pickup.lng]}>
                            <Popup>
                                <strong>Pickup:</strong> {pickup.name}
                            </Popup>
                        </Marker>
                    )}

                    {dropoff && (
                        <Marker position={[dropoff.lat, dropoff.lng]}>
                            <Popup>
                                <strong>Dropoff:</strong> {dropoff.name}
                            </Popup>
                        </Marker>
                    )}

                    {route.length > 0 && (
                        <Polyline positions={route} color="blue" weight={4} opacity={0.7} />
                    )}
                </MapContainer>

                {distance && (
                    <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md z-[1000]">
                        <p className="text-sm font-medium text-gray-700">
                            Distance: <span className="text-blue-600">{distance.toFixed(1)} km</span>
                        </p>
                    </div>
                )}
            </div>
        )
    } catch (error) {
        console.error('Error rendering map:', error);
        setHasError(true);
        return (
            <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center" style={{ minHeight: '400px' }}>
                <p className="text-gray-500">Map temporarily unavailable</p>
            </div>
        )
    }
}
