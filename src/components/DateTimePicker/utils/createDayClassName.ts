export const createDayClassName = (holidays: { date: string }[]) => (d: Date) => {
  const isSpecial =
    d.getDay() === 0 ||
    holidays.some((h) => {
      const hd = new Date(h.date);
      return hd.getFullYear() === d.getFullYear() && hd.getMonth() === d.getMonth() && hd.getDate() === d.getDate();
    });

  return isSpecial ? 'custom-highlight' : '';
};
