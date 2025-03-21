import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useAuth } from "@/context/AuthProvider";
import { registrationValidation } from "@/utils/validation";
import { calculateStatus } from "@/utils/helpers";
import Button from "../Button/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import PasswordInput from "../InputFields/PasswordInput";
import DisplayNameInput from "../InputFields/DisplayNameInput";
import PasswordValidation from "../InputFields/PasswordValidation";
import { useToast } from "@/context/ToastProvider";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";

interface Props { email: string; }

const RegistrationForm: React.FC<Props> = ({ email }) => {
    const { registrationHandler } = useAuth();
    const { showToast } = useToast();

    const initialValues = {
        email,
        displayName: "",
        password: "",
    };

    const onSubmitHandler = async (values: typeof initialValues) => {
        try {
            const message = await registrationHandler(values.email, values.displayName, values.password);
            showToast({
                message,
                severity: "success",
            });
        } catch (error) {
            console.error("Login failed", error);
        }
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registrationValidation}
            onSubmit={onSubmitHandler}
        >
            {(formik) => (
                <BlurView style={styles.container} intensity={50} tint="dark">
                    <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                        <Text style={styles.title}>Welcome!</Text>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>
                            Looks like you dont have an account yet.
                        </Text>
                        <Text style={styles.subtitle}>
                            Let's create a new account for
                        </Text>
                        <Text style={[styles.subtitle, { fontWeight: "bold" }]}>
                            {email}
                        </Text>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(400)}>
                        <DisplayNameInput
                            onChangeText={formik.handleChange("displayName")}
                            onBlur={formik.handleBlur("displayName")}
                            value={formik.values.displayName}
                            error={formik.errors.displayName}
                            status={calculateStatus(formik.errors.displayName, formik.touched.displayName, formik.values.displayName)}
                        />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(800).duration(400)}>
                        <PasswordInput
                            registration
                            onChangeText={formik.handleChange("password")}
                            onBlur={formik.handleBlur("password")}
                            value={formik.values.password}
                            error={formik.errors.password}
                            status={calculateStatus(formik.errors.password, formik.touched.password, formik.values.password)}
                        />
                        <PasswordValidation password={formik.values.password} />
                    </Animated.View>
                    <TermsAndConditions />
                    <Animated.View entering={FadeInDown.delay(1000).duration(400)} style={styles.buttonContainer}>
                        <Button
                            disabled={
                                Object.keys(formik.errors).length > 0 ||
                                Object.keys(formik.touched).length === 0
                            }
                            onPress={formik.handleSubmit}
                            title="Agree & Register"
                        />
                    </Animated.View>
                </BlurView>
            )}
        </Formik>
    );
};

export default RegistrationForm;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        width: "95%",
        zIndex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 20,
        borderRadius: 20,
        overflow: "hidden",
    },
    title: {
        fontSize: 38,
        fontWeight: "bold",
        marginLeft: 10,
        color: "white",
    },
    subtitleContainer: {
        marginLeft: 10,
        gap: 5,
    },
    subtitle: {
        fontSize: 18,
        color: "white",
    },
    helperText: {
        fontSize: 14,
        color: "white",
        marginLeft: 10,
        marginTop: 10,
    },
    buttonContainer: {
        marginHorizontal: 20,
    },


});
