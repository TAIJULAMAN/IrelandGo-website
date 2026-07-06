import { Timer, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TripTypeSelectorProps {
  activeTab: string;
  tripType: string;
  setTripType: (type: string) => void;
  duration: number;
  setDuration: (val: number) => void;
}

export function TripTypeSelector({
  activeTab,
  tripType,
  setTripType,
  duration,
  setDuration,
}: TripTypeSelectorProps) {
  if (activeTab === "transfer") {
    return (
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setTripType("one-way")}
          className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${tripType === "one-way"
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          One Way
        </button>
        <button
          onClick={() => setTripType("return")}
          className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${tripType === "return"
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Return
        </button>
      </div>
    );
  }

  if (activeTab === "hourly") {
    return (
      <div className="mb-5">
        <label className="text-start text-sm font-medium text-gray-700 mb-2 block">
          Duration (hours)
        </label>
        <div className="flex items-center gap-3 p-1 bg-gray-50 rounded-lg w-full md:w-fit">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-white shadow-sm rounded-md"
            onClick={() => setDuration(Math.max(2, duration - 1))}
            disabled={duration <= 2}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4">
            <Timer className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-lg min-w-[20px] text-center">
              {duration}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-white shadow-sm rounded-md"
            onClick={() => setDuration(Math.min(24, duration + 1))}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <p className="text-sm text-gray-500 italic">
        Select a pickup and search for available day trips.
      </p>
    </div>
  );
}
