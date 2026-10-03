import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface HeroDurationProps {
  isDurationOpen: boolean;
  setIsDurationOpen: (open: boolean) => void;
  duration: string;
  setDuration: (duration: string) => void;
  durationTooltip: string;
}

export function HeroDuration({
  isDurationOpen,
  setIsDurationOpen,
  duration,
  setDuration,
  durationTooltip,
}: HeroDurationProps) {
  return (
    <div>
      <label className="text-start text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
        Duration
      </label>
      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 transition-all bg-white/85 h-[52px] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
        <Popover open={isDurationOpen} onOpenChange={setIsDurationOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700 overflow-hidden"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm capitalize font-medium truncate text-left flex-1 text-gray-700">
                      {duration.replace("-", " ")}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{durationTooltip}</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent
            className="w-[180px] p-1 z-50"
            align="start"
            collisionPadding={16}
          >
            <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
              <div className="p-1 flex flex-col gap-1">
                {Array.from({ length: 23 }, (_, i) => {
                  const hours = i + 2;
                  const option = `${hours}-hours`;
                  const isSelected = duration === option;
                  return (
                    <Button
                      key={option}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start font-normal h-9 px-3 transition-colors",
                        isSelected
                          ? "bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 hover:text-blue-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                      onClick={() => {
                        setDuration(option);
                        setIsDurationOpen(false);
                      }}
                    >
                      {hours} Hours
                    </Button>
                  );
                })}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
