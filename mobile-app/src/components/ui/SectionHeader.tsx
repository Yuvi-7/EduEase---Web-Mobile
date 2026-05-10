import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export const SectionHeader = memo(({ title, action, onAction }: SectionHeaderProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {action && (
      <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
        <Text style={styles.action}>{action}</Text>
      </TouchableOpacity>
    )}
  </View>
));

SectionHeader.displayName = "SectionHeader";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Layout.screenPaddingH,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  action: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: Colors.scholar[600],
  },
});
