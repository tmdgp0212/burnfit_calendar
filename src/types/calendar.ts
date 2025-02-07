export type Day = {
  date: Date;
  day: number;
  isInCurrentMonth: boolean;
};

export type Calendar = Day[][];

export type CalendarType = 'monthly' | 'weekly';
