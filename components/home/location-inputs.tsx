import { MapPin, Users, ChevronDown, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface LocationInputsProps {
  activeTab: string;
  pickupRef: React.RefObject<HTMLDivElement | null>;
  pickupLocation: string;
  setPickupLocation: (val: string) => void;
  setPValue: (val: string, shouldFetchData?: boolean) => void;
  showPickupDropdown: boolean;
  setShowPickupDropdown: (show: boolean) => void;
  pStatus: string;
  pData: google.maps.places.AutocompletePrediction[];
  isOutOfRange: (desc: string) => boolean;
  handlePickupSelect: (desc: string) => void;

  dropoffRef: React.RefObject<HTMLDivElement | null>;
  dropoffLocation: string;
  setDropoffLocation: (val: string) => void;
  setDValue: (val: string, shouldFetchData?: boolean) => void;
  showDropoffDropdown: boolean;
  setShowDropoffDropdown: (show: boolean) => void;
  dStatus: string;
  dData: google.maps.places.AutocompletePrediction[];
  handleDropoffSelect: (desc: string) => void;

  adults: number;
  setAdults: (val: number) => void;
  children: number;
  setChildren: (val: number) => void;
  totalPassengers: number;
}

export function LocationInputs({
  activeTab,
  pickupRef,
  pickupLocation,
  setPickupLocation,
  setPValue,
  showPickupDropdown,
  setShowPickupDropdown,
  pStatus,
  pData,
  isOutOfRange,
  handlePickupSelect,
  dropoffRef,
  dropoffLocation,
  setDropoffLocation,
  setDValue,
  showDropoffDropdown,
  setShowDropoffDropdown,
  dStatus,
  dData,
  handleDropoffSelect,
  adults,
  setAdults,
  children,
  setChildren,
  totalPassengers,
}: LocationInputsProps) {
  const showDropoff = activeTab === "transfer" || activeTab === "day-trips";
  const passengersTooltip = `${adults} Adult${adults !== 1 ? "s" : ""}${children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}`;

  return (
    <TooltipProvider>
      <div className={cn(
        "grid gap-4 mb-4 relative z-30",
        showDropoff
          ? "grid-cols-1 lg:grid-cols-3"
          : "grid-cols-1 lg:grid-cols-2"
      )}>
        {/* Pickup Location */}
        <div className={cn("relative", showPickupDropdown ? "z-50" : "z-20")} ref={pickupRef}>
          <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <input
              type="text"
              placeholder="Pickup Location"
              className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
              value={pickupLocation}
              onChange={(e) => {
                setPickupLocation(e.target.value);
                setPValue(e.target.value);
                setShowPickupDropdown(true);
              }}
              onFocus={() => setShowPickupDropdown(true)}
            />
          </div>
          {(pStatus === "ZERO_RESULTS" || (pStatus === "OK" && pData.filter(s => !isOutOfRange(s.description)).length === 0)) && pickupLocation.trim().length > 2 && (
            <p className="text-red-500 text-xs mt-1 px-1">location is not in our range</p>
          )}
          {showPickupDropdown && pStatus === "OK" && pData.filter(s => !isOutOfRange(s.description)).length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden max-h-72 overflow-y-auto">
              {pData.filter(s => !isOutOfRange(s.description)).map((suggestion) => (
                <button
                  key={suggestion.place_id}
                  onClick={() => handlePickupSelect(suggestion.description)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {suggestion.structured_formatting.main_text}
                      </div>
                      <div className="text-xs text-gray-500 text-balance">
                        {suggestion.structured_formatting.secondary_text}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dropoff Location */}
        {showDropoff && (
          <div className={cn("relative", showDropoffDropdown ? "z-50" : "z-10")} ref={dropoffRef}>
            <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
              <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Dropoff Location"
                className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                value={dropoffLocation}
                onChange={(e) => {
                  setDropoffLocation(e.target.value);
                  setDValue(e.target.value);
                  setShowDropoffDropdown(true);
                }}
                onFocus={() => setShowDropoffDropdown(true)}
              />
            </div>
            {(dStatus === "ZERO_RESULTS" || (dStatus === "OK" && dData.filter(s => !isOutOfRange(s.description)).length === 0)) && dropoffLocation.trim().length > 2 && (
              <p className="text-red-500 text-xs mt-1 px-1">location is not in our range</p>
            )}
            {showDropoffDropdown && dStatus === "OK" && dData.filter(s => !isOutOfRange(s.description)).length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden max-h-72 overflow-y-auto">
                {dData.filter(s => !isOutOfRange(s.description)).map((suggestion) => (
                  <button
                    key={suggestion.place_id}
                    onClick={() => handleDropoffSelect(suggestion.description)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {suggestion.structured_formatting.main_text}
                        </div>
                        <div className="text-xs text-gray-500 text-balance">
                          {suggestion.structured_formatting.secondary_text}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Passengers Select */}
        <div>
          <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
            <Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm truncate text-left flex-1 text-gray-700">
                          {totalPassengers} Passenger{totalPassengers !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{passengersTooltip}</p>
                </TooltipContent>
              </Tooltip>
              <PopoverContent className="w-[300px] p-4 z-50" align="start">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-base">Adults</h4>
                      <p className="text-xs text-muted-foreground">Age 12+</p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-4 text-center font-medium">
                        {adults}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                        onClick={() => setAdults(adults + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-base">Children</h4>
                      <p className="text-xs text-muted-foreground">Age 2-12</p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        disabled={children <= 0}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-4 text-center font-medium">
                        {children}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                        onClick={() => setChildren(children + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
