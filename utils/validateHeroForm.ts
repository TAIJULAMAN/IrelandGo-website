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
      dropoffLocation.trim() !== "" &&
      date !== undefined &&
      time !== "" &&
      (tripType === "return" ? returnDate !== undefined && returnTime !== "" : true)
    );
  }
  if (activeTab === "hourly") {
    return (
      pickupLocation.trim() !== "" &&
      date !== undefined &&
      time !== ""
    );
  }
  if (activeTab === "day-trips") {
    return (
      pickupLocation.trim() !== "" &&
      dropoffLocation.trim() !== "" &&
      date !== undefined &&
      time !== ""
    );
  }
  return true;
};
