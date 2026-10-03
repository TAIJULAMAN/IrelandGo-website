import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DateTimePickerContent } from "@/components/common/date-time-picker-content";

interface HeroDateTimeProps {
  isCalendarOpen: boolean;
  setIsCalendarOpen: (open: boolean) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
  departureTooltip: string;
  isTimeDisabled: (date: Date, time: string) => boolean;
  today: Date;
}

export function HeroDateTime({
  isCalendarOpen,
  setIsCalendarOpen,
  date,
  setDate,
  time,
  setTime,
  departureTooltip,
  isTimeDisabled,
  today,
}: HeroDateTimeProps) {
  return (
    <div>
      <label className="text-start text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
        Date & Time
      </label>
      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 transition-all bg-white/85 h-[52px] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700 text-xs sm:text-sm overflow-hidden",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-1.5 sm:mr-2 h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="truncate flex-1 text-left">
                    {date ? (
                      <>
                        <span className="inline md:hidden lg:inline xl:hidden 2xl:inline">
                          {format(date, "PPP")}
                        </span>
                        <span className="hidden md:inline lg:hidden xl:inline 2xl:hidden">
                          {format(date, "PP")}
                        </span>{" "}
                        <span className="text-gray-400 mx-0.5 sm:mx-1">|</span>{" "}
                        {time}
                      </>
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{departureTooltip}</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent
            className="w-auto p-0 z-50"
            align="start"
            collisionPadding={16}
          >
            <DateTimePickerContent
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              onClose={() => setIsCalendarOpen(false)}
              isTimeDisabled={isTimeDisabled}
              minDate={today}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
