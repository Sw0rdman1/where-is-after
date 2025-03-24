import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "../Image/Avatar";
import { useColors } from "@/hooks/useColors";


const Header = () => {
    const { user } = useAuth();
    const { top } = useSafeAreaInsets();
    const { tint } = useColors();

    return (
        <View style={[styles.container, { paddingTop: top + 20 }]}>
            <Text style={[styles.title, { color: tint }]}>Gde je After?</Text>
            <Avatar source={user?.profileImage} size={35} />
        </View>
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
        marginHorizontal: 20,
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
