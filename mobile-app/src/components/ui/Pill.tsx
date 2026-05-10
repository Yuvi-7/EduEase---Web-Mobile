import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PILL_STYLES, PillVariant } from "@/constants/colors";

interface PillProps {
  label: string;
  variant?: PillVariant;
  dot?: boolean;
}

export const Pill = memo(({ label, variant = "neutral", dot = false }: PillProps) => {
  const { bg, text } = PILL_STYLES[variant];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {dot && <View style={[styles.dot, { backgroundColor: text }]} />}
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
});

Pill.displayName = "Pill";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 22,
    paddingHorizontal: 10,
    borderRadius: 999,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
});
