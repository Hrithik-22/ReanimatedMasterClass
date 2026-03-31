import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  clamp,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const ThirdScreen = () => {
  const animatedValue = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    // const backgroundColor = interpolateColor(
    //   animatedValue.value,
    //   [1, 0.5],
    //   ["orange", "blue"],
    // );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  //   const gesture = Gesture.Tap()
  //     .onBegin(() => {
  //       animatedValue.value = withSpring(0.5);
  //     })
  //     .onEnd(() => {
  //       animatedValue.value = withSpring(1);
  //     });
  const gesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = clamp(event.translationX + contextX.value, -150, 150);
      translateY.value = clamp(event.translationY + contextY.value, -300, 300);
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default ThirdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "orange",
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: "#979deb",
  },
  buttonText: {
    fontSize: 18,
  },
});
