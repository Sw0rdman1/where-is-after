import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useAuth } from "@/context/AuthProvider";
import { emailValidation } from "@/utils/validation";
import { calculateStatus } from "@/utils/helpers";
import Button from "../Button/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import EmailInput from "../InputFields/EmailInput";
import { useAuthAPI } from "@/api/auth";



interface Props {
  email: string;
  openLoginScreen: (email: string, displayName: string, profileImage: string) => void;
  openRegisterScreen: (email: string) => void;
}

const EmailForm: React.FC<Props> = ({ email, openLoginScreen, openRegisterScreen }) => {
  const initialValues = { email };
  const { checkEmail } = useAuthAPI();

  const onSubmitHandler = async (values: typeof initialValues) => {
    try {
      const data = await checkEmail(values.email);

      if (data.exists) {
        openLoginScreen(values.email, data.displayName, data.profileImage);
      } else {
        openRegisterScreen(values.email);
      }

    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={emailValidation}
      onSubmit={onSubmitHandler}
    >
      {(formik) => (
        <BlurView style={styles.container} intensity={50} tint="dark">
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <Text style={styles.title}>Hi there!</Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(400).duration(400)}>
            <Text style={styles.subtitle}>
              Please enter your email address to be able to find parties near you.
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(600).duration(400)} style={{ width: "100%" }}>
            <EmailInput
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              value={formik.values.email}
              error={formik.errors.email}
              status={calculateStatus(formik.errors.email, formik.touched.email, formik.values.email)}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(400)}>
            <View style={styles.buttonContainer}>
              <Button
                disabled={
                  Object.keys(formik.errors).length > 0
                }
                onPress={formik.handleSubmit}
                title="Continue"
              />
            </View>
          </Animated.View>
        </BlurView>
      )}
    </Formik>
  );
};

export default EmailForm;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
    gap: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 10,
    color: "white",

  },
  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});
