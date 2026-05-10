import React, { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@/components/layout/Header";
import { RosterRow } from "@/components/teacher/RosterRow";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { ListRowShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useAttendanceClass, useSaveAttendance } from "@/hooks/useTeacherData";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";
import { AttendanceStatus } from "@/types/teacher";

export default function AttendanceScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { data: classData, isLoading } = useAttendanceClass();
  const saveAttendance = useSaveAttendance();

  const [statuses, setStatuses] = useState<Record<string, AttendanceStatus>>({});

  const getStatus = useCallback(
    (studentId: string, defaultStatus: AttendanceStatus): AttendanceStatus =>
      statuses[studentId] ?? defaultStatus,
    [statuses]
  );

  const handleStatusChange = useCallback((studentId: string, status: AttendanceStatus) => {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  }, []);

  const counts = useMemo(() => {
    if (!classData) return { present: 0, late: 0, absent: 0, unmarked: 0 };
    return classData.students.reduce(
      (acc, s) => {
        const st = getStatus(s.id, s.attendance ?? "unmarked");
        acc[st] = (acc[st] || 0) + 1;
        return acc;
      },
      { present: 0, late: 0, absent: 0, unmarked: 0 } as Record<string, number>
    );
  }, [classData, statuses]);

  const handleSave = useCallback(async () => {
    if (!classData) return;
    const records: Record<string, string> = {};
    classData.students.forEach((s) => {
      records[s.id] = getStatus(s.id, s.attendance ?? "unmarked");
    });
    await saveAttendance.mutateAsync({ classId: classData.id, records });
  }, [classData, statuses, saveAttendance]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Roll Call" subtitle={classData?.subject + " · " + classData?.section} userName={user?.name ?? ""} />

      {/* Stats bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>{counts.present}</Text>
          <Text style={[styles.statLabel, { color: Colors.mint[600] }]}>Present</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>{counts.late}</Text>
          <Text style={[styles.statLabel, { color: Colors.amber[600] }]}>Late</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>{counts.absent}</Text>
          <Text style={[styles.statLabel, { color: Colors.rose[600] }]}>Absent</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>{counts.unmarked}</Text>
          <Text style={[styles.statLabel, { color: Colors.ink[3] }]}>Unmarked</Text>
        </View>
      </View>

      {isLoading ? (
        <View style={{ gap: 8, paddingTop: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => <ListRowShimmer key={i} />)}
        </View>
      ) : (
        <FlashList
          data={classData?.students ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RosterRow
              studentId={item.id}
              name={item.name}
              rollNumber={item.studentId}
              status={getStatus(item.id, item.attendance ?? "unmarked")}
              onStatusChange={handleStatusChange}
            />
          )}
          estimatedItemSize={72}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Sticky bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <Button
          label="Save and notify parents"
          onPress={handleSave}
          loading={saveAttendance.isPending}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsBar: {
    flexDirection: "row",
    backgroundColor: Colors.surface.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    paddingVertical: 12,
    paddingHorizontal: Layout.screenPaddingH,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statNum: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    letterSpacing: -0.48,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: 12,
    backgroundColor: Colors.surface.card,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
});
