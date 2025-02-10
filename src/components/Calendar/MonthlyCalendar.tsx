import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';

import Rows from './Rows';

import {CalendarHandler} from '../../hooks/useCalendar';
import {useSwipe} from '../../hooks/useSwipe';

interface Props {
  calendar: CalendarHandler;
  changeViewType: () => void;
}

const MonthlyCalendar = ({calendar, changeViewType}: Props) => {
  const {panGesture, animate} = useSwipe({
    currentData: calendar.currentCalendar,
    enabled: {DOWN: false},
    onEnd: {
      RIGHT: calendar.goPrevMonth,
      LEFT: calendar.goNextMonth,
      UP: changeViewType,
    },
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={styles.container}>
        {/* 이전 달 달력 */}
        <Animated.View style={[styles.calendar, animate.prev]}>
          <Rows
            calendar={calendar.prevCalendar}
            selectedDate={calendar.selectedDate}
            setSelectedDate={calendar.setSelectedDate}
          />
        </Animated.View>
        {/* 현재 달력 */}
        <Animated.View style={[styles.calendar, animate.main]}>
          <Rows
            calendar={calendar.currentCalendar}
            selectedDate={calendar.selectedDate}
            setSelectedDate={calendar.setSelectedDate}
          />
        </Animated.View>
        {/* 다음 달 달력 */}
        <Animated.View style={[styles.calendar, animate.next]}>
          <Rows
            calendar={calendar.nextCalendar}
            selectedDate={calendar.selectedDate}
            setSelectedDate={calendar.setSelectedDate}
          />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default MonthlyCalendar;

const styles = StyleSheet.create({
  container: {
    minHeight: 280,
    overflow: 'hidden',
  },
  calendar: {
    position: 'absolute',
    width: '100%',
  },
});
