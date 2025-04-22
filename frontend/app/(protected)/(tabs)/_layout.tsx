import Header from "@/components/Header/Header";
import TabBar from "@/components/TabBar/TabBar";
import { useAuth } from "@/context/AuthProvider";
import { Tabs } from "expo-router";

const COMMON_TABS = [
    { name: "index", options: { title: "Home" } },
    { name: "list", options: { title: "List" } },
    { name: "profile", options: { title: "Profile" } },
];

const ROLE_TABS = {
    admin: [],
    user: [],
    venue: [{ name: "scan", options: { title: "Scan code" } }]
};

export default function TabLayout() {
    const { user } = useAuth();

    const roleTabs = user?.role ? ROLE_TABS[user.role] : [];

    const tabsToShow = [...roleTabs, ...COMMON_TABS,];

    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{ header: (props) => <Header {...props} /> }}
        >
            {tabsToShow.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={tab.options}
                />
            ))}

        </Tabs>
    )
}