import { StyleSheet, View } from "react-native";
import AuthContent from "@/components/AuthContent/AuthContent";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
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
