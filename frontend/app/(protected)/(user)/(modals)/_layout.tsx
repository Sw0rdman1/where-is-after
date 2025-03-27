import { RoleBasedRedirect } from "@/components/Middleware/middleware";
import { Stack } from "expo-router";

export default function ModalLayout() {
    return (
        <RoleBasedRedirect>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="party/[partyId]" />
            </Stack>
        </RoleBasedRedirect >
    )
}