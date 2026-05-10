import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Clock } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Assignment } from "@/types/teacher";

const TONE_TEXT: Record<string, string> = {
  scholar: Colors.scholar[800],
  coral: Colors.coral[700],
  mint: Colors.mint[700],
  amber: Colors.amber[700],
  rose: Colors.rose[700],
};

const TONE_BG: Record<string, string> = {
  scholar: Colors.scholar[50],
  coral: Colors.coral[50],
  mint: Colors.mint[50],
  amber: Colors.amber[50],
  rose: Colors.rose[50],
};

interface AssignmentCardProps {
  assignment: Assignment;
}

export const AssignmentCard = memo(({ assignment }: AssignmentCardProps) => {
  const progress = assignment.submittedCount / assignment.totalCount;
  const tone = assignment.tone;

  return (
    <View style={styles.card}>
      <View style={[styles.tag, { backgroundColor: TONE_BG[tone] }]}>
        <Text style={[styles.tagText, { color: TONE_TEXT[tone] }]}>{assignment.subject}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>{assignment.title}</Text>
      <View style={styles.dueRow}>
        <Clock size={12} color={Colors.ink[2]} strokeWidth={1.75} />
        <Text style={styles.due}>{assignment.dueDate}</Text>
      </View>
      <ProgressBar progress={progress} tone={tone} />
      <Text style={styles.count}>
        {assignment.submittedCount}/{assignment.totalCount} submitted
      </Text>
    </View>
  );
});

AssignmentCard.displayName = "AssignmentCard";

const styles = StyleSheet.create({
  card: {
    gap: 8,
    paddingVertical: 4,
  },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    lineHeight: 20,
  },
  dueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  due: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
  },
  count: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
});
