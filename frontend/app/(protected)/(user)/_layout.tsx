import { RoleBasedRedirect } from "@/components/Middleware/middleware";
import { Stack } from "expo-router";

export default function UserLayout() {
    return (
        <RoleBasedRedirect>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </RoleBasedRedirect>
    )
}