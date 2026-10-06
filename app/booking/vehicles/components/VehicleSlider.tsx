import { Button } from "@/components/ui/button";
import { Users, Luggage, Plus } from "lucide-react";
import { useState } from "react";

interface VehicleSliderProps {
  isLoading: boolean;
  vehicleOptions: any[];
  localExtraBags: number;
  serviceType: string;
  durationParam: string;
  distanceKm: number | null;
  selectedVehicle: string | null;
  setSelectedVehicle: (id: string | null) => void;
  setSelectedVehicleName: (name: string) => void;
  setSelectedPrice: (price: number) => void;
  sliderRef: React.MutableRefObject<HTMLDivElement | null>;
}

export function VehicleSlider({
  isLoading,
  vehicleOptions,
  localExtraBags,
  serviceType,
  durationParam,
  distanceKm,
  selectedVehicle,
  setSelectedVehicle,
  setSelectedVehicleName,
  setSelectedPrice,
  sliderRef,
}: VehicleSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    if (Math.abs(x - startX) > 5) {
      setHasDragged(true);
    }
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={sliderRef}
      className={`vehicle-scroll flex gap-5 overflow-x-auto pt-4 pb-8 -mt-4 justify-start items-start px-4 cursor-grab active:cursor-grabbing ${
        isDragging ? "scroll-auto snap-none select-none" : "scroll-smooth snap-x snap-mandatory"
      }`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {isLoading ? (
        <div className="w-full text-center py-10 text-gray-500">Loading vehicles...</div>
      ) : (
        (() => {
          if (vehicleOptions.length === 0) {
            return (
              <div className="w-full text-center py-10 text-gray-500">
                No vehicles available for this group size. Please adjust your passenger or bag count.
              </div>
            );
          }

          return vehicleOptions.map((option: any) => {

            let pricePerCar = 0;

            if (serviceType === "DAY_TRIP") {
              pricePerCar = option.vehicles.reduce(
                (sum: number, vehicle: any) => sum + (vehicle.price ?? vehicle.basePrice ?? 0),
                0
              );
            } else if (serviceType === "BY_THE_HOUR") {
              let hours = 0;
              if (durationParam) {
                const matches = durationParam.match(/\d+/g);
                if (matches) hours = Math.max(...matches.map(Number));
              }
              if (hours < 2) hours = 2;

              pricePerCar = option.vehicles.reduce((sum: number, vehicle: any) => {
                const name = vehicle.name.toLowerCase();
                let basePrice = 0,
                  hr3Add = 0,
                  hr4Add = 0,
                  hr5Add = 0,
                  hr6Add = 0,
                  hr7PlusAdd = 0;

                if (name.includes("luxury sedan") || name.includes("l sedan")) {
                  basePrice = 290;
                  hr3Add = 20;
                  hr4Add = 30;
                  hr5Add = 60;
                  hr6Add = 60;
                  hr7PlusAdd = 60;
                } else if (name.includes("sedan")) {
                  basePrice = 275;
                  hr3Add = 15;
                  hr4Add = 25;
                  hr5Add = 55;
                  hr6Add = 55;
                  hr7PlusAdd = 55;
                } else if (name.includes("mpv") || name.includes("mvp")) {
                  basePrice = 285;
                  hr3Add = 20;
                  hr4Add = 30;
                  hr5Add = 60;
                  hr6Add = 60;
                  hr7PlusAdd = 60;
                } else if (name.includes("van")) {
                  basePrice = 295;
                  hr3Add = 25;
                  hr4Add = 35;
                  hr5Add = 65;
                  hr6Add = 65;
                  hr7PlusAdd = 65;
                } else {
                  basePrice = 285;
                  hr3Add = 20;
                  hr4Add = 30;
                  hr5Add = 60;
                  hr6Add = 60;
                  hr7PlusAdd = 60;
                }

                let vehiclePrice = basePrice;
                if (hours >= 3) vehiclePrice += hr3Add;
                if (hours >= 4) vehiclePrice += hr4Add;
                if (hours >= 5) vehiclePrice += hr5Add;
                if (hours >= 6) vehiclePrice += hr6Add;
                if (hours >= 7) vehiclePrice += hr7PlusAdd * (hours - 6);

                return sum + vehiclePrice;
              }, 0);
            } else {
              pricePerCar = option.vehicles.reduce((sum: number, vehicle: any) => {
                const name = (vehicle.name || "").toLowerCase();
                const km = distanceKm || 0;
                let isLSedan = name.includes("luxury sedan") || name.includes("l sedan") || name.includes("lsedan");
                let isMPV = !isLSedan && (name.includes("mpv") || name.includes("mvp") || name.includes("minivan"));
                let isVan = !isLSedan && !isMPV && name.includes("van");
                type Band = [number, number, number];
                const sedanBands: Band[] = [[25, 1.8, 50], [50, 1.8, 40], [100, 1.8, 30], [150, 1.8, 15], [Infinity, 1.9, 0]];
                const mpvBands: Band[] = [[25, 2.0, 65], [50, 2.0, 55], [100, 2.0, 45], [150, 2.0, 30], [Infinity, 2.1, 0]];
                const vanBands: Band[] = [[25, 2.2, 80], [50, 2.2, 70], [100, 2.2, 60], [150, 2.2, 45], [Infinity, 2.3, 0]];
                const lSedanBands: Band[] = [[25, 2.1, 250], [50, 2.1, 200], [100, 2.1, 250], [150, 2.1, 200], [Infinity, 3.1, 0]];

                const bands = isLSedan ? lSedanBands : isMPV ? mpvBands : isVan ? vanBands : sedanBands;
                const [, rate, base] = bands.find(([max]) => km <= max) || bands[bands.length - 1];

                return sum + base + rate * km;
              }, 0);
            }

            const totalPrice = Math.round(pricePerCar);

            return (
              <div
                key={option.id}
                className="snap-start shrink-0 w-[260px] sm:w-[280px] lg:w-[300px]"
                onClickCapture={(e) => {
                  if (hasDragged) {
                    e.stopPropagation();
                  }
                }}
              >
                <div
                  className={`group bg-white backdrop-blur-md rounded-2xl shadow-sm p-5 flex flex-col hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full border-2 relative ${
                    selectedVehicle === option.id
                      ? "border-blue-600 ring-2 ring-blue-100 shadow-md bg-white"
                      : "border-transparent hover:border-blue-300"
                  }`}
                  onClick={(e) => {
                    if (hasDragged) return;
                    setSelectedVehicle(option.id);
                    setSelectedVehicleName(option.names);
                    setSelectedPrice(totalPrice);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl z-0" />
                  {(() => {
                    const groupedVehicles: { vehicle: any; count: number }[] = [];
                    option.vehicles.forEach((v: any) => {
                      const existing = groupedVehicles.find((g) => g.vehicle.id === v.id);
                      if (existing) {
                        existing.count++;
                      } else {
                        groupedVehicles.push({ vehicle: v, count: 1 });
                      }
                    });

                    if (groupedVehicles.length === 1) {
                      const group = groupedVehicles[0];
                      return (
                        <div className="mb-5 h-32 sm:h-36 flex items-center justify-center bg-gray-50 rounded-xl p-3 relative overflow-hidden group-hover:shadow-inner transition-all z-10">
                          {group.count > 1 && (
                            <span className="absolute top-3 left-3 text-sm font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md z-20">
                              {group.count}x
                            </span>
                          )}
                          <img
                            src={group.vehicle.image[0]}
                            alt={group.vehicle.name}
                            className="max-h-full w-auto object-contain drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      );
                    }

                    return (
                      <div className="mb-5 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-3 relative h-auto min-h-[8rem] z-10">
                        {groupedVehicles.map((group, index) => (
                          <div key={index} className="flex flex-col items-center">
                            {index > 0 && (
                              <div className="text-blue-600 my-1 font-bold bg-blue-100 rounded-full p-1">
                                <Plus className="h-3 w-3" />
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              {group.count > 1 && (
                                <span className="text-sm font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-md">
                                  {group.count}x
                                </span>
                              )}
                              <img
                                src={group.vehicle.image[0]}
                                alt={group.vehicle.name}
                                className="h-10 sm:h-12 w-auto object-contain drop-shadow-md"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 pr-2">
                      <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                        {option.names}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {option.vehicles.length > 1 ? "Combined trip" : "Per trip"}
                      </p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                        {distanceKm || serviceType === "BY_THE_HOUR" || serviceType === "DAY_TRIP"
                          ? `€${totalPrice}`
                          : "TBD"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Up to {option.seatCount}</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Luggage className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Up to {option.luggage}</span>
                    </span>
                  </div>

                  <Button
                    variant={selectedVehicle === option.id ? "default" : "secondary"}
                    className="mt-auto w-full relative z-10"
                  >
                    {selectedVehicle === option.id ? "Selected" : "Select Option"}
                  </Button>
                </div>
              </div>
            );
          });
        })()
      )}
    </div>
  );
}
