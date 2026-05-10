import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Clock, CheckCircle } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Task } from "@/types/student";

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

interface TaskCardProps {
  task: Task;
}

export const TaskCard = memo(({ task }: TaskCardProps) => {
  const isSubmitted = task.status === "submitted" || task.status === "graded";
  const tone = task.tone;

  return (
    <View style={styles.card}>
      <View style={[styles.tag, { backgroundColor: TONE_BG[tone] }]}>
        <Text style={[styles.tagText, { color: TONE_TEXT[tone] }]}>{task.subject}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
      {isSubmitted ? (
        <View style={styles.submittedRow}>
          <CheckCircle size={14} color={Colors.mint[500]} strokeWidth={1.75} />
          <Text style={styles.submittedText}>{task.dueDate}</Text>
        </View>
      ) : (
        <>
          <View style={styles.dueRow}>
            <Clock size={12} color={Colors.ink[2]} strokeWidth={1.75} />
            <Text style={styles.due}>{task.dueDate}</Text>
          </View>
          <ProgressBar progress={task.progress} tone={tone} />
          <Text style={styles.progressText}>{Math.round(task.progress * 100)}% complete</Text>
        </>
      )}
    </View>
  );
});

TaskCard.displayName = "TaskCard";

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
  submittedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  submittedText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.mint[700],
  },
  progressText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
});
