import ModalBackButton from '@/components/Button/ModalBackButton';
import { ImageSlider } from '@/components/Image/ImageSlider';
import { Text, View } from '@/components/Themed';
import Title from '@/components/Typography/Title';
import { useVenue } from '@/hooks/useVenues';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native'

const VenueScreen = () => {
    const { venueId } = useLocalSearchParams();
    const { venue, loading } = useVenue(venueId as string);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        )
    }

    if (!venue) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Venue not found</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ModalBackButton top={16} left={16} />
            <ImageSlider images={[venue.logo, ...venue.images]} />
            <View style={styles.textContainer}>
                <Title text={venue.name} />
            </View>
        </View>
    )
}

export default VenueScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1,
        padding: 12,
    },
})