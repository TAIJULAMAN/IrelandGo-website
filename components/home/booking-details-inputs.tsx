import {
  Calendar as CalendarIcon,
  Users,
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

  adults: number;
  setAdults: (val: number) => void;
  children: number;
  setChildren: (val: number) => void;
  totalPassengers: number;

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
  adults,
  setAdults,
  children,
  setChildren,
  totalPassengers,
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
  const passengersTooltip = `${adults} Adult${adults !== 1 ? "s" : ""}${children > 0 ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}`;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <div className="flex">
                  <div className="border-r">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={{ before: today }}
                      initialFocus
                    />
                  </div>
                  <div className="h-[300px] w-[120px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                    <div className="flex flex-col gap-1">
                      {(() => {
                        const availableTimes = Array.from({ length: 96 })
                          .map((_, i) => {
                            const hour = Math.floor(i / 4);
                            const minute = (i % 4) * 15;
                            return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                          })
                          .filter(
                            (timeString) => !isTimeDisabled(date, timeString),
                          );

                        if (availableTimes.length === 0) {
                          return (
                            <div className="text-center p-4 text-sm text-gray-500">
                              No times available
                            </div>
                          );
                        }

                        return availableTimes.map((timeString) => (
                          <Button
                            key={timeString}
                            variant={time === timeString ? "default" : "ghost"}
                            className={cn(
                              "justify-center h-8 text-sm",
                              time === timeString
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "hover:bg-blue-50 text-gray-700",
                            )}
                            onClick={() => {
                              setTime(timeString);
                              setIsCalendarOpen(false);
                            }}
                          >
                            {timeString}
                          </Button>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
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
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <div className="flex">
                      <div className="border-r">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          disabled={date ? { before: date } : { before: today }}
                          initialFocus
                        />
                      </div>
                      <div className="h-[300px] w-[120px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                        <div className="flex flex-col gap-1">
                          {(() => {
                            const availableTimes = Array.from({ length: 96 })
                              .map((_, i) => {
                                const hour = Math.floor(i / 4);
                                const minute = (i % 4) * 15;
                                return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                              })
                              .filter(
                                (timeString) =>
                                  !isReturnTimeDisabled(timeString),
                              );

                            if (availableTimes.length === 0) {
                              return (
                                <div className="text-center p-4 text-sm text-gray-500">
                                  No times available
                                </div>
                              );
                            }

                            return availableTimes.map((timeString) => (
                              <Button
                                key={timeString}
                                variant={
                                  returnTime === timeString
                                    ? "default"
                                    : "ghost"
                                }
                                className={cn(
                                  "justify-center h-8 text-sm",
                                  returnTime === timeString
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "hover:bg-blue-50 text-gray-700",
                                )}
                                onClick={() => {
                                  setReturnTime(timeString);
                                  setIsReturnCalendarOpen(false);
                                }}
                              >
                                {timeString}
                              </Button>
                            ));
                          })()}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

        {/* Passengers */}
        <div>
          <label className="text-start text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
            Passengers
          </label>
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
                        <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm truncate text-left flex-1">
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
