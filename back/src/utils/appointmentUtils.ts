const MINUTES_TO_MILLISECONDS = 60000;

export const calculateEndDate = (
  date: Date,
  serviceDurationMinutes: number
): Date => {
  const startMinutesDate: number = date.getTime();
  return new Date(
    startMinutesDate + serviceDurationMinutes * MINUTES_TO_MILLISECONDS
  );
};
