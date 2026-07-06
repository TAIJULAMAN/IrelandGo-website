import { Calendar as CalendarIcon, Users, Luggage, ChevronDown, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

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
  
  extraBags: number;
  setExtraBags: (val: number) => void;
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
  extraBags,
  setExtraBags,
}: BookingDetailsInputsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {/* Date & Time */}
      <div>
        <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
          Date & Time
        </label>
        <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className={cn(
                  "w-full justify-start text-left font-normal h-auto p-0 hover:bg-transparent text-gray-700",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-blue-600 flex-shrink-0" />
                {date ? (
                  <span>
                    {format(date, "PPP")}{" "}
                    <span className="text-gray-400 mx-1">|</span> {time}
                  </span>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
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
                    {Array.from({ length: 96 }).map((_, i) => {
                      const hour = Math.floor(i / 4);
                      const minute = (i % 4) * 15;
                      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                      const isDisabled = isTimeDisabled(date, timeString);
                      return (
                        <Button
                          key={timeString}
                          disabled={isDisabled}
                          variant={time === timeString ? "default" : "ghost"}
                          className={cn(
                            "justify-center h-8 text-sm",
                            time === timeString
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "hover:bg-blue-50",
                            isDisabled && "opacity-30 cursor-not-allowed"
                          )}
                          onClick={() => {
                            if (!isDisabled) {
                              setTime(timeString);
                              setIsCalendarOpen(false);
                            }
                          }}
                        >
                          {timeString}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Passengers */}
      <div>
        <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
          Passengers
        </label>
        <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">
                    {totalPassengers} Passenger
                    {totalPassengers !== 1 ? "s" : ""}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4" align="start">
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
                      className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-4 text-center font-medium">{adults}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
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
                      className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-4 text-center font-medium">{children}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
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

      {/* Luggage */}
      <div>
        <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
          Luggage
        </label>
        <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition bg-white h-[50px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-auto p-0 hover:bg-transparent font-normal text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">
                    {extraBags} Extra Bag{extraBags !== 1 ? "s" : ""}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4" align="start">
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
                      className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
                      onClick={() => setExtraBags(Math.max(0, extraBags - 1))}
                      disabled={extraBags <= 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-4 text-center font-medium">{extraBags}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white shadow-sm rounded-md"
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
  );
}
