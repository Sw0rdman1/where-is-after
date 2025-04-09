import { Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { View } from "@/components/Themed";
import VerifyEmailForm from "@/components/Form/VerifyEmailForm";

const VerifyEmailScreen = () => {

    return (
        <View style={styles.container}>
            <VerifyEmailForm />
        </View>
    );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
});
