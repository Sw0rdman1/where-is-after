import Header from "@/components/Header/Header";
import { RoleBasedRedirect } from "@/components/Middleware/middleware";
import TabBar from "@/components/TabBar/TabBar";
import { Tabs } from "expo-router";

const COMMON_TABS = [
    { name: "index", options: { title: "Home" } },
    { name: "list", options: { title: "List" } },
    { name: "profile", options: { title: "Profile" } },
];

export default function UserLayout() {

    return (
        <RoleBasedRedirect>
            <Tabs
                tabBar={(props) => <TabBar {...props} />}
                screenOptions={{ header: (props) => <Header {...props} /> }}
            >
                {COMMON_TABS.map((tab) => (
                    <Tabs.Screen
                        key={tab.name}
                        name={tab.name}
                        options={tab.options}
                    />
                ))}

            </Tabs>
        </RoleBasedRedirect>
    )
}