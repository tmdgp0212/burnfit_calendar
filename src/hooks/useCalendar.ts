import {useEffect, useState} from 'react';
import {Calendar, Day} from '../types/calendar';
import {getMonthlyCalendar, getWeeklyCalendar} from '../util/calendar';

export const useCalendar = () => {
  const [currenDate, setCurrenDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentCalendar, setCurrentCalendar] = useState<Calendar>();
  const [prevCalendar, setPrevCalendar] = useState<Calendar>();
  const [nextCalendar, setNextCalendar] = useState<Calendar>();

  const [currentWeek, setCurrentWeek] = useState<Day[]>();
  const [prevWeek, setPrevWeek] = useState<Day[]>();
  const [nextWeek, setNextWeek] = useState<Day[]>();

  const goPrevMonth = () => {
    setCurrenDate(new Date(currenDate.getFullYear(), currenDate.getMonth(), 0));
  };

  const goNextMonth = () => {
    setCurrenDate(
      new Date(currenDate.getFullYear(), currenDate.getMonth() + 1),
    );
  };

  const goPrevWeek = () => {
    setCurrenDate(
      new Date(
        currenDate.getFullYear(),
        currenDate.getMonth(),
        currenDate.getDate() - 7,
      ),
    );
  };

  const goNextWeek = () => {
    setCurrenDate(
      new Date(
        currenDate.getFullYear(),
        currenDate.getMonth(),
        currenDate.getDate() + 7,
      ),
    );
  };

  useEffect(() => {
    const year = currenDate.getFullYear();
    const month = currenDate.getMonth();
    const date = currenDate.getDate();

    setCurrentCalendar(getMonthlyCalendar(currenDate));
    setPrevCalendar(getMonthlyCalendar(new Date(year, month - 1)));
    setNextCalendar(getMonthlyCalendar(new Date(year, month + 1)));

    setCurrentWeek(getWeeklyCalendar(currenDate));
    setPrevWeek(getWeeklyCalendar(new Date(year, month, date - 7)));
    setNextWeek(getWeeklyCalendar(new Date(year, month, date + 7)));
  }, [currenDate]);

  return {
    currentCalendar,
    prevCalendar,
    nextCalendar,
    currentWeek,
    prevWeek,
    nextWeek,
    currenDate,
    setCurrenDate,
    selectedDate,
    setSelectedDate,
    goNextMonth,
    goPrevMonth,
    goPrevWeek,
    goNextWeek,
  };
};

export type CalendarHandler = ReturnType<typeof useCalendar>;
