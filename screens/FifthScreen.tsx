import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MailItemRow from "@/components/MailItemRow";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

export type MailItem = {
  id: string;
  icon: string;
  subject: string;
  preview: string;
};
const DATA: MailItem[] = [
  {
    id: "1",
    icon: "📧",
    subject: "Mail Subject 1",
    preview: "Preview of message 1",
  },
  {
    id: "2",
    icon: "🔥",
    subject: "Mail Subject 2",
    preview: "Preview of message 2",
  },
  {
    id: "3",
    icon: "🎵",
    subject: "Mail Subject 3",
    preview: "Preview of message 3",
  },
  {
    id: "4",
    icon: "🛒",
    subject: "Mail Subject 4",
    preview: "Preview of message 4",
  },
  {
    id: "5",
    icon: "📦",
    subject: "Mail Subject 5",
    preview: "Preview of message 5",
  },
  {
    id: "6",
    icon: "📧",
    subject: "Mail Subject 6",
    preview: "Preview of message 6",
  },
  {
    id: "7",
    icon: "🔥",
    subject: "Mail Subject 7",
    preview: "Preview of message 7",
  },
  {
    id: "8",
    icon: "🎵",
    subject: "Mail Subject 8",
    preview: "Preview of message 8",
  },
  {
    id: "9",
    icon: "🛒",
    subject: "Mail Subject 9",
    preview: "Preview of message 9",
  },
  {
    id: "10",
    icon: "📦",
    subject: "Mail Subject 10",
    preview: "Preview of message 10",
  },
];

export default function GmailStyleList() {
  const openRowId = useSharedValue<string | null>(null);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>📬 Gmail Style Static List</Text>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MailItemRow openRowId={openRowId} item={item} />
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: 18,
  },

  header: {
    fontSize: 18,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
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

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 52,
  },
});
