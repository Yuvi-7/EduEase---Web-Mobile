import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

interface Segment {
  key: string;
  label: string;
  count?: number;
}

interface SegmentControlProps {
  segments: Segment[];
  activeKey: string;
  onChange: (key: string) => void;
}

export const SegmentControl = memo(({ segments, activeKey, onChange }: SegmentControlProps) => {
  return (
    <View style={styles.container}>
      {segments.map((seg) => {
        const isActive = seg.key === activeKey;
        return (
          <TouchableOpacity
            key={seg.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onChange(seg.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {seg.label}
              {seg.count !== undefined ? ` (${seg.count})` : ""}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

SegmentControl.displayName = "SegmentControl";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.surface.sunken,
    borderRadius: 10,
    padding: 3,
    gap: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 7,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: Colors.surface.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    color: Colors.ink[3],
  },
  activeLabel: {
    color: Colors.ink[1],
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
});
