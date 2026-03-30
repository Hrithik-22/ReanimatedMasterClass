import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SecondScreen = () => {
  const animatedValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, 50, 100], [1, 0.4, 1]);
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 50, 100],
      ["#1620af", "#f23030", "#1620af"],
    );
    const width = interpolate(
      animatedValue.value,
      [0, 50, 100],
      [100, 50, 100],
    );
    const height = interpolate(
      animatedValue.value,
      [0, 50, 100],
      [100, 50, 100],
    );
    return {
      transform: [{ translateX: animatedValue.value }],
      opacity,
      backgroundColor,
      width,
      height,
    };
  });
  const onPressButton = () => {
    if (animatedValue.value === 0) {
      animatedValue.value = withTiming(100, { duration: 1000 });
    } else {
      animatedValue.value = withTiming(0, { duration: 1000 });
    }
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Pressable onPress={onPressButton} style={styles.button}>
        <Text style={styles.buttonText}>Start Interpolation</Text>
      </Pressable>
    </View>
  );
};

export default SecondScreen;

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
    backgroundColor: "#1620af",
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
