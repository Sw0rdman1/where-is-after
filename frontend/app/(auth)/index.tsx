import { Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { View } from "@/components/Themed";
import AuthContent from "@/components/AuthContent/AuthContent";

const BACKGROUND_IMAGE = require("../../assets/images/auth/bg7.jpg");

const WelcomeScreen = () => {

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.backgroundImage} source={BACKGROUND_IMAGE} />
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
    backgroundColor: "black",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
