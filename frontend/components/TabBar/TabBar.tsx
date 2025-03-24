import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "../Themed";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useColors } from "@/hooks/useColors";

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const tabWidth = state.routes.length * 70;
    const { tint, background, surface, text } = useColors();

    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: surface,
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
                            <Ionicons
                                name={route.name === "index" ? "home" : "settings"}
                                size={24}
                                color={isFocused ? tint : text}
                            />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;
