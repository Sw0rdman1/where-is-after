import LoadingScreen from "@/components/Loading/LoadingScreen";
import { useAuth } from "@/context/AuthProvider";
import { ImageBackground } from "expo-image";
import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const BACKGROUND_IMAGE = require("../../assets/images/auth/bg7.jpg");


export default function AuthLayout() {
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (user && !user.isVerified) {
            router.replace('/(auth)/verify');
        }

    }, [user]);

    if (isLoading) return <LoadingScreen />;

    return (
        <ImageBackground
            source={BACKGROUND_IMAGE}
            style={styles.background}
        >
            <StatusBar style="light" />
            <View style={styles.overlay}>
                <Slot />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
    },
});