import React, { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";

interface ShimmerProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Shimmer = memo(({ width = "100%", height = 16, borderRadius = 8, style }: ShimmerProps) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.85] });

  return (
    <Animated.View
      style={[
        { width: width as any, height, borderRadius, backgroundColor: Colors.surface.sunken, opacity },
        style,
      ]}
    />
  );
});

Shimmer.displayName = "Shimmer";

export const CardShimmer = memo(() => (
  <View style={shimmerStyles.card}>
    <Shimmer height={14} width="60%" borderRadius={7} />
    <Shimmer height={11} width="40%" borderRadius={6} style={{ marginTop: 8 }} />
    <Shimmer height={40} borderRadius={8} style={{ marginTop: 12 }} />
  </View>
));

CardShimmer.displayName = "CardShimmer";

export const ListRowShimmer = memo(() => (
  <View style={shimmerStyles.row}>
    <Shimmer width={40} height={40} borderRadius={20} />
    <View style={{ flex: 1, gap: 6 }}>
      <Shimmer height={13} width="70%" borderRadius={6} />
      <Shimmer height={11} width="50%" borderRadius={5} />
    </View>
  </View>
));

ListRowShimmer.displayName = "ListRowShimmer";

const shimmerStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
  },
});
