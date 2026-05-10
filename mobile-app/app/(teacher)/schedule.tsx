import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@/components/layout/Header";
import { ScheduleRow } from "@/components/shared/ScheduleRow";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";
import { ListRowShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useTeacherSchedule } from "@/hooks/useTeacherData";
import { Colors } from "@/constants/colors";

const STATUS_PILL: Record<string, { label: string; variant: any }> = {
  done: { label: "Done", variant: "neutral" },
  ongoing: { label: "Now", variant: "mint" },
  upcoming: { label: "Up next", variant: "scholar" },
};

export default function ScheduleScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { data: schedule, isLoading } = useTeacherSchedule();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header
        title="Schedule"
        subtitle={new Date().toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
        userName={user?.name ?? ""}
      />
      <View style={{ height: 16 }} />

      <Card padded={false} style={{ marginBottom: 16 }}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <ListRowShimmer key={i} />)
          : schedule?.map((item) => {
              const pill = item.status ? STATUS_PILL[item.status] : null;
              return (
                <ScheduleRow
                  key={item.id}
                  time={item.time}
                  title={item.title}
                  meta={`${item.room} · ${item.meta}`}
                  tone={item.tone}
                  rightElement={pill && <Pill label={pill.label} variant={pill.variant} />}
                />
              );
            })}
      </Card>
    </View>
  );
}
