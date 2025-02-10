import {useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import Rows from './Rows';

import {CalendarHandler} from '../../hooks/useCalendar';
import {CalendarType} from '../../types/calendar';

interface Props {
  calendar: CalendarHandler;
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarType>>;
}

const END_POSITION = 100;

const MonthlyCalendar = ({calendar, setCalendarType}: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isAnimating = useSharedValue(false);

  const {width} = Dimensions.get('window');

  // 제스처 핸들러
  const panGesture = Gesture.Pan()
    .activeOffsetY([-20, 0])
    .onUpdate(e => {
      if (isAnimating.value) return; // 애니메이션 중에는 새로운 제스처 무시

      if (Math.abs(e.translationX) > Math.abs(e.translationY)) {
        translateX.value = e.translationX;
        translateY.value = 0;
      } else if (e.translationY < 0) {
        translateX.value = 0;
        translateY.value = e.translationY;
      }
    })
    .onEnd(e => {
      const horizontalThreshold = width * 0.2;

      if (Math.abs(e.translationX) > Math.abs(e.translationY)) {
        // 수평 스와이프
        if (e.translationX > horizontalThreshold) {
          translateX.value = withTiming(width, {}, finished => {
            if (finished) {
              runOnJS(calendar.goPrevMonth)();
            }
          });
        } else if (e.translationX < -horizontalThreshold) {
          translateX.value = withTiming(-width, {}, finished => {
            if (finished) {
              runOnJS(calendar.goNextMonth)();
            }
          });
        } else {
          translateX.value = withTiming(0);
        }
      } else if (e.translationY < -END_POSITION) {
        // 수직 스와이프 (캘린더 보기 전환)
        if (Math.abs(e.translationY) > END_POSITION) {
          runOnJS(setCalendarType)('weekly');
        } else {
          translateY.value = withTiming(0);
        }
      } else {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    });

  // 애니메이션 스타일
  const mainPhotoStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const prevPhotoStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value - width}],
  }));

  const nextPhotoStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value + width}],
  }));

  useEffect(() => {
    translateX.value = 0;
    isAnimating.value = false;
  }, [calendar.currentCalendar]);
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View>
        {/* 이전 달 달력 */}
        <Animated.View style={[styles.calendar, prevPhotoStyle]}>
          <Rows
            calendar={calendar.prevCalendar}
            selectedDate={calendar.selectedDate}
            setSelectedDate={calendar.setSelectedDate}
          />
        </Animated.View>
        {/* 현재 달력 */}
        <Animated.View style={[styles.calendar, mainPhotoStyle]}>
          <Rows
            calendar={calendar.currentCalendar}
            selectedDate={calendar.selectedDate}
            setSelectedDate={calendar.setSelectedDate}
          />
        </Animated.View>
        {/* 다음 달 달력 */}
        <Animated.View style={[styles.calendar, nextPhotoStyle]}>
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
  calendar: {
    position: 'absolute',
    width: '100%',
  },
});
