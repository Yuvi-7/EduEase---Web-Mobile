import React, { memo, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";

type ProgressTone = "scholar" | "mint" | "amber" | "coral" | "rose";

interface ProgressBarProps {
  progress: number; // 0 to 1
  tone?: ProgressTone;
  height?: number;
}

const TONE_COLORS: Record<ProgressTone, string> = {
  scholar: Colors.scholar[600],
  mint: Colors.mint[600],
  amber: Colors.amber[600],
  coral: Colors.coral[600],
  rose: Colors.rose[600],
};

export const ProgressBar = memo(({ progress, tone = "scholar", height = Layout.progressBarHeight }: ProgressBarProps) => {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: Math.min(Math.max(progress, 0), 1),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.track, { height }]}>
      <Animated.View
        style={[
          styles.fill,
          { width, height, backgroundColor: TONE_COLORS[tone] },
        ]}
      />
    </View>
  );
});

ProgressBar.displayName = "ProgressBar";

const styles = StyleSheet.create({
  track: {
    backgroundColor: Colors.surface.sunken,
    borderRadius: 2,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 2,
  },
});
