import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BookOpen } from "lucide-react-native";
import { Header } from "@/components/layout/Header";
import { Pill } from "@/components/ui/Pill";
import { CardShimmer } from "@/components/ui/Shimmer";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuthStore } from "@/store/authStore";
import { useStudentClasses } from "@/hooks/useStudentData";
import { Colors } from "@/constants/colors";
import { Layout, Shadows } from "@/constants/layout";
import { StudentClass } from "@/types/student";

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

function ClassCard({ item }: { item: StudentClass }) {
  const color = TONE_COLORS[item.tone] ?? Colors.scholar[500];
  const bg = TONE_BG[item.tone] ?? Colors.scholar[50];
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={[styles.icon, { backgroundColor: bg }]}>
        <BookOpen size={22} color={color} strokeWidth={1.75} />
      </View>
      <View style={styles.info}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.teacher}>{item.teacher}</Text>
      </View>
      <Pill label={item.grade} variant={item.gradeTone as any} />
    </TouchableOpacity>
  );
}

export default function StudentClassesScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { data: classes, isLoading } = useStudentClasses();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Classes" subtitle={user?.grade ?? ""} userName={user?.name ?? ""} />
      {isLoading ? (
        <View style={{ paddingTop: 16, gap: 12 }}>
          {Array.from({ length: 5 }).map((_, i) => <CardShimmer key={i} />)}
        </View>
      ) : !classes?.length ? (
        <EmptyState emoji="📚" title="No classes" subtitle="Your classes will appear here." />
      ) : (
        <FlashList
          data={classes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ClassCard item={item} />}
          estimatedItemSize={80}
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
    alignItems: "center",
    backgroundColor: Colors.surface.card,
    borderRadius: Layout.cardRadius,
    borderWidth: 1,
    borderColor: Colors.line,
    marginHorizontal: Layout.screenPaddingH,
    marginBottom: 10,
    padding: Layout.cardPadding,
    gap: 12,
    ...Shadows.card,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: 3,
  },
  subject: {
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  teacher: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
  },
});
