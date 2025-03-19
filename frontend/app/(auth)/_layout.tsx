import { useAuth } from "@/context/AuthProvider";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (user && !user.isVerified) {
            return router.replace('/(auth)/verify');
        }

        if (user?.role === 'user') {
            return router.replace('/(protected)/(user)');
        }

        if (user?.role === 'admin') {
            return router.replace('/(protected)/(admin)');
        }
    }, [user]);



    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="verify" />
        </Stack >
    )
}