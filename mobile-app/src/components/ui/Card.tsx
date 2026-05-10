import React, { memo } from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { Colors } from "@/constants/colors";
import { Layout, Shadows } from "@/constants/layout";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  padded?: boolean;
  mx?: boolean;
}

export const Card = memo(({ children, padded = true, mx = true, style, ...rest }: CardProps) => {
  return (
    <View
      style={[
        styles.card,
        mx && styles.mx,
        padded && styles.padded,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
});

Card.displayName = "Card";

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface.card,
    borderRadius: Layout.cardRadius,
    borderWidth: 1,
    borderColor: Colors.line,
    ...Shadows.card,
  },
  mx: {
    marginHorizontal: Layout.screenPaddingH,
  },
  padded: {
    padding: Layout.cardPadding,
  },
});
