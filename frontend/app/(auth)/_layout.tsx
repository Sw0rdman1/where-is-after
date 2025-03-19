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

        if (user?.role === 'user') {
            router.replace('/(protected)/(user)');
        }

        if (user?.role === 'admin') {
            router.replace('/(protected)/(admin)');
        }
    }, [user]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack >
    )
}