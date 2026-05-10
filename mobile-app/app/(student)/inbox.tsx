import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Header } from "@/components/layout/Header";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuthStore } from "@/store/authStore";
import { Colors } from "@/constants/colors";

const PLACEHOLDER_MESSAGES = [
  { id: "1", sender: "Ms. Sarah Chen", role: "Mathematics", preview: "Great job on today's quiz, Arjun!", timestamp: "9:41 AM", unread: true },
  { id: "2", sender: "Mr. Arun Iyer", role: "Science", preview: "Your lab report has been graded. Check grades.", timestamp: "Yesterday", unread: false },
];

import { MessageRow } from "@/components/shared/MessageRow";

export default function StudentInbox() {
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Inbox" subtitle="Messages from teachers" userName={user?.name ?? ""} />
      {!PLACEHOLDER_MESSAGES.length ? (
        <EmptyState emoji="📬" title="No messages" subtitle="Teacher messages will appear here." />
      ) : (
        <FlashList
          data={PLACEHOLDER_MESSAGES}
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
