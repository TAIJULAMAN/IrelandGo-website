import { Luggage, ChevronDown, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface HeroLuggageProps {
  extraBags: number;
  setExtraBags: (bags: number) => void;
  luggageTooltip: string;
}

export function HeroLuggage({
  extraBags,
  setExtraBags,
  luggageTooltip,
}: HeroLuggageProps) {
  return (
    <div>
      <label className="text-start text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
        Luggage
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
                    <Luggage className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm truncate text-left flex-1 text-gray-700 font-medium">
                      {extraBags} Extra Bag
                      {extraBags !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{luggageTooltip}</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-[300px] p-4 z-50" align="start">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-1">
                  Need more space?
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  You can add extra sets of bags at no extra cost, but you might need a bigger vehicle.
                </p>
              </div>
              <div className="pt-4">
                <h4 className="font-semibold text-base mb-1">
                  Extra sets of bags
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  One checked bag + one carry on
                </p>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                    onClick={() => setExtraBags(Math.max(0, extraBags - 1))}
                    disabled={extraBags <= 0}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-4 text-center font-medium">
                    {extraBags}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-white shadow-sm rounded-lg"
                    onClick={() => setExtraBags(extraBags + 1)}
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
  );
}
