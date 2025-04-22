import { StyleSheet, View } from "react-native";
import AuthContent from "@/components/AuthContent/AuthContent";
import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";

const BACKGROUND_IMAGE = require("../assets/images/auth/bg7.jpg");


const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
    >
      <StatusBar style="light" />
      <View style={styles.overlay}>

        <View style={styles.container}>
          <AuthContent />
        </View>
      </View>

    </ImageBackground>

  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
});
