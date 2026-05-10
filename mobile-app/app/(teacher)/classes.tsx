import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookOpen, Users, MapPin } from "lucide-react-native";
import { Header } from "@/components/layout/Header";
import { CardShimmer } from "@/components/ui/Shimmer";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuthStore } from "@/store/authStore";
import { useTeacherClasses } from "@/hooks/useTeacherData";
import { Colors } from "@/constants/colors";
import { Layout, Shadows } from "@/constants/layout";
import { ClassItem } from "@/types/teacher";

const TONE_COLORS: Record<string, string> = {
  scholar: Colors.scholar[500],
  coral: Colors.coral[500],
  mint: Colors.mint[500],
  amber: Colors.amber[500],
  rose: Colors.rose[500],
};

const TONE_BG: Record<string, string> = {
  scholar: Colors.scholar[50],
  coral: Colors.coral[50],
  mint: Colors.mint[50],
  amber: Colors.amber[50],
  rose: Colors.rose[50],
};

function ClassCard({ item }: { item: ClassItem }) {
  const color = TONE_COLORS[item.tone];
  const bg = TONE_BG[item.tone];

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <BookOpen size={24} color={color} strokeWidth={1.75} />
      </View>
      <View style={styles.info}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.section}>{item.grade} · Section {item.section}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Users size={12} color={Colors.ink[3]} strokeWidth={1.75} />
            <Text style={styles.metaText}>{item.studentCount} students</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={12} color={Colors.ink[3]} strokeWidth={1.75} />
            <Text style={styles.metaText}>{item.room}</Text>
          </View>
        </View>
        <Text style={styles.nextClass}>Next: {item.nextClass}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ClassesScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { data: classes, isLoading } = useTeacherClasses();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Classes" subtitle={`${classes?.length ?? 0} active classes`} userName={user?.name ?? ""} />
      {isLoading ? (
        <View style={{ paddingTop: 16, gap: 12 }}>
          {Array.from({ length: 4 }).map((_, i) => <CardShimmer key={i} />)}
        </View>
      ) : !classes?.length ? (
        <EmptyState emoji="📚" title="No classes yet" subtitle="Classes assigned to you will appear here." />
      ) : (
        <FlashList
          data={classes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ClassCard item={item} />}
          estimatedItemSize={120}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Colors.surface.card,
    borderRadius: Layout.cardRadius,
    borderWidth: 1,
    borderColor: Colors.line,
    marginHorizontal: Layout.screenPaddingH,
    marginBottom: 12,
    padding: Layout.cardPadding,
    gap: 14,
    ...Shadows.card,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: 3,
  },
  subject: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  section: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
  nextClass: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: Colors.scholar[600],
    marginTop: 4,
  },
});
