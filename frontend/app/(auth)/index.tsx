import { Image, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import AuthContent from "@/components/AuthContent/AuthContent";

const BACKGROUND_IMAGE = require("../../assets/images/auth/bg7.jpg");

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AuthContent />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

});
