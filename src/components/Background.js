import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

const Background = ({ children }) => (
  <ImageBackground
    imageStyle={{opacity:0.5}}
    source={require("../assets/hackerback.jpg")}
    resizeMode="repeat"
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    // opacity: .3,
    backgroundColor: "transparent"
    },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    color: "black",
    opacity: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default memo(Background);
