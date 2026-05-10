import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@/components/layout/Header";
import { SafeLayout } from "@/components/layout/SafeLayout";
import { Card } from "@/components/ui/Card";
import { StatTile } from "@/components/parent/StatTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Avatar } from "@/components/ui/Avatar";
import { CardShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useParentStats, useSubjectProgress, useTeacherNote } from "@/hooks/useParentData";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";
import { SubjectProgress } from "@/types/parent";

const TONE_COLORS: Record<string, string> = {
  scholar: Colors.scholar[500],
  coral: Colors.coral[500],
  mint: Colors.mint[500],
  amber: Colors.amber[500],
  rose: Colors.rose[500],
};

function SubjectBar({ subject }: { subject: SubjectProgress }) {
  const pct = subject.score / subject.maxScore;
  const color = TONE_COLORS[subject.tone] ?? Colors.scholar[500];

  return (
    <View style={styles.subjectRow}>
      <Text style={styles.subjectName} numberOfLines={1}>{subject.subject}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct * 100}%` as any, backgroundColor: color }]} />
      </View>
      <Text style={styles.subjectScore}>{subject.score}</Text>
    </View>
  );
}

export default function ParentProgress() {
  const { user } = useAuthStore();
  const { data: stats } = useParentStats();
  const { data: subjects, isLoading: subjLoading } = useSubjectProgress();
  const { data: note, isLoading: noteLoading } = useTeacherNote();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Progress" subtitle={user?.childName ?? ""} userName={user?.name ?? ""} />
      <SafeLayout>
        <View style={{ height: 16 }} />

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatTile label="Avg. Score" value={stats?.avgGrade ?? "–"} />
          <StatTile label="Class Rank" value="#4" />
        </View>

        {/* Subject Progress */}
        <SectionHeader title="By Subject" />
        <Card style={{ marginBottom: 16, gap: 14 }}>
          {subjLoading
            ? <CardShimmer />
            : subjects?.map((s) => <SubjectBar key={s.id} subject={s} />)
          }
        </Card>

        {/* Teacher Note */}
        <SectionHeader title="Teacher Notes" />
        {noteLoading ? (
          <View style={{ marginHorizontal: 16 }}><CardShimmer /></View>
        ) : note ? (
          <Card style={{ marginBottom: 16 }}>
            <View style={styles.noteHeader}>
              <Avatar name={note.teacherName} size="sm" />
              <View style={styles.noteInfo}>
                <Text style={styles.noteTeacher}>{note.teacherName}</Text>
                <Text style={styles.noteSubject}>{note.subject} · {note.date}</Text>
              </View>
            </View>
            <Text style={styles.noteText}>"{note.note}"</Text>
          </Card>
        ) : null}
      </SafeLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: Layout.screenPaddingH,
    gap: 10,
    marginBottom: 16,
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subjectName: {
    width: 110,
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.ink[1],
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surface.sunken,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  subjectScore: {
    width: 28,
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    textAlign: "right",
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  noteInfo: {
    flex: 1,
    gap: 2,
  },
  noteTeacher: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  noteSubject: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
  noteText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
    lineHeight: 22,
    fontStyle: "italic",
  },
});
