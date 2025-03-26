import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "../Image/Avatar";
import { useColors } from "@/hooks/useColors";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';


const Header: React.FC<BottomTabHeaderProps> = ({ route }) => {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();
    const { tint, text, error } = useColors();

    const handleLogout = async () => {
        await logout()
    }

    const onPress = () => {
        router.navigate("/profile");
    }


    const renderRightSide = (routeName: string) => {
        switch (routeName) {
            case "index":
                return <Avatar onPress={onPress} source={user?.profileImage} size={45} />

            case "list":
                return (
                    <TouchableOpacity style={[styles.button, { backgroundColor: `${tint}90` }]} >
                        <Ionicons name="filter-sharp" size={22} color={text} />
                    </TouchableOpacity>
                )

            case "profile":
                return (
                    <TouchableOpacity onPress={handleLogout} style={[styles.button, { backgroundColor: error }]}>
                        <Entypo name="log-out" size={22} color={text} />
                    </TouchableOpacity>
                )
            default:
                return null
        }
    }


    return (
        <BlurView intensity={20} tint="dark" style={[styles.container, { paddingTop: top }]} >
            <Text style={[styles.title, { color: tint }]}>Gde je After?</Text>
            {renderRightSide(route.name)}
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "transparent",
        zIndex: 100,
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        fontFamily: "PermanentMarker",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        padding: 10,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Header;
