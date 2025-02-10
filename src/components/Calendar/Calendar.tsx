import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import MonthlyCalendar from './MonthlyCalendar';
import WeeklyCalendar from './WeeklyCalendar';

import Icon from 'react-native-vector-icons/FontAwesome';

import {useCalendar} from '../../hooks/useCalendar';
import {dateComparer} from '../../util/dateComparer';
import {days, months} from '../../const/date';

const Calendar = () => {
  const calendar = useCalendar();
  const [isMonthlyView, setIsMonthlyView] = useState(true);

  const changeViewType = () => {
    setIsMonthlyView(prev => !prev);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.screen}>
        <View style={styles.navigation}>
          <Pressable onPress={calendar.goPrevMonth} style={styles.button}>
            <Icon name="angle-left" size={24} color="#232B99" />
          </Pressable>
          <Text style={styles.month}>
            {months[calendar.currentDate.getMonth()]}{' '}
            {calendar.currentDate.getFullYear()}
          </Text>
          <Pressable onPress={calendar.goNextMonth} style={styles.button}>
            <Icon name="angle-right" size={24} color="#232B99" />
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
          {isMonthlyView ? (
            <MonthlyCalendar
              calendar={calendar}
              changeViewType={changeViewType}
            />
          ) : (
            <WeeklyCalendar
              calendar={calendar}
              changeViewType={changeViewType}
            />
          )}
        </View>

        {/* 플로팅 버튼 */}
        {((isMonthlyView &&
          !dateComparer(calendar.currentDate, new Date()).isSameMonth) ||
          (!isMonthlyView &&
            !dateComparer(calendar.currentDate, new Date()).isSameWeek)) && (
          <Pressable
            style={styles.floating}
            onPress={() => {
              calendar.setCurrentDate(new Date());
              calendar.setSelectedDate(new Date());
            }}>
            <Icon name="repeat" size={12} color="#fff" />
            <Text style={styles.text_white}>today</Text>
          </Pressable>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  screen: {
    maxWidth: 420,
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
  button: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 40,
    height: 32,
  },
  floating: {
    position: 'absolute',
    bottom: 32,
    right: 20,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
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
