export const dateComparer = (A: Date, B: Date) => {
  const yearA = A.getFullYear();
  const monthA = A.getMonth();
  const dateA = A.getDate();

  const yearB = B.getFullYear();
  const monthB = B.getMonth();
  const dateB = B.getDate();

  // 각 날짜가 속한 주의 일요일
  const sundayA = new Date(yearA, monthA, dateA - A.getDay(), 0, 0, 0, 0);
  const sundayB = new Date(yearB, monthB, dateB - B.getDay(), 0, 0, 0, 0);

  const isSameYear = yearA === yearB;
  const isSameMonth = monthA === monthB;
  const isSameDate = dateA === dateB;
  const isSameWeek = sundayA.getTime() === sundayB.getTime();

  return {
    isSameMonth: isSameYear && isSameMonth,
    isSameDate: isSameYear && isSameMonth && isSameDate,
    isSameWeek,
  };
};
