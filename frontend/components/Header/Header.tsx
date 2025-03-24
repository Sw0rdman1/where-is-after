import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "../Image/Avatar";
import { useColors } from "@/hooks/useColors";
import { BlurView } from "expo-blur";


const Header = () => {
    const { user } = useAuth();
    const { top } = useSafeAreaInsets();
    const { tint } = useColors();

    return (
        <BlurView style={[styles.container, { paddingTop: top + 5 }]} intensity={20} tint='dark'>
            <Text style={[styles.title, { color: tint }]}>Gde je After?</Text>
            <Avatar source={user?.profileImage} size={35} />
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
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        fontFamily: "PermanentMarker",
    },
});

export default Header;
