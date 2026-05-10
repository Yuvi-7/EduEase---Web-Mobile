import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@/components/layout/Header";
import { SegmentControl } from "@/components/ui/SegmentControl";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { ListRowShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useGradebook } from "@/hooks/useTeacherData";
import { Colors } from "@/constants/colors";
import { Layout, Shadows } from "@/constants/layout";
import { GradebookEntry } from "@/types/teacher";

const TABS = [
  { key: "quiz3", label: "Quiz 3" },
  { key: "midterm", label: "Mid-term" },
  { key: "project", label: "Project" },
];

function GradeRow({ entry }: { entry: GradebookEntry }) {
  return (
    <View style={styles.row}>
      <Avatar name={entry.studentName} size="md" />
      <Text style={styles.name} numberOfLines={1}>{entry.studentName}</Text>
      <Text style={styles.score}>{entry.score ?? "–"}</Text>
      <Pill
        label={entry.gradePill}
        variant={entry.pillTone === ("neutral" as any) ? "neutral" : entry.pillTone}
      />
    </View>
  );
}

export default function GradebookScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("quiz3");
  const { data: entries, isLoading } = useGradebook();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Gradebook" subtitle="9A · Mathematics" userName={user?.name ?? ""} />
      <View style={styles.segmentWrap}>
        <SegmentControl segments={TABS} activeKey={activeTab} onChange={setActiveTab} />
      </View>
      {isLoading ? (
        <View style={{ paddingTop: 8 }}>
          {Array.from({ length: 6 }).map((_, i) => <ListRowShimmer key={i} />)}
        </View>
      ) : (
        <FlashList
          data={entries ?? []}
          keyExtractor={(item) => item.studentId}
          renderItem={({ item }) => <GradeRow entry={item} />}
          estimatedItemSize={64}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  segmentWrap: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Layout.screenPaddingH,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    backgroundColor: Colors.surface.card,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  score: {
    fontSize: 15,
    fontFamily: "SpaceGrotesk-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    width: 36,
    textAlign: "right",
  },
});
