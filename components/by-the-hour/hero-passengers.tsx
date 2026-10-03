import { Users, ChevronDown, Minus, Plus, Luggage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface HeroPassengersProps {
  totalPassengers: number;
  passengersTooltip: string;
  adults: number;
  setAdults: (val: number) => void;
  children: number;
  setChildren: (val: number) => void;
}

export function HeroPassengers({
  totalPassengers,
  passengersTooltip,
  adults,
  setAdults,
  children,
  setChildren,
}: HeroPassengersProps) {
  return (
    <div>
      <label className="text-start text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
        Passengers
      </label>
      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 transition-all bg-white/85 h-[52px] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700 overflow-hidden"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm truncate text-left flex-1 text-gray-700 font-medium">
                      {totalPassengers} Passenger
                      {totalPassengers !== 1 ? "s" : ""}
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
          <PopoverContent
            className="w-[calc(100vw-2rem)] sm:w-[300px] p-4 z-50"
            align="start"
          >
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
                  <span className="w-4 text-center font-medium">{adults}</span>
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
                  <p className="text-xs text-muted-foreground">Age 0-12</p>
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

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3 text-sm">
                  Each passenger is allowed
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Luggage className="w-4 h-4" />
                    <span className="flex-1">One checked bag</span>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      29 x 21 x 11 inch
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Luggage className="w-4 h-4" />
                    <span className="flex-1">One carry-on bag</span>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      22 x 14 x 9 inch
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
