import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const LIST_ITEM_COLOR = "#1798DE";

interface Item {
  id: number;
}
const item: Item[] = new Array(5).fill(0).map((dat, index) => ({ id: index }));
const LayoutAnimation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {item.map((_, index) => (
          <View key={index} style={styles.listItem} />
        ))}
      </ScrollView>
    </View>
  );
};

export default LayoutAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listItem: {
    backgroundColor: LIST_ITEM_COLOR,
    height: 100,
    width: "80%",
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 20,
    //shadow for android
    elevation: 10,
    //shadow for ios
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.54,
    shadowRadius: 10,
  },
  floatingBtn: {
    width: 80,
    aspectRatio: 1,
  },
});
