import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";

interface StatTileProps {
  label: string;
  value: string | number;
  bg?: string;
  borderColor?: string;
  valueColor?: string;
}

export const StatTile = memo(({ label, value, bg, borderColor, valueColor }: StatTileProps) => (
  <View
    style={[
      styles.tile,
      bg ? { backgroundColor: bg } : {},
      borderColor ? { borderColor } : {},
    ]}
  >
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, valueColor ? { color: valueColor } : {}]}>{value}</Text>
  </View>
));

StatTile.displayName = "StatTile";

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: Colors.surface.card,
    borderRadius: Layout.cardRadius,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: Layout.cardPaddingTight,
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    color: Colors.ink[3],
  },
  value: {
    fontSize: 28,
    fontFamily: "SpaceGrotesk-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    letterSpacing: -0.56,
    lineHeight: 32,
  },
});
