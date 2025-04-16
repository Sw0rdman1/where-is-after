import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "../Themed";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useColors } from "@/hooks/useColors";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useGlobalContext } from "@/context/GlobalProvider";
import { useAuth } from "@/context/AuthProvider";
import { BlurView } from "expo-blur";

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
    const tabWidth = state.routes.length * 70;
    const { tint, surface, text } = useColors();
    const { mapRef } = useGlobalContext();
    const { user } = useAuth();

    const renderIcon = (routeName: string, isFocused: boolean) => {
        switch (routeName) {
            case "index":
                return <FontAwesome name={user?.role === 'user' ? "map" : 'list-alt'} size={24} color={isFocused ? tint : text} />;
            case "list":
                return <FontAwesome name="list" size={24} color={isFocused ? tint : text} />;
            case "profile":
                return <FontAwesome name="user" size={24} color={isFocused ? tint : text} />;
            default:
                return <FontAwesome name="home" size={24} color={isFocused ? tint : text} />;
        }
    };

    const navigateToUserLocation = () => {
        if (!user?.currentLocation) return;
        mapRef?.current?.animateToRegion(user?.currentLocation, 1000);
    };

    return (
        <BlurView
            intensity={100}
            tint="dark"
            style={{
                flexDirection: "row",
                borderRadius: 70,
                margin: 10,
                position: "absolute",
                bottom: 30,
                shadowColor: text,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                alignSelf: "center",
                width: tabWidth,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: 'gray',
            }}
        >
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    } else if (route.name === "index") {
                        navigateToUserLocation()
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: isFocused ? text : "transparent",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {renderIcon(route.name, isFocused)}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </BlurView>
    );
};

export default CustomTabBar;
