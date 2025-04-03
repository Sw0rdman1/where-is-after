import { Linking, StyleSheet } from 'react-native'
import { Text, View } from '../Themed'
import { useColors } from '@/hooks/useColors'
import { Image } from 'expo-image'

const ERROR_IMAGE = require("../../assets/images/protected/error.png");

const PartyNotFound = () => {
    const { tint, link } = useColors()

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
                It seems like the party you are looking for does not exist or has been deleted.
            </Text>
        </View>
    )
}

export default PartyNotFound

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