import { RoleBasedRedirect } from "@/components/Middleware/middleware";
import { Stack } from "expo-router";

export default function ModalLayout() {
    return (
        <RoleBasedRedirect>
            <Stack screenOptions={{ headerShown: false, presentation: 'modal' }}>
                <Stack.Screen name="party/[partyId]" />
                <Stack.Screen name="venue/[venueId]" />
            </Stack>
        </RoleBasedRedirect >
    )
}