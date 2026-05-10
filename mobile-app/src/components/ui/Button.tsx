import React, { memo } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export const Button = memo(
  ({ label, onPress, variant = "primary", loading, disabled, style, icon }: ButtonProps) => {
    const isPrimary = variant === "primary";
    const isSecondary = variant === "secondary";

    return (
      <TouchableOpacity
        style={[
          styles.base,
          isPrimary && styles.primary,
          isSecondary && styles.secondary,
          variant === "ghost" && styles.ghost,
          (disabled || loading) && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={isPrimary ? "#fff" : Colors.ink[1]} size="small" />
        ) : (
          <>
            {icon}
            <Text
              style={[
                styles.label,
                isPrimary && styles.labelPrimary,
                isSecondary && styles.labelSecondary,
                variant === "ghost" && styles.labelGhost,
              ]}
            >
              {label}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

const styles = StyleSheet.create({
  base: {
    height: Layout.ctaHeight,
    borderRadius: Layout.btnRadius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primary: {
    backgroundColor: Colors.scholar[600],
  },
  secondary: {
    backgroundColor: Colors.surface.card,
    borderWidth: 1,
    borderColor: Colors.lineStrong,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
  },
  labelPrimary: {
    color: "#fff",
  },
  labelSecondary: {
    color: Colors.ink[1],
  },
  labelGhost: {
    color: Colors.scholar[600],
  },
});
