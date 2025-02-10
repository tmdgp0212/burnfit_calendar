import {useEffect, useState} from 'react';
import {Calendar, Day} from '../types/calendar';
import {getMonthlyCalendar, getWeeklyCalendar} from '../util/calendar';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentCalendar, setCurrentCalendar] = useState<Calendar>();
  const [prevCalendar, setPrevCalendar] = useState<Calendar>();
  const [nextCalendar, setNextCalendar] = useState<Calendar>();

  const [currentWeek, setCurrentWeek] = useState<Day[]>();
  const [prevWeek, setPrevWeek] = useState<Day[]>();
  const [nextWeek, setNextWeek] = useState<Day[]>();

  const goPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0),
    );
  };

  const goNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const goPrevWeek = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 7,
      ),
    );
  };

  const goNextWeek = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 7,
      ),
    );
  };

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();

    setCurrentCalendar(getMonthlyCalendar(currentDate));
    setPrevCalendar(getMonthlyCalendar(new Date(year, month - 1)));
    setNextCalendar(getMonthlyCalendar(new Date(year, month + 1)));

    setCurrentWeek(getWeeklyCalendar(currentDate));
    setPrevWeek(getWeeklyCalendar(new Date(year, month, date - 7)));
    setNextWeek(getWeeklyCalendar(new Date(year, month, date + 7)));
  }, [currentDate]);

  return {
    currentCalendar,
    prevCalendar,
    nextCalendar,
    currentWeek,
    prevWeek,
    nextWeek,
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    goNextMonth,
    goPrevMonth,
    goPrevWeek,
    goNextWeek,
  };
};

export type CalendarHandler = ReturnType<typeof useCalendar>;
