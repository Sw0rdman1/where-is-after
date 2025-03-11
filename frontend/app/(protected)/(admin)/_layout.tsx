import { Stack } from "expo-router";

export default function AdminLayout() {

    return (
        <Stack
            screenOptions={{
                headerTitleStyle: {
                    fontSize: 24,
                    fontWeight: 'bold',
                },
                headerTitle: 'Admin Panel',
                headerStyle: {
                    backgroundColor: '#007BFF',
                },
                headerTintColor: '#fff',
            }}
        >

            <Stack.Screen name="index" />
        </Stack>
    )
}