import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ presentation: "modal" }} />
            <Stack.Screen name="log-in" />
            <Stack.Screen name="register" />
        </Stack >
    )
}