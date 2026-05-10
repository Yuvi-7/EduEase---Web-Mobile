import React, { memo, forwardRef, useState } from "react";
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/colors";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const TextInput = memo(
  forwardRef<RNTextInput, InputProps>(({ label, error, rightElement, style, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <View style={styles.wrapper}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.inputContainer,
            focused && styles.focused,
            !!error && styles.errored,
          ]}
        >
          <RNTextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={Colors.ink[3]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
          {rightElement}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  })
);

TextInput.displayName = "TextInput";

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface.card,
    borderWidth: 1,
    borderColor: Colors.line,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    gap: 8,
  },
  focused: {
    borderColor: Colors.scholar[500],
    borderWidth: 1.5,
  },
  errored: {
    borderColor: Colors.rose[500],
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: Colors.ink[1],
  },
  error: {
    fontSize: 12,
    color: Colors.rose[600],
    fontFamily: "Inter-Regular",
  },
});
