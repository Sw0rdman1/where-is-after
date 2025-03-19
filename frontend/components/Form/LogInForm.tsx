import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useAuth } from "@/context/AuthProvider";
import { loginValidation } from "@/utils/validation";
import { calculateStatus } from "@/utils/helpers";
import Button from "../Button/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import EmailInput from "../InputFields/EmailInput";
import PasswordInput from "../InputFields/PasswordInput";
import { Image } from "expo-image";

interface Props {
  email: string;
}

const LogInForm: React.FC<Props> = ({ email }) => {
  const initialValues = {
    email,
    password: "",
  };
  const { login } = useAuth();

  const onSubmitHandler = async (values: typeof initialValues) => {
    try {
      login(values.email, values.password);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleFormSwitch = () => {
    router.replace("/(auth)/register");
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={(values) => {
        onSubmitHandler(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <BlurView style={styles.container} intensity={50} tint="dark">
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <Text style={styles.title}>Welcome Back!</Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(400).duration(400)}>
            <View style={styles.userProfileContainer}>
              <Image
                source={{
                  uri: "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
                }}
                style={styles.userProfileImage}
              />
              <View style={styles.userProfileTextContainer}>
                <Text style={styles.name}>Bozidar Vujasinovic</Text>
                <Text style={styles.email}>{email}</Text>
              </View>
            </View>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(600).duration(400)}>
            <PasswordInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
              status={calculateStatus(
                errors.password,
                touched.password,
                values.password
              )}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(800).duration(400)}>
            <View style={styles.buttonContainer}>
              <Button
                disabled={
                  Object.keys(errors).length > 0 ||
                  Object.keys(touched).length === 0
                }
                onPress={handleSubmit}
                title="Log In"
              />
            </View>
            <View style={styles.switchFormContainer}>
              <Text style={styles.switchFormText}>
                You don't have an account?
              </Text>
              <TouchableOpacity onPress={handleFormSwitch} activeOpacity={0.7}>
                <Text style={[styles.switchFormText, { color: "#8be9fd" }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </BlurView>
      )}
    </Formik>
  );
};

export default LogInForm;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
    gap: 25,
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  switchFormContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  switchFormText: {
    fontSize: 16,
    fontWeight: "700",
  },
  userProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userProfileTextContainer: {
    flexDirection: "column",
    gap: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  email: {
    fontSize: 16,
    color: "white",
  },
});
