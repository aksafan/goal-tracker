export const normalizeToDateOnly = async (date: Date): Promise<Date> => {
  return new Date(date.toISOString().split("T")[0]);
};
