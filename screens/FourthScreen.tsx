import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const FourthScreen = () => {
  const animatedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      //   transform: [{ translateX: animatedValue.value }],
      //   transform: [{ rotate: `${animatedValue.value}rad` }],
      transform: [{ scale: animatedValue.value }],
    };
  });
  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      console.log(event.rotation);
      animatedValue.value = event.rotation;
    })
    .onEnd(() => {
      animatedValue.value = withSpring(0);
    });
  //   const longPressGesture = Gesture.LongPress()
  //     .minDuration(500)
  //     .onStart(() => {
  //       animatedValue.value = withSpring(1.5);
  //     })
  //     .onEnd(() => {
  //       animatedValue.value = withSpring(1);
  //     });
  const flingLeftGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      animatedValue.value = withSpring(-100);
    });
  const flingRightGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      animatedValue.value = withSpring(100);
    });
  const multiGesture = Gesture.Simultaneous(
    flingLeftGesture,
    flingRightGesture,
  );
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      animatedValue.value = event.scale;
    })
    .onEnd(() => {
      animatedValue.value = withSpring(1);
    });
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default FourthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  box: {
    width: 300,
    height: 300,
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
