import { RoleBasedRedirect } from "@/components/Middleware/middleware";
import TabBar from "@/components/TabBar/TabBar";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function UserLayout() {
    return (
        <RoleBasedRedirect>
            <Tabs
                tabBar={(props) => <TabBar {...props} />}
                screenOptions={{ headerShown: false }}
            >
                <Tabs.Screen
                    name="index"
                    options={{ title: 'Home', }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                    }}
                />
            </Tabs>
        </RoleBasedRedirect>
    )
}