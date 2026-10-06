import { useMemo } from "react";
import { useGetVehiclesQuery } from "@/Redux/features/vehicles/vehiclesApi";

export function useVehicleOptions(serviceType: string, dayTrip: any, totalPassengers: number, totalBags: number) {
  const { data: vehiclesData, isLoading } = useGetVehiclesQuery({});
  const baseVehicles = vehiclesData?.data?.data || [];
  
  const vehicles = useMemo(() => {
    return serviceType === "DAY_TRIP" && dayTrip?.vehicles?.length > 0
      ? dayTrip?.vehicles?.map((tsv: any) => ({
          ...tsv,
          price: tsv?.price,
          basePrice: tsv?.price,
        }))
      : baseVehicles;
  }, [serviceType, dayTrip, baseVehicles]);

  const getVehicleOptions = (vehicles: any[], passengers: number, bags: number) => {
    if (!vehicles || vehicles.length === 0) return [];

    let options: any[][] = [];

    // 1. Single vehicles that fit everyone
    options.push(
      ...vehicles
        .filter((v: any) => v.seatCount >= passengers && v.luggage >= bags)
        .map((v: any) => [v])
    );

    // 2. 2-vehicle combinations (generate if we have >= 4 passengers/bags, or if no single vehicle fits)
    if (passengers >= 4 || bags >= 4 || options.length === 0) {
      for (let i = 0; i < vehicles.length; i++) {
        for (let j = i; j < vehicles.length; j++) {
          if (
            vehicles[i].seatCount + vehicles[j].seatCount >= passengers &&
            vehicles[i].luggage + vehicles[j].luggage >= bags
          ) {
            options.push([vehicles[i], vehicles[j]]);
          }
        }
      }
    }

    // 3. 3-vehicle combinations
    if (passengers >= 7 || bags >= 7 || options.length === 0) {
      for (let i = 0; i < vehicles.length; i++) {
        for (let j = i; j < vehicles.length; j++) {
          for (let k = j; k < vehicles.length; k++) {
            if (
              vehicles[i].seatCount + vehicles[j].seatCount + vehicles[k].seatCount >= passengers &&
              vehicles[i].luggage + vehicles[j].luggage + vehicles[k].luggage >= bags
            ) {
              options.push([vehicles[i], vehicles[j], vehicles[k]]);
            }
          }
        }
      }
    }

    // 4. For very large groups, fleets of identical vehicles
    if (passengers > 8 || bags > 8 || options.length === 0) {
      vehicles.forEach((v: any) => {
        if (v.seatCount > 0 && v.luggage > 0) {
          const count = Math.max(
            Math.ceil(passengers / v.seatCount),
            Math.ceil(bags / v.luggage)
          );
          if (count > 1 && count <= 50) {
            const isAlreadyIncluded = options.some(opt => opt.length === count && opt.every(optV => optV.id === v.id));
            if (!isAlreadyIncluded) {
              options.push(Array(count).fill(v));
            }
          }
        }
      });
    }

    // Filter out bloated combinations where a subset of the vehicles could already satisfy the requirements
    const optimalOptions = options.filter(combo => {
      if (combo.length <= 1) return true;
      for (let i = 0; i < combo.length; i++) {
        let sumSeats = 0;
        let sumBags = 0;
        for (let j = 0; j < combo.length; j++) {
          if (i !== j) {
            sumSeats += combo[j].seatCount;
            sumBags += combo[j].luggage;
          }
        }
        if (sumSeats >= passengers && sumBags >= bags) {
          return false; // Found a smaller subset that satisfies the needs, so this combo is unnecessarily large
        }
      }
      return true;
    });

    const uniqueOptionsMap = new Map();
    
    // Helper to format names like "2x Van" instead of "Van + Van"
    const formatComboName = (combo: any[]) => {
      const counts: Record<string, number> = {};
      combo.forEach(v => {
        const name = v.name || "Vehicle";
        counts[name] = (counts[name] || 0) + 1;
      });
      return Object.entries(counts)
        .map(([name, count]) => (count > 1 ? `${count}x ${name}` : name))
        .join(" + ");
    };

    optimalOptions.forEach((combo) => {
      const id = combo
        .map((v: any) => v.id)
        .sort()
        .join("+");
      if (!uniqueOptionsMap.has(id)) {
        const basePriceSum = combo.reduce((sum: number, v: any) => sum + v.basePrice, 0);
        const pricePerKmSum = combo.reduce((sum: number, v: any) => sum + v.pricePerKm, 0);
        const seatCountSum = combo.reduce((sum: number, v: any) => sum + v.seatCount, 0);
        const luggageSum = combo.reduce((sum: number, v: any) => sum + v.luggage, 0);

        uniqueOptionsMap.set(id, {
          id,
          vehicles: combo,
          basePrice: basePriceSum,
          pricePerKm: pricePerKmSum,
          seatCount: seatCountSum,
          luggage: luggageSum,
          names: formatComboName(combo),
        });
      }
    });

    return Array.from(uniqueOptionsMap.values()).sort(
      (a: any, b: any) => a.basePrice - b.basePrice,
    );
  };

  const vehicleOptions = useMemo(() => {
    return getVehicleOptions(vehicles, totalPassengers, totalBags);
  }, [vehicles, totalPassengers, totalBags]);

  return { isLoading, vehicleOptions };
}
