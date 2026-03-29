import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const FirstScreen = () => {
  const animatedValue = useSharedValue(1);
  const animatedHeight = useSharedValue(100);
  const animatedWidth = useSharedValue(100);
  const isAnimating = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      height: animatedHeight.value,
      width: animatedWidth.value,
    };
  });
  //   const onPressButton = () => {
  //     if (animatedValue.value === 1) {
  //       animatedValue.value = withTiming(0.5, { duration: 800 });
  //       animatedHeight.value = withSpring(150);
  //       animatedWidth.value = withSpring(150);
  //     } else if (animatedValue.value === 0.5) {
  //       animatedValue.value = withTiming(0.2, { duration: 900 });
  //       animatedHeight.value = withSpring(180);
  //       animatedWidth.value = withSpring(180);
  //     } else {
  //       animatedValue.value = withTiming(1, { duration: 1500 });
  //       animatedHeight.value = withSpring(100);
  //       animatedWidth.value = withSpring(100);
  //     }
  //   };
  const onPressButton = () => {
    if (!isAnimating.value) {
      isAnimating.value = true;
      animatedHeight.value = withRepeat(withSpring(50), -1, true);
      animatedWidth.value = withRepeat(withSpring(50), -1, true);
    } else {
      isAnimating.value = false;
      cancelAnimation(animatedHeight);
      cancelAnimation(animatedWidth);
    }
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Pressable onPress={onPressButton}>
        <Text>Press me</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  box: {
    // width: 100,
    // height: 100,
    backgroundColor: "red",
  },
});
export default FirstScreen;
