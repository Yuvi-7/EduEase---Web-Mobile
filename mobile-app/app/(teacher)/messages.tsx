import React from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@/components/layout/Header";
import { MessageRow } from "@/components/shared/MessageRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListRowShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useTeacherMessages } from "@/hooks/useTeacherData";
import { Colors } from "@/constants/colors";

export default function MessagesScreen() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { data: messages, isLoading } = useTeacherMessages();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Inbox" subtitle="Messages from parents & admin" userName={user?.name ?? ""} />
      {isLoading ? (
        <View style={{ paddingTop: 8 }}>
          {Array.from({ length: 4 }).map((_, i) => <ListRowShimmer key={i} />)}
        </View>
      ) : !messages?.length ? (
        <EmptyState emoji="📬" title="All caught up!" subtitle="No new messages." />
      ) : (
        <FlashList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageRow
              sender={item.sender}
              role={item.role}
              preview={item.preview}
              timestamp={item.timestamp}
              unread={item.unread}
            />
          )}
          estimatedItemSize={100}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
