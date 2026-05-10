import React, { memo } from "react";
import { ScrollView, StyleSheet, ViewStyle, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";

interface SafeLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
  scrollable?: boolean;
}

export const SafeLayout = memo(
  ({ children, style, refreshing, onRefresh, scrollable = true }: SafeLayoutProps) => {
    const insets = useSafeAreaInsets();

    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing ?? false}
              onRefresh={onRefresh}
              tintColor={Colors.scholar[500]}
            />
          ) : undefined
        }
        scrollEnabled={scrollable}
      >
        {children}
      </ScrollView>
    );
  }
);

SafeLayout.displayName = "SafeLayout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface.page,
  },
  content: {
    gap: 0,
  },
});
