import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useAuth } from "@/context/AuthProvider";
import { Text } from "../Themed";
import { loginValidation } from "@/utils/validation";
import { calculateStatus } from "@/utils/helpers";
import Button from "../Button/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import EmailInput from "../InputFields/EmailInput";
import PasswordInput from "../InputFields/PasswordInput";

const initialValues = {
    email: "",
    password: "",
};


const LogInForm = () => {
    const { login } = useAuth();

    const onSubmitHandler = async (values: typeof initialValues) => {
        try {
            login(values.email, values.password);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const handleFormSwitch = () => {
        router.replace("/(auth)/register");
    }
    return (

        <Formik
            initialValues={initialValues}
            validationSchema={loginValidation}
            onSubmit={(values) => {
                onSubmitHandler(values);
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <BlurView style={styles.container} intensity={50} tint="dark">
                    <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                        <Text style={styles.title}>
                            Welcome Back!
                        </Text>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                        <EmailInput
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            error={errors.email}
                            status={calculateStatus(errors.email, touched.email, values.email)}
                        />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(400)}>
                        <PasswordInput
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            error={errors.password}
                            status={calculateStatus(errors.password, touched.password, values.password)}
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
});