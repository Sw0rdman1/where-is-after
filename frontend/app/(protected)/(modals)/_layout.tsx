import { Stack } from "expo-router";

export default function ModalLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, presentation: 'modal' }}>
            <Stack.Screen name="party/[partyId]" />
            <Stack.Screen name="venue/[venueId]" />
        </Stack>
    )
}