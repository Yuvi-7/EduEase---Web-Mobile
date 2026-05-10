import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

interface EmptyStateProps {
  emoji?: string;
  title: string;
  subtitle?: string;
}

export const EmptyState = memo(({ emoji = "📭", title, subtitle }: EmptyStateProps) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
  </View>
));

EmptyState.displayName = "EmptyState";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
    gap: 8,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
    textAlign: "center",
    lineHeight: 18,
  },
});
