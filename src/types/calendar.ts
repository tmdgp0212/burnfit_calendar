export type Day = {
  date: Date;
  day: number;
  isInCurrentMonth: boolean;
};

export type Calendar = Day[][];
