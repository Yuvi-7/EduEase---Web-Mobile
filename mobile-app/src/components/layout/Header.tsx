import React, { memo, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bell, LogOut, User } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Layout, Shadows } from "@/constants/layout";
import { Avatar } from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/authStore";

interface HeaderProps {
  title: string;
  subtitle?: string;
  userName: string;
  onBellPress?: () => void;
}

export const Header = memo(
  ({ title, subtitle, userName, onBellPress }: HeaderProps) => {
    const insets = useSafeAreaInsets();
    const [menuVisible, setMenuVisible] = useState(false);
    const logout = useAuthStore((s) => s.logout);
    const user = useAuthStore((s) => s.user);

    const handleLogout = useCallback(() => {
      setMenuVisible(false);
      logout();
    }, [logout]);

    return (
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <View style={styles.inner}>
          <View style={styles.textGroup}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={onBellPress}
              activeOpacity={0.8}
            >
              <Bell size={20} color={Colors.ink[1]} strokeWidth={1.75} />
              <View style={styles.pip} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(true)} activeOpacity={0.85}>
              <Avatar name={userName} size="md" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile dropdown */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
            <View style={[styles.menu, { top: insets.top + 60 }]}>
              {/* User info */}
              <View style={styles.menuHeader}>
                <Avatar name={userName} size="sm" />
                <View style={styles.menuUserInfo}>
                  <Text style={styles.menuName}>{user?.name ?? userName}</Text>
                  <Text style={styles.menuRole}>{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""}</Text>
                </View>
              </View>

              <View style={styles.menuDivider} />

              {/* Logout button */}
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout} activeOpacity={0.7}>
                <LogOut size={18} color={Colors.rose[600]} strokeWidth={1.75} />
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  }
);

Header.displayName = "Header";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface.page,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    paddingBottom: 10,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Layout.headerPaddingH,
    paddingTop: 6,
    gap: 12,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: "SpaceGrotesk-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    letterSpacing: -0.56,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: Layout.iconBtn,
    height: Layout.iconBtn,
    borderRadius: Layout.iconBtn / 2,
    backgroundColor: Colors.surface.card,
    borderWidth: 1,
    borderColor: Colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  pip: {
    position: "absolute",
    top: 8,
    right: 8,
    width: Layout.notificationPip,
    height: Layout.notificationPip,
    borderRadius: Layout.notificationPip / 2,
    backgroundColor: Colors.coral[500],
    borderWidth: 1.5,
    borderColor: Colors.surface.page,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  menu: {
    position: "absolute",
    right: 16,
    backgroundColor: Colors.surface.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.line,
    width: 220,
    paddingVertical: 8,
    ...Shadows.cardStrong,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  menuUserInfo: {
    flex: 1,
    gap: 1,
  },
  menuName: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  menuRole: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.line,
    marginHorizontal: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.rose[600],
  },
});
