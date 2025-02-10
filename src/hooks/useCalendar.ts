import {useEffect, useState} from 'react';
import {Calendar, Day} from '../types/calendar';

export const useCalendar = () => {
  const [currenDate, setCurrenDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentCalendar, setCurrentCalendar] = useState<Calendar>();
  const [prevCalendar, setPrevCalendar] = useState<Calendar>();
  const [nextCalendar, setNextCalendar] = useState<Calendar>();

  const goNextMonth = () => {
    setCurrenDate(
      new Date(currenDate.getFullYear(), currenDate.getMonth() + 1),
    );
  };

  const goPrevMonth = () => {
    setCurrenDate(
      new Date(currenDate.getFullYear(), currenDate.getMonth() - 1),
    );
  };

  const getCalendar = (date: Date) => {
    const calendar: Calendar = [];
    let week: Day[] = [];

    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDate = new Date(year, month + 1, 0).getDate(); // 마지막 날짜(=일 갯수)
    const prevLastDate = new Date(year, month, 0).getDate(); // 지난 달의 마지막 날짜
    const startingDay = new Date(year, month, 1).getDay(); // 시작 요일

    // 이전 달
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = prevLastDate - i;
      week.push({
        date: new Date(date.getFullYear(), date.getMonth() - 1, day),
        day: day,
        isInCurrentMonth: false,
      });
    }

    // 현재 달
    for (let day = 1; day <= lastDate; day++) {
      week.push({
        date: new Date(date.getFullYear(), date.getMonth(), day),
        day,
        isInCurrentMonth: true,
      });

      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    // 다음 달
    if (week.length > 0) {
      let nextDate = 1;
      while (week.length < 7) {
        const day = nextDate++;
        week.push({
          date: new Date(date.getFullYear(), date.getMonth() + 1, day),
          day,
          isInCurrentMonth: false,
        });
      }
      calendar.push(week);
    }

    return calendar;
  };

  useEffect(() => {
    setCurrentCalendar(getCalendar(currenDate));
    setPrevCalendar(
      getCalendar(
        new Date(currenDate.getFullYear(), currenDate.getMonth() - 1),
      ),
    );
    setNextCalendar(
      getCalendar(
        new Date(currenDate.getFullYear(), currenDate.getMonth() + 1),
      ),
    );
  }, [currenDate]);

  return {
    currentCalendar,
    prevCalendar,
    nextCalendar,
    currenDate,
    setCurrenDate,
    selectedDate,
    setSelectedDate,
    goNextMonth,
    goPrevMonth,
  };
};

export type CalendarHandler = ReturnType<typeof useCalendar>;
