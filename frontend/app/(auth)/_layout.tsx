import LoadingScreen from "@/components/Loading/LoadingScreen";
import { useAuth } from "@/context/AuthProvider";
import { router, Slot, Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (user && !user.isVerified) {
            router.replace('/(auth)/verify');
        }

    }, [user]);

    if (isLoading) return <LoadingScreen />;

    return <Slot />

}