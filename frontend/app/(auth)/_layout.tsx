import { Stack } from "expo-router";

export default function AdminLayout() {
    return (
        <Stack>
            <Stack.Screen name="log-in" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    )
}