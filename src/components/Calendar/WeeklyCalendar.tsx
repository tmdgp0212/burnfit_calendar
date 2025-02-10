import {StyleSheet} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import Cell from './Cell';

import {CalendarHandler} from '../../hooks/useCalendar';
import {useSwipe} from '../../hooks/useSwipe';

interface Props {
  calendar: CalendarHandler;
  changeViewType: () => void;
}

const WeeklyCalendar = ({calendar, changeViewType}: Props) => {
  const {panGesture, animate} = useSwipe({
    currentData: calendar.currentWeek,
    enabled: {UP: false},
    onEnd: {
      RIGHT: calendar.goPrevWeek,
      LEFT: calendar.goNextWeek,
      DOWN: changeViewType,
    },
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.row, animate.prev]}>
          {calendar.prevWeek?.map(date => (
            <Cell
              key={new Date(date.date).getTime()}
              item={date}
              selectedDate={calendar.selectedDate}
              setSelectedDate={calendar.setSelectedDate}
              setCurrentDate={calendar.setCurrentDate}
            />
          ))}
        </Animated.View>
        <Animated.View style={[styles.row, animate.main]}>
          {calendar.currentWeek?.map(date => (
            <Cell
              key={new Date(date.date).getTime()}
              item={date}
              selectedDate={calendar.selectedDate}
              setSelectedDate={calendar.setSelectedDate}
              setCurrentDate={calendar.setCurrentDate}
            />
          ))}
        </Animated.View>
        <Animated.View style={[styles.row, animate.next]}>
          {calendar.nextWeek?.map(date => (
            <Cell
              key={new Date(date.date).getTime()}
              item={date}
              selectedDate={calendar.selectedDate}
              setSelectedDate={calendar.setSelectedDate}
              setCurrentDate={calendar.setCurrentDate}
            />
          ))}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default WeeklyCalendar;

const styles = StyleSheet.create({
  container: {
    minHeight: 180,
    overflow: 'hidden',
  },
  row: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
});
