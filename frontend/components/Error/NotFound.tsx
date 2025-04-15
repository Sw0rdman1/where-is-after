import { Image } from "expo-image"
import { Text, View } from "../Themed"
import { useColors } from "@/hooks/useColors";
import { StyleSheet } from "react-native";

const ERROR_IMAGE = require("../../assets/images/protected/error.png");

const NotFound = () => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <Image
                source={ERROR_IMAGE}
                style={styles.image}
                contentFit="contain"
            />

            <Text style={[styles.title, { color: tint }]}>
                Oops! There is a problem
            </Text>

            <Text style={styles.subtitle}>
                It seems like what are you looking for does not exist or has been deleted.
            </Text>
        </View>
    )
}

export default NotFound

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        gap: 10,
        paddingTop: 100,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 15,
    },
})