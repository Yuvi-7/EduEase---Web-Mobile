import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

type ScheduleTone = "scholar" | "coral" | "mint" | "amber" | "rose";

interface ScheduleRowProps {
  time: string;
  title: string;
  meta: string;
  tone?: ScheduleTone;
  rightElement?: React.ReactNode;
}

const TONE_COLORS: Record<ScheduleTone, string> = {
  scholar: Colors.scholar[500],
  coral: Colors.coral[500],
  mint: Colors.mint[500],
  amber: Colors.amber[500],
  rose: Colors.rose[500],
};

export const ScheduleRow = memo(({ time, title, meta, tone = "scholar", rightElement }: ScheduleRowProps) => (
  <View style={styles.row}>
    <Text style={styles.time}>{time}</Text>
    <View style={[styles.accent, { backgroundColor: TONE_COLORS[tone] }]} />
    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.meta} numberOfLines={1}>{meta}</Text>
    </View>
    {rightElement}
  </View>
));

ScheduleRow.displayName = "ScheduleRow";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    gap: 12,
  },
  time: {
    fontSize: 12,
    fontFamily: "JetBrainsMono-Regular",
    color: Colors.ink[2],
    width: 60,
  },
  accent: {
    width: 3,
    height: 36,
    borderRadius: 2,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  meta: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
});
