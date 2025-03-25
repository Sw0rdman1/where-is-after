import Header from "@/components/Header/Header";
import { RoleBasedRedirect } from "@/components/Middleware/middleware";
import TabBar from "@/components/TabBar/TabBar";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function UserLayout() {
    return (
        <RoleBasedRedirect>
            <Tabs
                tabBar={(props) => <TabBar {...props} />}
                screenOptions={{ header: () => <Header /> }}
            >
                <Tabs.Screen name="index" />
                <Tabs.Screen name="list" />
                <Tabs.Screen name="profile" options={{ headerShown: false }} />
            </Tabs>
        </RoleBasedRedirect>
    )
}