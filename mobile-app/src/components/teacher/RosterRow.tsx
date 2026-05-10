import React, { memo, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";
import { Avatar } from "@/components/ui/Avatar";
import { AttendanceStatus } from "@/types/teacher";

interface RosterRowProps {
  studentId: string;
  name: string;
  rollNumber: string;
  status: AttendanceStatus;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
}

const BUTTONS: { key: AttendanceStatus; label: string; activeColor: string }[] = [
  { key: "present", label: "P", activeColor: Colors.mint[500] },
  { key: "late", label: "L", activeColor: Colors.amber[500] },
  { key: "absent", label: "A", activeColor: Colors.rose[500] },
];

export const RosterRow = memo(({ studentId, name, rollNumber, status, onStatusChange }: RosterRowProps) => {
  const handlePress = useCallback(
    (s: AttendanceStatus) => {
      onStatusChange(studentId, s === status ? "unmarked" : s);
    },
    [studentId, status, onStatusChange]
  );

  return (
    <View style={styles.row}>
      <Avatar name={name} size="md" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.id}>{rollNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {BUTTONS.map((btn) => {
          const isActive = status === btn.key;
          return (
            <TouchableOpacity
              key={btn.key}
              style={[
                styles.tapBtn,
                isActive
                  ? { backgroundColor: btn.activeColor }
                  : styles.tapBtnInactive,
              ]}
              onPress={() => handlePress(btn.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tapBtnLabel, isActive && styles.tapBtnLabelActive]}>
                {btn.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});

RosterRow.displayName = "RosterRow";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Layout.screenPaddingH,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: Colors.surface.card,
    borderRadius: Layout.rosterRadius,
    marginHorizontal: Layout.screenPaddingH,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.line,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  id: {
    fontSize: 11,
    fontFamily: "JetBrainsMono-Regular",
    color: Colors.ink[3],
  },
  buttons: {
    flexDirection: "row",
    gap: 6,
  },
  tapBtn: {
    width: Layout.tapBtnSize,
    height: Layout.tapBtnSize,
    borderRadius: Layout.tapBtnRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  tapBtnInactive: {
    backgroundColor: Colors.surface.sunken,
  },
  tapBtnLabel: {
    fontSize: 13,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    color: Colors.ink[2],
  },
  tapBtnLabelActive: {
    color: "#fff",
  },
});
