import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Layout } from "@/constants/layout";

interface StreakRibbonProps {
  streak: number;
  label?: string;
}

export const StreakRibbon = memo(({ streak, label = "Day streak" }: StreakRibbonProps) => (
  <LinearGradient
    colors={["#FF8A6A", "#F0A52A"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.ribbon}
  >
    <Text style={styles.icon}>🔥</Text>
    <View style={styles.textGroup}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.count}>{streak}</Text>
    </View>
    <Text style={styles.motivate}>Keep it up!</Text>
  </LinearGradient>
));

StreakRibbon.displayName = "StreakRibbon";

const styles = StyleSheet.create({
  ribbon: {
    marginHorizontal: Layout.screenPaddingH,
    marginBottom: 12,
    borderRadius: Layout.cardRadius,
    padding: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    fontSize: 28,
  },
  textGroup: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "rgba(255,255,255,0.92)",
  },
  count: {
    fontSize: 22,
    fontFamily: "SpaceGrotesk-SemiBold",
    fontWeight: "600",
    color: "#fff",
    letterSpacing: -0.44,
  },
  motivate: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    color: "rgba(255,255,255,0.9)",
  },
});
