import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";

interface GreetingCardProps {
  name: string;
  subtitle: string;
  extra?: string;
}

export const GreetingCard = memo(({ name, subtitle, extra }: GreetingCardProps) => {
  const firstName = name.split(" ")[1] ?? name.split(" ")[0];

  return (
    <LinearGradient
      colors={["#5B5BE5", "#8C5BD6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.circle} />
      <Text style={styles.title}>Good morning,{"\n"}{firstName}! 👋</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {extra && <Text style={styles.extra}>{extra}</Text>}
    </LinearGradient>
  );
});

GreetingCard.displayName = "GreetingCard";

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Layout.screenPaddingH,
    marginBottom: 16,
    borderRadius: 16,
    padding: 18,
    paddingTop: 20,
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.08)",
    right: -30,
    top: -30,
  },
  title: {
    fontSize: 22,
    fontFamily: "SpaceGrotesk-SemiBold",
    fontWeight: "600",
    color: "#fff",
    letterSpacing: -0.44,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "rgba(255,255,255,0.9)",
    marginTop: 6,
    lineHeight: 18,
  },
  extra: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: "rgba(255,255,255,0.75)",
    marginTop: 4,
  },
});
