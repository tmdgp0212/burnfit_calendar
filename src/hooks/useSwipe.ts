import {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {Gesture} from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  currentData: any;
  END_POSITION?: number;
  enabled?: {
    UP?: boolean;
    DOWN?: boolean;
    LEFT?: boolean;
    RIGHT?: boolean;
  };
  onEnd: {
    UP?: () => void;
    DOWN?: () => void;
    LEFT?: () => void;
    RIGHT?: () => void;
  };
}

export const useSwipe = ({
  currentData,
  END_POSITION = 50,
  enabled,
  onEnd = {},
}: Props) => {
  const gesture = {UP: true, DOWN: true, LEFT: true, RIGHT: true, ...enabled};
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
        if (e.translationX < 0 && gesture.RIGHT) {
          translateX.value = e.translationX;
          translateY.value = 0;
        } else if (e.translationX > 0 && gesture.LEFT) {
          translateX.value = e.translationX;
          translateY.value = 0;
        }
      } else {
        if (e.translationY < 0 && gesture.UP) {
          translateX.value = 0;
          translateY.value = e.translationY;
        } else if (e.translationY > 0 && gesture.DOWN) {
          translateX.value = 0;
          translateY.value = e.translationY;
        }
      }
    })
    .onEnd(e => {
      const horizontalThreshold = width * 0.2;

      if (Math.abs(e.translationX) > Math.abs(e.translationY)) {
        // 수평 스와이프
        if (e.translationX > horizontalThreshold) {
          translateX.value = withTiming(width, {}, finished => {
            if (finished) {
              onEnd.RIGHT && runOnJS(onEnd.RIGHT)();
            }
          });
        } else if (e.translationX < -horizontalThreshold) {
          translateX.value = withTiming(-width, {}, finished => {
            if (finished) {
              onEnd.LEFT && runOnJS(onEnd.LEFT)();
            }
          });
        } else {
          translateX.value = withTiming(0);
        }
      } else if (Math.abs(e.translationX) < Math.abs(e.translationY)) {
        // 수직 스와이프
        if (e.translationY < -END_POSITION) {
          onEnd.UP && runOnJS(onEnd.UP)();
        } else if (e.translationY > END_POSITION) {
          onEnd.DOWN && runOnJS(onEnd.DOWN)();
        } else {
          translateY.value = withTiming(0);
        }
      } else {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    });

  // 애니메이션 스타일
  const mainStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const prevStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value - width}],
  }));

  const nextStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value + width}],
  }));

  useEffect(() => {
    translateX.value = 0;
    isAnimating.value = false;
  }, [currentData]);
  return {
    panGesture,
    animate: {
      main: mainStyle,
      prev: prevStyle,
      next: nextStyle,
    },
  };
};
