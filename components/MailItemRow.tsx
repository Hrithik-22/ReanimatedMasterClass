import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { MailItem } from "@/screens/FifthScreen";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const ACTION_WIDTH = 80;
const MAX_LEFT_SWIPE = ACTION_WIDTH * 2;
const MAX_RIGHT_SWIPE = ACTION_WIDTH;
const MailItemRow = ({
  item,
  openRowId,
}: {
  item: MailItem;
  openRowId: string | null;
}) => {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  // close when another row opens
  useDerivedValue(() => {
    if (openRowId && openRowId.value !== item.id && translateX.value !== 0) {
      translateX.value = withSpring(0);
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const panGesture = Gesture.Pan()

    .onBegin(() => {
      startX.value = translateX.value;

      openRowId.value = item.id;
    })

    .onUpdate((event) => {
      const newX = startX.value + event.translationX;

      translateX.value = Math.min(
        MAX_RIGHT_SWIPE,
        Math.max(-MAX_LEFT_SWIPE, newX),
      );
    })

    .onEnd(() => {
      if (translateX.value > ACTION_WIDTH / 2) {
        translateX.value = withSpring(ACTION_WIDTH);

        return;
      }

      if (translateX.value < -MAX_LEFT_SWIPE / 2) {
        translateX.value = withSpring(-MAX_LEFT_SWIPE);

        return;
      }

      translateX.value = withSpring(0);
    });

  return (
    <View style={styles.rowContainer}>
      <View style={styles.leftAction}></View>
      <View style={styles.rightAction}>
        <View style={[styles.actionBtn, { backgroundColor: "red" }]}></View>
        <View style={[styles.actionBtn, { backgroundColor: "green" }]}></View>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.row, animatedStyle]}>
          <Text style={styles.icon}>{item.icon}</Text>

          <View style={styles.textContainer}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.preview}>{item.preview}</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default MailItemRow;

const styles = StyleSheet.create({
  rowContainer: {
    height: 70,
    overflow: "hidden", // important
  },
  leftAction: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    height: 70,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    width: ACTION_WIDTH,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  rightAction: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: MAX_LEFT_SWIPE,
    height: 70,
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    height: 70,
  },

  icon: {
    fontSize: 22,
    marginRight: 14,
  },

  textContainer: {
    flex: 1,
  },

  subject: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  preview: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});
