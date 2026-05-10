import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Colors } from "@/constants/colors";

export const TabBar = memo(({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={80}
      tint="light"
      style={[styles.container, { paddingBottom: insets.bottom || 12 }]}
    >
      <View style={styles.inner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label = options.tabBarLabel as string ?? options.title ?? route.name;
          const Icon = options.tabBarIcon as any;

          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              activeOpacity={0.7}
            >
              {Icon && (
                <Icon
                  focused={isFocused}
                  color={isFocused ? Colors.scholar[600] : Colors.ink[3]}
                  size={22}
                />
              )}
              <Text style={[styles.label, isFocused ? styles.activeLabel : styles.inactiveLabel]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </BlurView>
  );
});

TabBar.displayName = "TabBar";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.line,
    backgroundColor: Platform.OS === "android" ? "rgba(255,255,255,0.92)" : "transparent",
  },
  inner: {
    flexDirection: "row",
    paddingTop: 6,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  activeLabel: {
    color: Colors.scholar[600],
  },
  inactiveLabel: {
    color: Colors.ink[3],
  },
});
