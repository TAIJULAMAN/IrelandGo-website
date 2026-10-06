import React from 'react';

export function BookingProgress() {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold shrink-0">
            1
          </div>
          <span className="hidden sm:inline">Trip Details</span>
        </div>
        <div className="flex-1 h-0.5 bg-blue-600 mx-1 sm:mx-2" />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold shrink-0">
            2
          </div>
          <span className="hidden sm:inline">Choose Vehicle</span>
        </div>
        <div className="flex-1 h-0.5 bg-blue-600 mx-1 sm:mx-2" />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold shrink-0">
            3
          </div>
          <span className="hidden sm:inline">Add Stops</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-200 mx-1 sm:mx-2" />
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold shrink-0">
            4
          </div>
          <span className="hidden sm:inline">Details</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-200 mx-1 sm:mx-2" />
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold shrink-0">
            5
          </div>
          <span className="hidden sm:inline">Payment</span>
        </div>
      </div>
    </div>
  );
}
