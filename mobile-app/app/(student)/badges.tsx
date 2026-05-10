import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@/components/layout/Header";
import { StreakRibbon } from "@/components/student/StreakRibbon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CardShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useStudentStats, useStudentBadges } from "@/hooks/useStudentData";
import { Colors } from "@/constants/colors";
import { Layout, Shadows } from "@/constants/layout";
import { Badge } from "@/types/student";

function BadgeCard({ badge }: { badge: Badge }) {
  if (badge.earned) {
    return (
      <View style={styles.badgeCard}>
        <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
        <Text style={styles.badgeTitle} numberOfLines={1}>{badge.title}</Text>
        <Text style={styles.badgeDesc} numberOfLines={2}>{badge.description}</Text>
        {badge.earnedDate && (
          <Text style={styles.earnedDate}>{badge.earnedDate}</Text>
        )}
      </View>
    );
  }
  return null;
}

function UpNextCard({ badge }: { badge: Badge }) {
  const progress = (badge.progress ?? 0) / (badge.required ?? 1);
  return (
    <View style={styles.upNextCard}>
      <Text style={styles.upNextEmoji}>{badge.emoji}</Text>
      <View style={styles.upNextInfo}>
        <Text style={styles.badgeTitle}>{badge.title}</Text>
        <Text style={styles.badgeDesc}>{badge.description}</Text>
        <View style={styles.progressRow}>
          <ProgressBar progress={progress} tone="scholar" />
          <Text style={styles.progressText}>{badge.progress}/{badge.required}</Text>
        </View>
      </View>
    </View>
  );
}

export default function BadgesScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { data: stats } = useStudentStats();
  const { data: badges, isLoading } = useStudentBadges();

  const earned = badges?.filter((b) => b.earned) ?? [];
  const upcoming = badges?.filter((b) => !b.earned) ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Badges" subtitle={`${earned.length} earned`} userName={user?.name ?? ""} />
      <FlashList
        data={[
          { type: "streak" as const },
          { type: "earnedHeader" as const },
          ...earned.map((b) => ({ type: "badge" as const, badge: b })),
          { type: "upNextHeader" as const },
          ...upcoming.map((b) => ({ type: "upNext" as const, badge: b })),
        ]}
        keyExtractor={(item, i) => String(i)}
        estimatedItemSize={120}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          if (item.type === "streak") {
            return isLoading
              ? <View style={{ marginHorizontal: 16 }}><CardShimmer /></View>
              : <StreakRibbon streak={stats?.streak ?? 0} label="Current streak" />;
          }
          if (item.type === "earnedHeader") {
            return <SectionHeader title="Earned Badges" />;
          }
          if (item.type === "upNextHeader") {
            return <SectionHeader title="Up Next" />;
          }
          if (item.type === "badge" && item.badge) {
            return (
              <View style={styles.badgeGrid}>
                <BadgeCard badge={item.badge} />
              </View>
            );
          }
          if (item.type === "upNext" && item.badge) {
            return (
              <View style={{ marginHorizontal: 16, marginBottom: 10 }}>
                <Card>
                  <UpNextCard badge={item.badge} />
                </Card>
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badgeGrid: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  badgeCard: {
    backgroundColor: Colors.surface.card,
    borderRadius: Layout.cardRadius,
    borderWidth: 1,
    borderColor: Colors.line,
    padding: 16,
    alignItems: "center",
    gap: 6,
    ...Shadows.card,
  },
  badgeEmoji: {
    fontSize: 36,
  },
  badgeTitle: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    textAlign: "center",
  },
  badgeDesc: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
    textAlign: "center",
    lineHeight: 16,
  },
  earnedDate: {
    fontSize: 11,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
  upNextCard: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  upNextEmoji: {
    fontSize: 28,
    opacity: 0.5,
  },
  upNextInfo: {
    flex: 1,
    gap: 6,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  progressText: {
    fontSize: 11,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
    minWidth: 32,
  },
});
