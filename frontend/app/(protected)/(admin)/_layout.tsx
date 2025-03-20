import { RoleBasedRedirect } from "@/components/Middleware/middleware";
import { Stack } from "expo-router";

export default function AdminLayout() {

    return (
        <RoleBasedRedirect>
            <Stack>
                <Stack.Screen name="index" />
            </Stack>
        </RoleBasedRedirect>
    )
}