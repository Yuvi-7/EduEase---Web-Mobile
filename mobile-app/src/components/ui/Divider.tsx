import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const Divider = memo(() => <View style={styles.divider} />);
Divider.displayName = "Divider";

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.line,
    marginTop: 10,
    marginBottom: 10,
  },
});
