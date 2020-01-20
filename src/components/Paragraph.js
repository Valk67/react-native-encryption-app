import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../core/theme";

const Paragraph = ({ children }) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
    color: "black",
    lineHeight: 26,
    borderRadius: 15,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 14
  }
});

export default memo(Paragraph);
