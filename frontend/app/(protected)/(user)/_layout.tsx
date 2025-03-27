import Header from "@/components/Header/Header";
import { RoleBasedRedirect } from "@/components/Middleware/middleware";
import TabBar from "@/components/TabBar/TabBar";
import { Stack } from "expo-router";

export default function UserLayout() {
    return (
        <RoleBasedRedirect>
            <Stack initialRouteName='(tabs)'>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(modals)" options={{ headerShown: false, presentation: 'modal' }} />
            </Stack>
        </RoleBasedRedirect >
    )
}