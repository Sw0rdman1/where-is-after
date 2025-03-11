import { Stack } from "expo-router";

export default function UserLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: 'bold',
                },
                headerTitle: 'Admin Panel',
                headerStyle: {
                    backgroundColor: 'green',
                },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}