import { Button } from "@/components/ui/button";
import { Users, Luggage, ChevronDown, Plus, Minus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PassengerPopoverProps {
  totalPassengers: number;
  totalBags: number;
  localAdults: number;
  localChildren: number;
  localExtraBags: number;
  handleUpdate: (type: "adults" | "children" | "extraBags", value: number) => void;
}

export function PassengerPopover({
  totalPassengers,
  totalBags,
  localAdults,
  localChildren,
  localExtraBags,
  handleUpdate,
}: PassengerPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-auto py-1.5 px-3 rounded-full flex items-center gap-2 shadow-sm bg-white hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-gray-800 font-semibold text-sm border-gray-200 transition-all"
        >
          <Users className="w-4 h-4" />
          {totalPassengers}
          <Luggage className="w-4 h-4 ml-1" />
          {totalBags}
          <ChevronDown className="w-4 h-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[calc(100vw-32px)] sm:w-[400px] md:w-[650px] p-6 shadow-xl rounded-2xl max-h-[90vh] overflow-y-auto border-gray-100"
        align="end"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column: Passengers */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-base text-gray-900">Adults</h4>
                <p className="text-xs text-muted-foreground font-medium">Age 12+</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white shadow-sm rounded-full bg-gray-100"
                  onClick={() => handleUpdate("adults", Math.max(1, localAdults - 1))}
                  disabled={localAdults <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <input
                  type="number"
                  min="1"
                  value={localAdults}
                  onChange={(e) => {
                    let val = e.target.value === "" ? 1 : parseInt(e.target.value);
                    if (isNaN(val)) val = 1;
                    handleUpdate("adults", Math.max(1, val));
                  }}
                  className="w-8 text-center font-bold text-gray-900 bg-transparent border-none focus:outline-none p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white shadow-sm rounded-full bg-gray-100"
                  onClick={() => handleUpdate("adults", localAdults + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-base text-gray-900">Children</h4>
                <p className="text-xs text-muted-foreground font-medium">Age 0-12</p>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white shadow-sm rounded-full bg-gray-100"
                  onClick={() => handleUpdate("children", Math.max(0, localChildren - 1))}
                  disabled={localChildren <= 0}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <input
                  type="number"
                  min="0"
                  value={localChildren}
                  onChange={(e) => {
                    // Allow empty string temporarily, handle NaN gracefully
                    let val = e.target.value === "" ? 0 : parseInt(e.target.value);
                    if (isNaN(val)) val = 0;
                    handleUpdate("children", Math.max(0, val));
                  }}
                  className="w-8 text-center font-bold text-gray-900 bg-transparent border-none focus:outline-none p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white shadow-sm rounded-full bg-gray-100"
                  onClick={() => handleUpdate("children", localChildren + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-bold mb-3 text-base text-gray-900">Each passenger is allowed</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-700 pb-2 border-b border-gray-100">
                  <Luggage className="w-4 h-4 text-gray-900" />
                  <span className="flex-1 font-medium text-gray-800">One checked bag</span>
                  <span className="text-xs text-blue-600 bg-transparent px-3 py-1 rounded-full border border-blue-600 font-medium whitespace-nowrap">
                    29 x 21 x 11 inch
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Luggage className="w-4 h-4 text-gray-900" />
                  <span className="flex-1 font-medium text-gray-800">One carry-on bag</span>
                  <span className="text-xs text-blue-600 bg-transparent px-3 py-1 rounded-full border border-blue-600 font-medium whitespace-nowrap">
                    22 x 14 x 9 inch
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-[1px] bg-gray-300"></div>

          {/* Right Column: Extra Bags */}
          <div className="flex-1 space-y-6 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-xl mb-3 text-gray-900">Need more space?</h4>
              <p className="text-sm text-gray-800 leading-relaxed font-medium">
                Extra bags count as a passenger space, but you do not pay any extra seat fee.
              </p>
            </div>
            <div className="pt-2">
              <h4 className="font-bold text-lg mb-1 text-gray-900">Extra sets of bags</h4>
              <p className="text-sm text-gray-500 mb-4 font-medium">One checked bag + one carry on</p>
              <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1 w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-white shadow-sm rounded-full bg-gray-100"
                  onClick={() => handleUpdate("extraBags", Math.max(0, localExtraBags - 1))}
                  disabled={localExtraBags <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="number"
                  min="0"
                  value={localExtraBags}
                  onChange={(e) => {
                    let val = e.target.value === "" ? 0 : parseInt(e.target.value);
                    if (isNaN(val)) val = 0;
                    handleUpdate("extraBags", Math.max(0, val));
                  }}
                  className="w-8 text-center font-bold text-lg text-gray-900 bg-transparent border-none focus:outline-none p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 hover:bg-white shadow-sm rounded-full bg-gray-100"
                  onClick={() => handleUpdate("extraBags", localExtraBags + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
