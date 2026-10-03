import React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroPickupLocationProps {
  pickupLocation: string;
  setPickupLocation: (val: string) => void;
  setValue: (val: string) => void;
  showDropdown: boolean;
  setShowDropdown: (val: boolean) => void;
  selectedIndex: number;
  setSelectedIndex: (val: number) => void;
  status: string;
  data: any[]; // Or a more specific type if you want
  isOutOfRange: (desc: string) => boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSelect: (description: string) => void;
}

export function HeroPickupLocation({
  pickupLocation,
  setPickupLocation,
  setValue,
  showDropdown,
  setShowDropdown,
  selectedIndex,
  setSelectedIndex,
  status,
  data,
  isOutOfRange,
  inputRef,
  dropdownRef,
  handleKeyDown,
  handleSelect,
}: HeroPickupLocationProps) {
  return (
    <div>
      <label className="text-start text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
        Pickup Location
      </label>
      <div className={cn("relative", showDropdown ? "z-50" : "z-20")}>
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-blue-500 transition-all bg-white/85 h-[52px] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Select pickup location"
            className="w-full bg-transparent outline-none text-base font-medium text-gray-800 placeholder:text-gray-400"
            value={pickupLocation}
            onChange={(e) => {
              const val = e.target.value;
              setPickupLocation(val);
              setValue(val);
              setShowDropdown(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {(status === "ZERO_RESULTS" ||
          (status === "OK" &&
            data.filter((s) => !isOutOfRange(s.description)).length === 0)) &&
          pickupLocation.trim().length > 2 && (
            <div className="flex text-start justify-start">
              <p className="text-red-500 text-xs mt-1 px-1">
                location is not in our range
              </p>
            </div>
          )}

        {/* Autocomplete Dropdown */}
        {showDropdown &&
          status === "OK" &&
          data.filter((s) => !isOutOfRange(s.description)).length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-80 overflow-y-auto z-50"
            >
              {data
                .filter((s) => !isOutOfRange(s.description))
                .map((suggestion, index) => (
                  <button
                    key={suggestion.place_id}
                    onClick={() => handleSelect(suggestion.description)}
                    className={cn(
                      "w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0",
                      index === selectedIndex ? "bg-blue-50" : ""
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {suggestion.structured_formatting.main_text}
                        </div>
                        <div className="text-xs text-gray-500">
                          {suggestion.structured_formatting.secondary_text}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          )}
      </div>
    </div>
  );
}
