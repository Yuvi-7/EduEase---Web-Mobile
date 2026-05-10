import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Header } from "@/components/layout/Header";
import { SafeLayout } from "@/components/layout/SafeLayout";
import { StreakRibbon } from "@/components/student/StreakRibbon";
import { TaskCard } from "@/components/student/TaskCard";
import { ScheduleRow } from "@/components/shared/ScheduleRow";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Divider } from "@/components/ui/Divider";
import { CardShimmer, ListRowShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useStudentStats, useStudentSchedule, useStudentTasks } from "@/hooks/useStudentData";
import { Colors } from "@/constants/colors";

export default function StudentHome() {
  const { user } = useAuthStore();
  const { data: stats, isLoading: statsLoading } = useStudentStats();
  const { data: schedule, isLoading: schedLoading } = useStudentSchedule();
  const { data: tasks, isLoading: tasksLoading } = useStudentTasks();

  const todoTasks = tasks?.filter((t) => t.status === "todo") ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header
        title="Home"
        subtitle={user?.grade ?? ""}
        userName={user?.name ?? "Student"}
      />
      <SafeLayout>
        <View style={{ height: 16 }} />

        {/* Streak */}
        {statsLoading ? (
          <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
            <CardShimmer />
          </View>
        ) : (
          <StreakRibbon streak={stats?.streak ?? 0} />
        )}

        {/* Today's Schedule */}
        <SectionHeader title="Today's Schedule" action="Full schedule" />
        <Card padded={false} style={{ marginBottom: 16 }}>
          {schedLoading
            ? Array.from({ length: 4 }).map((_, i) => <ListRowShimmer key={i} />)
            : schedule?.slice(0, 5).map((item) => (
                <ScheduleRow
                  key={item.id}
                  time={item.time}
                  title={item.subject}
                  meta={`${item.teacher} · ${item.room}`}
                  tone={item.tone as any}
                />
              ))}
        </Card>

        {/* Due This Week */}
        <SectionHeader title="Due This Week" action="All tasks" />
        <Card style={{ marginBottom: 16, gap: 12 }}>
          {tasksLoading
            ? Array.from({ length: 2 }).map((_, i) => <CardShimmer key={i} />)
            : todoTasks.slice(0, 3).map((task, idx) => (
                <View key={task.id}>
                  <TaskCard task={task} />
                  {idx < Math.min(todoTasks.length - 1, 2) && <Divider />}
                </View>
              ))}
        </Card>

        {/* Recent Badges */}
        <SectionHeader title="Recent Badges" action="View all" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgeScroll}
          style={{ marginBottom: 16 }}
        >
          {["🔥", "⭐", "🌅", "📚"].map((emoji, i) => (
            <View key={i} style={styles.badgeChip}>
              <Text style={styles.badgeEmoji}>{emoji}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeScroll: {
    paddingHorizontal: 16,
    gap: 10,
  },
  badgeChip: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: Colors.surface.card,
    borderWidth: 1,
    borderColor: Colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeEmoji: {
    fontSize: 28,
  },
});
