import FilterBottomSheet from "@/components/BottomSheet/FiltersBottomSheet";
import Header from "@/components/Header/Header";
import { RoleBasedRedirect } from "@/components/Middleware/middleware";
import TabBar from "@/components/TabBar/TabBar";
import { Tabs } from "expo-router";
import React from "react";

export default function UserLayout() {
    return (
        <RoleBasedRedirect>
            <React.Fragment>
                <Tabs
                    tabBar={(props) => <TabBar {...props} />}
                    screenOptions={{
                        header: (props) => <Header {...props} />,
                    }}
                >
                    <Tabs.Screen name="index" />
                    <Tabs.Screen name="list" />
                    <Tabs.Screen name="profile" />
                </Tabs>
                <FilterBottomSheet />
            </React.Fragment>
        </RoleBasedRedirect>
    )
}