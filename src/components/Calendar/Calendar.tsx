import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import MonthlyCalendar from './MonthlyCalendar';
import WeeklyCalendar from './WeeklyCalendar';

import {useCalendar} from '../../hooks/useCalendar';
import {dateComparer} from '../../util/dateComparer';
import {CalendarType} from '../../types/calendar';
import {days, months} from '../../const/date';

const Calendar = () => {
  const calendar = useCalendar();
  const [calendarType, setCalendarType] = useState<CalendarType>('monthly');

  return (
    <GestureHandlerRootView>
      <View style={styles.screen}>
        <View style={styles.navigation}>
          <Pressable onPress={calendar.goPrevMonth}>
            <Text style={styles.icon}>&lt;</Text>
          </Pressable>
          <Text style={styles.month}>
            {months[calendar.currenDate.getMonth()]}{' '}
            {calendar.currenDate.getFullYear()}
          </Text>
          <Pressable onPress={calendar.goNextMonth}>
            <Text style={styles.icon}>&gt;</Text>
          </Pressable>
        </View>
        <View>
          {/* 요일표시 영역 */}
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

          {/* 월간/주간 달력 */}
          {calendar && calendarType === 'monthly' ? (
            <MonthlyCalendar
              calendar={calendar}
              setCalendarType={setCalendarType}
            />
          ) : (
            <WeeklyCalendar setCalendarType={setCalendarType} />
          )}
        </View>

        {/* 플로팅 버튼 */}
        {!dateComparer(calendar.currenDate, new Date()).isSameMonth && (
          <Pressable
            style={styles.floating}
            onPress={() => {
              calendar.setCurrenDate(new Date());
              calendar.setSelectedDate(new Date());
            }}>
            <Text style={styles.text_white}>&lt; today</Text>
          </Pressable>
        )}
      </View>
    </GestureHandlerRootView>
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
