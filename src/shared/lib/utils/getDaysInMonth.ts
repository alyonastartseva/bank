export const getDaysInMonth = (
  monthName: string,
  year: string,
  months: string[]
): number => {
  const monthIndex = months.indexOf(monthName);
  if (monthIndex === -1 || !year) return 31;

  return new Date(Number(year), monthIndex + 1, 0).getDate();
};