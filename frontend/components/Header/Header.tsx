import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "../Image/Avatar";
import { useColors } from "@/hooks/useColors";
import { BlurView } from "expo-blur";
import { router } from "expo-router";


const Header = () => {
    const { user } = useAuth();
    const { top } = useSafeAreaInsets();
    const { tint } = useColors();

    const onPress = () => {
        router.navigate("/profile");
    }

    return (
        <BlurView intensity={20} tint="dark" style={[styles.container, { paddingTop: top }]} >
            <Text style={[styles.title, { color: tint }]}>Gde je After?</Text>
            <Avatar onPress={onPress} source={user?.profileImage} size={45} />
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
});

export default Header;
