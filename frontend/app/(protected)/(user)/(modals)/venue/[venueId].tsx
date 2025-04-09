import { ImageSlider } from '@/components/Image/ImageSlider';
import { Text, View } from '@/components/Themed';
import { useVenue } from '@/hooks/useVenues';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native'

const VenueScreen = () => {
    const { venueId } = useLocalSearchParams();
    const { venue, loading } = useVenue(venueId as string);
    const venueImages = [venue.logo, ...venue.images];

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <ImageSlider images={venueImages} />
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
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})