import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@/components/layout/Header";
import { SegmentControl } from "@/components/ui/SegmentControl";
import { TaskCard } from "@/components/student/TaskCard";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { CardShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useStudentTasks } from "@/hooks/useStudentData";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";

export default function TasksScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("todo");
  const { data: tasks, isLoading } = useStudentTasks();

  const todoTasks = useMemo(() => tasks?.filter((t) => t.status === "todo") ?? [], [tasks]);
  const doneTasks = useMemo(() => tasks?.filter((t) => t.status !== "todo") ?? [], [tasks]);
  const displayed = activeTab === "todo" ? todoTasks : doneTasks;

  const TABS = [
    { key: "todo", label: "To do", count: todoTasks.length },
    { key: "done", label: "Done", count: doneTasks.length },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Tasks" subtitle="Assignments & homework" userName={user?.name ?? ""} />
      <View style={styles.segWrap}>
        <SegmentControl segments={TABS} activeKey={activeTab} onChange={setActiveTab} />
      </View>
      {isLoading ? (
        <View style={{ gap: 12, paddingHorizontal: 16 }}>
          {Array.from({ length: 3 }).map((_, i) => <CardShimmer key={i} />)}
        </View>
      ) : !displayed.length ? (
        <EmptyState
          emoji={activeTab === "todo" ? "✅" : "📭"}
          title={activeTab === "todo" ? "All caught up!" : "Nothing submitted yet"}
          subtitle={activeTab === "todo" ? "No pending tasks. Nice work!" : "Your submitted tasks will appear here."}
        />
      ) : (
        <FlashList
          data={displayed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <Card>
                <TaskCard task={item} />
              </Card>
            </View>
          )}
          estimatedItemSize={130}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  segWrap: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingVertical: 12,
  },
  cardWrap: {
    marginBottom: 10,
  },
});
