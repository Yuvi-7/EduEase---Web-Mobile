import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "@/components/layout/Header";
import { SafeLayout } from "@/components/layout/SafeLayout";
import { GreetingCard } from "@/components/shared/GreetingCard";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Divider } from "@/components/ui/Divider";
import { Pill } from "@/components/ui/Pill";
import { ScheduleRow } from "@/components/shared/ScheduleRow";
import { AssignmentCard } from "@/components/teacher/AssignmentCard";
import { CardShimmer, ListRowShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useTeacherSchedule, useTeacherAssignments } from "@/hooks/useTeacherData";
import { Colors } from "@/constants/colors";

const STATUS_PILL: Record<string, { label: string; variant: any }> = {
  done: { label: "Done", variant: "neutral" },
  ongoing: { label: "Now", variant: "mint" },
  upcoming: { label: "Up next", variant: "scholar" },
};

export default function TeacherHome() {
  const { user } = useAuthStore();
  const { data: schedule, isLoading: schedLoading } = useTeacherSchedule();
  const { data: assignments, isLoading: assignLoading } = useTeacherAssignments();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header
        title="Home"
        subtitle={`${new Date().toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}`}
        userName={user?.name ?? "Teacher"}
      />
      <SafeLayout>
        <View style={{ height: 16 }} />
        <GreetingCard
          name={user?.name ?? "Teacher"}
          subtitle="Next class in 24 min – Algebra 8C, Lab 2"
          extra="32 students today"
        />

        {/* Today's Schedule */}
        <SectionHeader title="Today's Classes" action="View all" />
        <Card padded={false} style={{ marginBottom: 16 }}>
          {schedLoading
            ? Array.from({ length: 3 }).map((_, i) => <ListRowShimmer key={i} />)
            : schedule?.slice(0, 4).map((item, idx) => {
                const pill = item.status ? STATUS_PILL[item.status] : null;
                return (
                  <ScheduleRow
                    key={item.id}
                    time={item.time}
                    title={item.title}
                    meta={item.room + " · " + item.meta}
                    tone={item.tone}
                    rightElement={pill && <Pill label={pill.label} variant={pill.variant} />}
                  />
                );
              })}
        </Card>

        {/* Assignments */}
        <SectionHeader title="Assignments" action="Post new" />
        <Card style={{ marginBottom: 16, gap: 12 }}>
          {assignLoading
            ? Array.from({ length: 2 }).map((_, i) => <CardShimmer key={i} />)
            : assignments?.map((a, idx) => (
                <View key={a.id}>
                  <AssignmentCard assignment={a} />
                  {idx < (assignments.length - 1) && <Divider />}
                </View>
              ))}
        </Card>

        {/* Quick Actions */}
        <SectionHeader title="Quick Actions" />
        <View style={styles.quickRow}>
          <Card style={styles.quickCard}>
            <Text style={styles.quickEmoji}>📋</Text>
            <Text style={styles.quickLabel}>Take Roll</Text>
          </Card>
          <Card style={styles.quickCard}>
            <Text style={styles.quickEmoji}>✏️</Text>
            <Text style={styles.quickLabel}>Post Assignment</Text>
          </Card>
        </View>
      </SafeLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  quickRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  quickCard: {
    flex: 1,
    marginHorizontal: 0,
    alignItems: "center",
    gap: 8,
    paddingVertical: 20,
  },
  quickEmoji: {
    fontSize: 28,
  },
  quickLabel: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    textAlign: "center",
  },
});
