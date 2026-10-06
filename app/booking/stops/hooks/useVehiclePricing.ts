import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";

export function useVehiclePricing(vehicleId: string | undefined | null, distanceKm: number, sessionCarPrice: any) {
  const { data: vehiclesData } = useGetVehiclesQuery({});
  const vehicles = vehiclesData?.data?.data || [];

  let transportPrice = 0;
  let vehicleName = "Vehicle";
  let pricePerKmSumForStops = 0;

  if (vehicleId && vehicles.length > 0) {
    const ids = vehicleId.split("+");
    const selectedVehicles = ids.map((id: string) => vehicles.find((v: any) => v.id === id)).filter(Boolean);

    if (selectedVehicles.length > 0) {
      vehicleName = selectedVehicles.map((v: any) => v.name).join(" + ");

      const basePriceSum = selectedVehicles.reduce((sum: number, v: any) => sum + (v.basePrice || 0), 0);

      const km = distanceKm || 0;
      pricePerKmSumForStops = selectedVehicles.reduce((sum: number, vehicle: any) => {
        const name = (vehicle.name || "").toLowerCase();
        let isLSedan = name.includes("luxury sedan") || name.includes("l sedan") || name.includes("lsedan");
        let isMPV = !isLSedan && (name.includes("mpv") || name.includes("mvp") || name.includes("minivan"));
        let isVan = !isLSedan && !isMPV && name.includes("van");

        type Band = [number, number, number];
        const sedanBands: Band[] = [[25, 1.8, 50], [50, 1.8, 40], [100, 1.8, 30], [150, 1.8, 15], [Infinity, 1.9, 0]];
        const mpvBands: Band[] = [[25, 2.0, 65], [50, 2.0, 55], [100, 2.0, 45], [150, 2.0, 30], [Infinity, 2.1, 0]];
        const vanBands: Band[] = [[25, 2.2, 80], [50, 2.2, 70], [100, 2.2, 60], [150, 2.2, 45], [Infinity, 2.3, 0]];
        const lSedanBands: Band[] = [[25, 2.1, 70], [50, 2.1, 60], [100, 2.1, 50], [150, 2.1, 35], [Infinity, 2.15, 0]];

        const bands = isLSedan ? lSedanBands : isMPV ? mpvBands : isVan ? vanBands : sedanBands;
        const [, rate,] = bands.find(([max]) => km <= max) || bands[bands.length - 1];

        return sum + rate;
      }, 0);

      if (sessionCarPrice) {
        transportPrice = typeof sessionCarPrice === 'string' ? parseFloat(sessionCarPrice) : sessionCarPrice;
      } else {
        transportPrice = Math.round(basePriceSum + (pricePerKmSumForStops * distanceKm));
      }
    }
  }

  return { transportPrice, vehicleName, pricePerKmSumForStops };
}
