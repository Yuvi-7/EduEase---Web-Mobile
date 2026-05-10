import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAvatarColor } from "@/constants/colors";
import { Layout } from "@/constants/layout";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  color?: string;
}

const SIZES: Record<AvatarSize, number> = {
  sm: Layout.avatarSm,
  md: Layout.avatarMd,
  lg: Layout.avatarLg,
};

const FONT_SIZES: Record<AvatarSize, number> = {
  sm: 11,
  md: 14,
  lg: 18,
};

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar = memo(({ name, size = "md", color }: AvatarProps) => {
  const dim = SIZES[size];
  const bg = color ?? getAvatarColor(name);
  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.container,
        { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: bg },
      ]}
    >
      <Text style={[styles.text, { fontSize: FONT_SIZES[size] }]}>{initials}</Text>
    </View>
  );
});

Avatar.displayName = "Avatar";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
});
