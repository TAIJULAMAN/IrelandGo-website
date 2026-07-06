export const isTimeDisabled = (selectedDate: Date | undefined, timeStr: string) => {
  if (!selectedDate) return false;
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  if (!isToday) return false;

  const [hours, minutes] = timeStr.split(":").map(Number);
  const selectedDateTime = new Date(selectedDate);
  selectedDateTime.setHours(hours, minutes, 0, 0);

  const minDateTime = new Date();
  minDateTime.setHours(minDateTime.getHours() + 3);

  return selectedDateTime.getTime() < minDateTime.getTime();
};

export const isReturnTimeDisabled = (
  returnTimeStr: string,
  returnDate: Date | undefined,
  date: Date | undefined,
  time: string
) => {
  if (!returnDate || !date) return false;
  const isSameDay = returnDate.toDateString() === date.toDateString();
  if (!isSameDay) return false;

  const [pValHour, pValMin] = time.split(":").map(Number);
  const [rValHour, rValMin] = returnTimeStr.split(":").map(Number);

  return (rValHour < pValHour) || (rValHour === pValHour && rValMin <= pValMin);
};
