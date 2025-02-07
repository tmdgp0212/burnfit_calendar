import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useCalendar} from '../../hooks/useCalendar';
import {dateComparer} from '../../util/dateComparer';
import MonthlyCalendar from './MonthlyCalendar';
import {CalendarType} from '../../types/calendar';

const month = [
  'Jan',
  'Fab',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const [calendarType, setCalendarType] = useState<CalendarType>('monthly');

  const {
    calendar,
    currenDate,
    setCurrenDate,
    selectedDate,
    setSelectedDate,
    goNextMonth,
    goPrevMonth,
  } = useCalendar();

  return (
    <View style={styles.screen}>
      <View style={styles.navigation}>
        <Pressable onPress={goPrevMonth}>
          <Text style={styles.icon}>&lt;</Text>
        </Pressable>
        <Text style={styles.month}>
          {month[currenDate.getMonth()]} {currenDate.getFullYear()}
        </Text>
        <Pressable onPress={goNextMonth}>
          <Text style={styles.icon}>&gt;</Text>
        </Pressable>
      </View>
      <View style={styles.calendar}>
        <View style={styles.row}>
          {days.map(day => {
            const isSun = day === 'Sun';
            const isSat = day === 'Sat';
            return (
              <Pressable key={'day_' + day} style={styles.days}>
                <Text
                  style={[
                    isSun ? styles.text_red : isSat ? styles.text_blue : {},
                  ]}>
                  {day}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {calendar && (
          <MonthlyCalendar
            calendar={calendar}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
      </View>
      {!dateComparer(currenDate, new Date()).isSameDate && (
        <Pressable
          style={styles.floating}
          onPress={() => {
            setCurrenDate(new Date());
            setSelectedDate(new Date());
          }}>
          <Text style={styles.text_white}>&lt; today</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendar: {},
  month: {
    flexGrow: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  icon: {
    color: '#232B99',
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  days: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
  },
  floating: {
    position: 'absolute',
    bottom: 32,
    right: 20,
    width: 56,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAAEEB',
    borderRadius: 100,
  },
  text_white: {
    color: '#fff',
  },
  text_red: {
    color: '#B21016',
  },
  text_blue: {
    color: '#007AAE',
  },
});
