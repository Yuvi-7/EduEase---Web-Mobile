import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/colors";
import { Avatar } from "@/components/ui/Avatar";

interface MessageRowProps {
  sender: string;
  role: string;
  preview: string;
  timestamp: string;
  unread?: boolean;
  onPress?: () => void;
}

export const MessageRow = memo(({ sender, role, preview, timestamp, unread, onPress }: MessageRowProps) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.avatarWrapper}>
      <Avatar name={sender} size="md" />
      {unread && <View style={styles.unreadDot} />}
    </View>
    <View style={styles.content}>
      <View style={styles.topRow}>
        <Text style={[styles.sender, unread && styles.unreadSender]} numberOfLines={1}>
          {sender}
        </Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
      <Text style={styles.role} numberOfLines={1}>{role}</Text>
      <Text style={styles.preview} numberOfLines={2}>{preview}</Text>
    </View>
  </TouchableOpacity>
));

MessageRow.displayName = "MessageRow";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    backgroundColor: Colors.surface.card,
  },
  avatarWrapper: {
    position: "relative",
  },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.coral[500],
    borderWidth: 1.5,
    borderColor: Colors.surface.card,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sender: {
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    flex: 1,
  },
  unreadSender: {
    color: Colors.ink[1],
  },
  timestamp: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
  role: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
  preview: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
    lineHeight: 18,
    marginTop: 2,
  },
});
