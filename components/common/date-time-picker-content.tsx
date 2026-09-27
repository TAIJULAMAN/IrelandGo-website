"use client";

import React, { useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DateTimePickerContentProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time?: string;
  setTime: (time: string) => void;
  onClose: () => void;
  isTimeDisabled?: (date: Date | undefined, time: string) => boolean;
  minDate?: Date;
}

export function DateTimePickerContent({
  date,
  setDate,
  time = "09:00",
  setTime,
  onClose,
  isTimeDisabled,
  minDate,
}: DateTimePickerContentProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const effectiveMinDate = minDate || today;

  const selectedTimeRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll to selected time on mount/open
  useEffect(() => {
    if (selectedTimeRef.current) {
      selectedTimeRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && isTimeDisabled && isTimeDisabled(selectedDate, time)) {
      // Find first available time slot if current time is disabled for selected date
      for (let i = 0; i < 96; i++) {
        const hour = Math.floor(i / 4);
        const minute = (i % 4) * 15;
        const candidate = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        if (!isTimeDisabled(selectedDate, candidate)) {
          setTime(candidate);
          break;
        }
      }
    }
  };

  const availableTimes = Array.from({ length: 96 })
    .map((_, i) => {
      const hour = Math.floor(i / 4);
      const minute = (i % 4) * 15;
      return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    })
    .filter((timeString) => {
      if (!isTimeDisabled) return true;
      return !isTimeDisabled(date, timeString);
    });

  return (
    <div className="flex bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Left Column: Calendar */}
      <div className="border-r border-gray-100 shrink-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          disabled={{ before: effectiveMinDate }}
          initialFocus
        />
      </div>

      {/* Right Column: Time Selection */}
      <div className="flex flex-col w-[115px] sm:w-[125px] h-[300px] shrink-0">
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
          <div className="flex flex-col gap-1">
            {availableTimes.length === 0 ? (
              <div className="text-center p-4 text-xs text-gray-400">
                No times available
              </div>
            ) : (
              availableTimes.map((timeString) => {
                const isSelected = time === timeString;
                return (
                  <Button
                    key={timeString}
                    ref={isSelected ? selectedTimeRef : undefined}
                    variant={isSelected ? "default" : "ghost"}
                    className={cn(
                      "justify-center h-8 text-xs sm:text-sm font-medium transition-colors",
                      isSelected
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                        : "hover:bg-blue-50 text-gray-700"
                    )}
                    onClick={() => {
                      setTime(timeString);
                      onClose();
                    }}
                  >
                    {timeString}
                  </Button>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Quick-close / Done Button */}
        <div className="p-1.5 border-t border-gray-100 bg-gray-50/70 text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-full h-7 text-xs font-semibold text-blue-600 hover:bg-blue-100 hover:text-blue-700"
          >
            Done ✓
          </Button>
        </div>
      </div>
    </div>
  );
}
