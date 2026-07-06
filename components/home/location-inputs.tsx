import { MapPin } from "lucide-react";

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
}: LocationInputsProps) {
  return (
    <div className={`grid ${activeTab === "transfer" ? "md:grid-cols-2" : "grid-cols-1"} gap-4 mb-5`}>
      <div className="relative" ref={pickupRef}>
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
          <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
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

      {activeTab === "transfer" && (
        <div className="relative" ref={dropoffRef}>
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
            <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
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
    </div>
  );
}
