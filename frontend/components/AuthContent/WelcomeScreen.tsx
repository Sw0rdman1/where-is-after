import { StyleSheet, Text, View } from "react-native";
import Button from "../Button/Button";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Props {
  handlePress: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ handlePress }) => {
  return (
    <View style={styles.container}>
      <Animated.Text
        style={styles.title}
        entering={FadeInDown.duration(400).delay(200)}
      >
        The best parties aren't planned - they're discovered!
      </Animated.Text>
      <Animated.Text
        style={styles.subtitle}
        entering={FadeInDown.duration(400).delay(400)}
      >
        With Gde je After, find the hottest parties near you and keep the night
        alive!
      </Animated.Text>
      <Animated.View entering={FadeInDown.duration(400).delay(600)}>
        <Button
          title="Discover parties"
          onPress={handlePress}
          color="secondary"
        />
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    padding: 30,
    paddingBottom: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
  },
});
