import { ProtectedRoute } from "@/components/Middleware/middleware";
import { Stack } from "expo-router";

export default function ProtectedLayoutr() {
    console.log('Protected Layout');

    return (
        <ProtectedRoute>
            <Stack initialRouteName='(tabs)'>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(modals)" options={{ headerShown: false, presentation: 'modal' }} />
            </Stack>
        </ProtectedRoute>
    )
}