import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useAuth } from "@/context/AuthProvider";
import { verifyEmailValidation } from "@/utils/validation";
import Button from "../Button/Button";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { sendVerificationCode, verifyUser } from "@/api/auth";
import VerificationCodeInput from "../InputFields/VerificationCodeInput";
import { useColors } from "@/hooks/useColors";
import { useToast } from "@/context/ToastProvider";
import { router } from "expo-router";


const VerifyEmailForm = () => {
    const { user, logout } = useAuth();
    const { link } = useColors();
    const { showToast } = useToast();

    const initialValues = {
        userId: user?._id || "",
        verificationCode: new Array(6).fill(''),
    };

    const resendMailHandler = async () => {
        try {
            const data = await sendVerificationCode(user?.email || "");
            showToast({ message: data.message, severity: "success" });
        } catch (error) {
            console.error("Resend email failed", error);
        }
    }

    const onSubmitHandler = async (values: typeof initialValues) => {
        try {
            const data = await verifyUser(values.userId, values.verificationCode.join(''));
            await logout()
            showToast({ message: data.message, severity: "success" });
        } catch (error: any) {
            showToast({ message: error.message, severity: "error" });
        }
    };

    const signOutHandler = async () => {
        try {
            await logout();
        } catch (error) {
            showToast({ message: "Error loging out", severity: "error" });
        }
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={verifyEmailValidation}
            onSubmit={onSubmitHandler}
        >
            {(formik) => (
                <BlurView style={styles.container} intensity={50} tint="dark">
                    <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                        <Text style={styles.title}>Verify your account</Text>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>
                            Looks like you didn't verify your account yet.
                        </Text>
                        <Text style={styles.subtitle}>
                            Please enter the verification code sent to
                        </Text>
                        <Text style={[styles.subtitle, { fontWeight: "bold" }]}>
                            {user?.email}
                        </Text>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(400)}>
                        <VerificationCodeInput
                            userId={formik.values.userId}
                            code={formik.values.verificationCode}
                            setCode={(code) => {
                                formik.setFieldValue("verificationCode", code)
                            }}
                            submitCode={onSubmitHandler}
                        />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.resendContainer}>
                        <Text style={styles.subtitle}>
                            Didn't receive the code?
                        </Text>
                        <TouchableOpacity onPress={() => {
                            resendMailHandler()
                            formik.values.verificationCode = new Array(6).fill('')
                        }}>
                            <Text style={[styles.subtitle, { fontWeight: "bold", color: link, fontSize: 18 }]}>
                                Resend
                            </Text>
                        </TouchableOpacity>

                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(800).duration(400)}>
                        <View style={styles.buttonContainer}>
                            <Button
                                disabled={
                                    Object.keys(formik.errors).length > 0
                                }
                                onPress={formik.handleSubmit}
                                title="Verify"
                            />
                        </View>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(1000).duration(400)}>
                        <View style={styles.notYourAccountContainer}>
                            <Text style={styles.subtitle}>
                                Not your account?
                            </Text>
                            <TouchableOpacity onPress={signOutHandler}>
                                <Text style={[styles.subtitle, { fontWeight: "bold", color: link, fontSize: 18 }]}>
                                    Sign out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </BlurView>
            )
            }
        </Formik >
    );
};

export default VerifyEmailForm;

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
        fontSize: 32,
        fontWeight: "bold",
        marginLeft: 10,
        color: "white",
    },
    subtitleContainer: {
        marginLeft: 10,
        gap: 5,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "white",
    },
    resendContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 5,
        marginTop: 10,
    },
    buttonContainer: {
        marginHorizontal: 20,
    },
    notYourAccountContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 5,
    },

});
