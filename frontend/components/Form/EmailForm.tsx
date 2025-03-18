import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useAuth } from "@/context/AuthProvider";
import { Text } from "../Themed";
import { emailValidation } from "@/utils/validation";
import { calculateStatus } from "@/utils/helpers";
import Button from "../Button/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import EmailInput from "../InputFields/EmailInput";

const initialValues = {
    email: "",
};


const EmailForm = () => {
    const { login } = useAuth();

    const onSubmitHandler = async (values: typeof initialValues) => {
        try {
            // login(values.email, values.password);
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
            validationSchema={emailValidation}
            onSubmit={(values) => {
                onSubmitHandler(values);
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <BlurView style={styles.container} intensity={50} tint="dark">
                    <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                        <Text style={styles.title}>
                            Hi there!
                        </Text>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                        <Text style={styles.subtitle}>
                            Please enter your email address to continue
                        </Text>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(400)}>
                        <EmailInput
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            error={errors.email}
                            status={calculateStatus(errors.email, touched.email, values.email)}
                        />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(800).duration(400)}>
                        <View style={styles.buttonContainer}>
                            <Button
                                disabled={Object.keys(errors).length > 0 || Object.keys(touched).length === 0}
                                onPress={handleSubmit}
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
        marginTop: 100,
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        marginLeft: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "500",
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