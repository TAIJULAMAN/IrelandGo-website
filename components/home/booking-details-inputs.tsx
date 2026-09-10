import {
  Calendar as CalendarIcon,
  Luggage,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DateTimePickerContent } from "@/components/common/date-time-picker-content";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface BookingDetailsInputsProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (open: boolean) => void;
  today: Date;
  isTimeDisabled: (date: Date | undefined, time: string) => boolean;

  extraBags: number;
  setExtraBags: (val: number) => void;

  // Optional props for Return Date & Time
  tripType?: string;
  activeTab?: string;
  returnDate?: Date | undefined;
  setReturnDate?: (date: Date | undefined) => void;
  returnTime?: string;
  setReturnTime?: (time: string) => void;
  isReturnCalendarOpen?: boolean;
  setIsReturnCalendarOpen?: (open: boolean) => void;
  isReturnTimeDisabled?: (time: string) => boolean;
}

export function BookingDetailsInputs({
  date,
  setDate,
  time,
  setTime,
  isCalendarOpen,
  setIsCalendarOpen,
  today,
  isTimeDisabled,
  extraBags,
  setExtraBags,
  tripType,
  activeTab,
  returnDate,
  setReturnDate,
  returnTime,
  setReturnTime,
  isReturnCalendarOpen,
  setIsReturnCalendarOpen,
  isReturnTimeDisabled,
}: BookingDetailsInputsProps) {
  const isReturnVisible = activeTab === "transfer" && tripType === "return";
  const departureTooltip = date
    ? `${format(date, "PPP")} | ${time}`
    : "Select pickup date & time";
  const returnTooltip = returnDate
    ? `${format(returnDate, "PPP")} | ${returnTime}`
    : "Select return date & time";
  const luggageTooltip = `${extraBags} Extra Set${extraBags !== 1 ? "s" : ""} of Bags (One checked + one carry-on per set)`;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 relative z-10">
        {/* Date & Time */}
        <div>
          <label className="text-start text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
            Date & Time
          </label>
          <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className={cn(
                        "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700 text-xs sm:text-sm overflow-hidden",
                        !date && "text-muted-foreground",
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
                            <span className="text-gray-400 mx-0.5 sm:mx-1">
                              |
                            </span>{" "}
                            {time}
                          </>
                        ) : (
                          "Pick a date"
                        )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{departureTooltip}</p>
                </TooltipContent>
              </Tooltip>
              <PopoverContent className="w-auto p-0 z-50" align="start" collisionPadding={16}>
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

        {isReturnVisible &&
          setReturnDate &&
          setReturnTime &&
          setIsReturnCalendarOpen &&
          isReturnTimeDisabled && (
            <div>
              <label className="text-start text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
                Return Date & Time
              </label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                <Popover
                  open={isReturnCalendarOpen}
                  onOpenChange={setIsReturnCalendarOpen}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700 text-xs sm:text-sm overflow-hidden",
                            !returnDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-1.5 sm:mr-2 h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="truncate flex-1 text-left">
                            {returnDate ? (
                              <>
                                <span className="inline md:hidden lg:inline xl:hidden 2xl:inline">
                                  {format(returnDate, "PPP")}
                                </span>
                                <span className="hidden md:inline lg:hidden xl:inline 2xl:hidden">
                                  {format(returnDate, "PP")}
                                </span>{" "}
                                <span className="text-gray-400 mx-0.5 sm:mx-1">
                                  |
                                </span>{" "}
                                {returnTime}
                              </>
                            ) : (
                              "Pick a return date"
                            )}
                          </span>
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{returnTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                  <PopoverContent className="w-auto p-0 z-50" align="start" collisionPadding={16}>
                    <DateTimePickerContent
                      date={returnDate}
                      setDate={setReturnDate}
                      time={returnTime}
                      setTime={setReturnTime}
                      onClose={() => setIsReturnCalendarOpen(false)}
                      isTimeDisabled={isReturnTimeDisabled ? (_d, t) => isReturnTimeDisabled(t) : undefined}
                      minDate={date || today}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

        {/* Extra Bags */}
        <div>
          <label className="text-start text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
            Extra Bags
          </label>
          <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px] focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
            <Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700 overflow-hidden animate-none"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Luggage className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm truncate text-left flex-1 text-gray-700">
                          {extraBags} Extra Bag{extraBags !== 1 ? "s" : ""}
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
              <PopoverContent className="w-[300px] p-4 z-50 animate-none" align="start">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Need more space?</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      You can add extra sets of bags at no extra cost, but you might need a bigger vehicle.
                    </p>
                  </div>
                  <div className="pt-4">
                    <h4 className="font-semibold text-base mb-1">Extra sets of bags</h4>
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
                      <span className="w-4 text-center font-medium">{extraBags}</span>
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
      </div>
    </TooltipProvider>
  );
}
