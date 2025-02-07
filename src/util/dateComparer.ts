export const dateComparer = (dateA: Date, dateB: Date) => {
  const isSameYear = dateA.getFullYear() === dateB.getFullYear();
  const isSameMonth = dateA.getMonth() === dateB.getMonth();
  const isSameDate = dateA.getDate() === dateB.getDate();

  return {
    isSameMonth: isSameYear && isSameMonth,
    isSameDate: isSameYear && isSameMonth && isSameDate,
  };
};
