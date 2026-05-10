import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckCircle, Star, MessageCircle, Calendar } from "lucide-react-native";
import { Header } from "@/components/layout/Header";
import { SafeLayout } from "@/components/layout/SafeLayout";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { StatTile } from "@/components/parent/StatTile";
import { CardShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import {
  useChildInfo,
  useParentStats,
  useActivityFeed,
  useUpcomingEvents,
} from "@/hooks/useParentData";
import { Colors } from "@/constants/colors";
import { Layout, Shadows } from "@/constants/layout";

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  attendance: <CheckCircle size={16} color={Colors.mint[500]} strokeWidth={1.75} />,
  grade: <Star size={16} color={Colors.amber[500]} strokeWidth={1.75} />,
  message: <MessageCircle size={16} color={Colors.scholar[500]} strokeWidth={1.75} />,
};

const EVENT_TONE: Record<string, any> = {
  meeting: "scholar",
  fee: "amber",
  event: "mint",
};

export default function ParentHome() {
  const { user } = useAuthStore();
  const { data: child, isLoading: childLoading } = useChildInfo();
  const { data: stats, isLoading: statsLoading } = useParentStats();
  const { data: activity } = useActivityFeed();
  const { data: events } = useUpcomingEvents();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header
        title="Dashboard"
        subtitle={user?.childName ? `Viewing ${user.childName}` : ""}
        userName={user?.name ?? "Parent"}
      />
      <SafeLayout>
        <View style={{ height: 16 }} />

        {/* Child Card */}
        {childLoading ? (
          <View style={{ marginHorizontal: 16, marginBottom: 16 }}><CardShimmer /></View>
        ) : child ? (
          <Card style={{ marginBottom: 16 }}>
            <View style={styles.childRow}>
              <Avatar name={child.name} size="lg" color={child.avatarColor} />
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childGrade}>{child.grade}</Text>
                <Text style={styles.childId}>{child.studentId}</Text>
              </View>
              <TouchableOpacity style={styles.switchBtn} activeOpacity={0.7}>
                <Text style={styles.switchText}>Switch</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statusRow}>
              <Pill
                label={child.todayStatus === "present" ? "Present today" : child.todayStatus === "late" ? "Late today" : "Absent today"}
                variant={child.todayStatus === "present" ? "mint" : child.todayStatus === "late" ? "amber" : "rose"}
                dot
              />
              {child.checkInTime && (
                <Text style={styles.checkIn}>Checked in at {child.checkInTime}</Text>
              )}
            </View>
          </Card>
        ) : null}

        {/* Stats Grid */}
        {statsLoading ? (
          <View style={{ marginHorizontal: 16, marginBottom: 16 }}><CardShimmer /></View>
        ) : stats ? (
          <View style={styles.statsGrid}>
            <StatTile label="Attendance" value={`${stats.attendancePercent}%`} />
            <StatTile label="Avg. Grade" value={stats.avgGrade} />
            <StatTile
              label="Fees Due"
              value={`₹${(stats.feesDue / 1000).toFixed(1)}K`}
              bg={Colors.coral[50]}
              borderColor={Colors.coral[100]}
              valueColor={Colors.coral[700]}
            />
            <StatTile label="Streak" value={stats.streak} />
          </View>
        ) : null}

        {/* Activity Feed */}
        <SectionHeader title="Recent Activity" />
        <Card style={{ marginBottom: 16, gap: 0 }}>
          {activity?.map((item, idx) => (
            <View key={item.id} style={[styles.actItem, idx > 0 && styles.actBorder]}>
              {ACTIVITY_ICONS[item.type] ?? <CheckCircle size={16} color={Colors.ink[3]} strokeWidth={1.75} />}
              <View style={styles.actInfo}>
                <Text style={styles.actDesc}>{item.description}</Text>
                <Text style={styles.actTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Upcoming Events */}
        <SectionHeader title="Upcoming" />
        <Card style={{ marginBottom: 16, gap: 10 }}>
          {events?.map((ev) => (
            <View key={ev.id} style={styles.eventRow}>
              <Calendar size={16} color={Colors.ink[2]} strokeWidth={1.75} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <Text style={styles.eventDate}>{ev.date}</Text>
              </View>
              <Pill label={ev.type === "meeting" ? "Meeting" : ev.type === "fee" ? "Fee" : "Event"} variant={EVENT_TONE[ev.type]} />
            </View>
          ))}
        </Card>
      </SafeLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  childRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
  },
  childInfo: {
    flex: 1,
    gap: 2,
  },
  childName: {
    fontSize: 17,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  childGrade: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
  },
  childId: {
    fontSize: 11,
    fontFamily: "JetBrainsMono-Regular",
    color: Colors.ink[3],
  },
  switchBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lineStrong,
  },
  switchText: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    color: Colors.ink[1],
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkIn: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Layout.screenPaddingH,
    gap: 10,
    marginBottom: 16,
  },
  actItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 10,
  },
  actBorder: {
    borderTopWidth: 1,
    borderTopColor: Colors.line,
  },
  actInfo: {
    flex: 1,
    gap: 2,
  },
  actDesc: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.ink[1],
    lineHeight: 18,
  },
  actTime: {
    fontSize: 11,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  eventInfo: {
    flex: 1,
    gap: 2,
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  eventDate: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
  },
});
