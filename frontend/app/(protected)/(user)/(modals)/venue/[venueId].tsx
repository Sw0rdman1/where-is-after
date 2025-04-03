import { Text, View } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native'

const VenueScreen = () => {
    const { venueId } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Venue ID: {venueId}
            </Text>
        </View>
    )
}

export default VenueScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})