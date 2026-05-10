import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { StatTile } from "@/components/parent/StatTile";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CardShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import {
  useParentStats,
  useAttendanceCalendar,
  useAttendanceRecords,
} from "@/hooks/useParentData";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";
import { CalendarDay, AttendanceRecord } from "@/types/parent";

const DAY_COLORS: Record<string, string> = {
  present: Colors.mint[500],
  late: Colors.amber[500],
  absent: Colors.rose[500],
  off: Colors.surface.sunken,
  future: Colors.surface.sunken,
};

const STATUS_VARIANT: Record<string, any> = {
  present: "mint",
  late: "amber",
  absent: "rose",
};

const WEEK_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MAY_START_DAY = 4; // May 2026 starts on Friday (index 4)

function CalendarGrid({ days }: { days: CalendarDay[] }) {
  const blanks = Array.from({ length: MAY_START_DAY });

  return (
    <View>
      <View style={styles.weekRow}>
        {WEEK_LABELS.map((d, i) => (
          <Text key={i} style={styles.weekLabel}>{d}</Text>
        ))}
      </View>
      <View style={styles.grid}>
        {blanks.map((_, i) => <View key={`b${i}`} style={styles.dayCell} />)}
        {days.map((day) => (
          <View key={day.date} style={styles.dayCell}>
            <View style={[styles.dayDot, { backgroundColor: DAY_COLORS[day.status] ?? Colors.surface.sunken }]}>
              <Text style={[styles.dayNum, day.status !== "off" && day.status !== "future" && { color: "#fff" }]}>
                {day.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
      {/* Legend */}
      <View style={styles.legend}>
        {[
          { color: Colors.mint[500], label: "Present" },
          { color: Colors.amber[500], label: "Late" },
          { color: Colors.rose[500], label: "Absent" },
          { color: Colors.surface.sunken, label: "Off" },
        ].map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function RecordRow({ record }: { record: AttendanceRecord }) {
  return (
    <View style={styles.recordRow}>
      <View style={styles.recordInfo}>
        <Text style={styles.recordDate}>{record.date}</Text>
        {record.checkIn && <Text style={styles.recordMeta}>Check-in: {record.checkIn}</Text>}
        {record.note && <Text style={styles.recordNote}>{record.note}</Text>}
      </View>
      <Pill label={record.status} variant={STATUS_VARIANT[record.status]} dot />
    </View>
  );
}

export default function ParentAttendance() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { data: stats } = useParentStats();
  const { data: calendar, isLoading: calLoading } = useAttendanceCalendar();
  const { data: records, isLoading: recLoading } = useAttendanceRecords();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Attendance" subtitle={user?.childName ?? ""} userName={user?.name ?? ""} />
      <FlashList
        data={[{ type: "content" as const }]}
        keyExtractor={() => "content"}
        estimatedItemSize={700}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={{ gap: 16 }}>
            {/* Stats */}
            <View style={styles.statsRow}>
              <StatTile label="This Term" value={`${stats?.attendancePercent ?? 0}%`} />
              <StatTile label="Streak" value={`${stats?.streak ?? 0} days`} />
            </View>

            {/* Calendar */}
            <SectionHeader title="May 2026" />
            {calLoading ? (
              <View style={{ marginHorizontal: 16 }}><CardShimmer /></View>
            ) : (
              <Card style={{ marginBottom: 0 }}>
                <CalendarGrid days={calendar ?? []} />
              </Card>
            )}

            {/* Records */}
            <SectionHeader title="Recent Activity" />
            <Card padded={false} style={{ marginBottom: 0 }}>
              {recLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <View key={i} style={{ padding: 16 }}><CardShimmer /></View>
                  ))
                : records?.map((r) => <RecordRow key={r.id} record={r} />)
              }
            </Card>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: Layout.screenPaddingH,
    gap: 10,
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  weekLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 11,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[3],
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  dayDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  dayNum: {
    fontSize: 11,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[3],
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 11,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
  },
  recordRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Layout.screenPaddingH,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    gap: 12,
  },
  recordInfo: {
    flex: 1,
    gap: 2,
  },
  recordDate: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  recordMeta: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
  },
  recordNote: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
    fontStyle: "italic",
  },
});
