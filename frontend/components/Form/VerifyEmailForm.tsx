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


const VerifyEmailForm = () => {
    const { user } = useAuth();
    const { link } = useColors();

    const initialValues = {
        userId: user?._id || "",
        verificationCode: new Array(6).fill(''),
    };

    const resendMailHandler = async () => {
        try {
            const data = await sendVerificationCode(user?.email || "");
            console.log(data);

        } catch (error) {
            console.error("Resend email failed", error);
        }
    }

    const onSubmitHandler = async (values: typeof initialValues) => {
        try {
            await verifyUser(values.userId, values.verificationCode.join(''));
        } catch (error) {
            console.error("Verification email failed", error);
        }
    };


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
                            setCode={(code) => formik.setFieldValue("verificationCode", code)}
                            submitCode={onSubmitHandler}
                        />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.resendContainer}>
                        <Text style={styles.subtitle}>
                            Didn't receive the code?
                        </Text>
                        <TouchableOpacity onPress={resendMailHandler}>
                            <Text style={[styles.subtitle, { fontWeight: "bold", color: link, fontSize: 18 }]}>
                                Resend
                            </Text>
                        </TouchableOpacity>

                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(800).duration(400)}>
                        <View style={styles.buttonContainer}>
                            <Button
                                disabled={
                                    Object.keys(formik.errors).length > 0 ||
                                    Object.keys(formik.touched).length === 0
                                }
                                onPress={formik.handleSubmit}
                                title="Verify"
                            />
                        </View>
                    </Animated.View>
                </BlurView>
            )}
        </Formik>
    );
};

export default VerifyEmailForm;

const styles = StyleSheet.create({
    container: {
        width: "95%",
        zIndex: 1,
        paddingHorizontal: 10,
        paddingVertical: 40,
        gap: 35,
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
    },
    buttonContainer: {
        marginTop: 10,
        marginHorizontal: 20,
    },

});
