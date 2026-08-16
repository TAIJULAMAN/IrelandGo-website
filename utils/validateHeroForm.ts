interface ValidateHeroFormArgs {
  date?: Date;
  time: string;
  isTimeDisabled: (d: Date, t: string) => boolean;
  activeTab: string;
  tripType: string;
  returnTime: string;
  isReturnTimeDisabled: (t: string) => boolean;
  pickupLocation: string;
  dropoffLocation: string;
  selectedPickup?: string;
  selectedDropoff?: string;
  returnDate?: Date;
}

export const validateHeroForm = ({
  date,
  time,
  isTimeDisabled,
  activeTab,
  tripType,
  returnTime,
  isReturnTimeDisabled,
  pickupLocation,
  dropoffLocation,
  selectedPickup,
  selectedDropoff,
  returnDate,
}: ValidateHeroFormArgs) => {
  const isToday = date && date.toDateString() === new Date().toDateString();
  if (isToday && time && isTimeDisabled(date, time)) {
    return false;
  }
  if (activeTab === "transfer" && tripType === "return" && returnTime && isReturnTimeDisabled(returnTime)) {
    return false;
  }

  if (activeTab === "transfer") {
    return (
      pickupLocation.trim() !== "" &&
      pickupLocation === selectedPickup &&
      dropoffLocation.trim() !== "" &&
      dropoffLocation === selectedDropoff &&
      date !== undefined &&
      time !== "" &&
      (tripType === "return" ? returnDate !== undefined && returnTime !== "" : true)
    );
  }
  if (activeTab === "hourly") {
    return (
      pickupLocation.trim() !== "" &&
      pickupLocation === selectedPickup &&
      date !== undefined &&
      time !== ""
    );
  }
  if (activeTab === "day-trips") {
    return (
      pickupLocation.trim() !== "" &&
      pickupLocation === selectedPickup &&
      dropoffLocation.trim() !== "" &&
      dropoffLocation === selectedDropoff &&
      date !== undefined &&
      time !== ""
    );
  }
  return true;
};
