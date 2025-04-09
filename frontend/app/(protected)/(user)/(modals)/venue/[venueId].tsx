import ModalBackButton from '@/components/Button/ModalBackButton';
import OpenInMapsButton from '@/components/Button/OpenMapsButton';
import ShareButton from '@/components/Button/ShareButton';
import { ImageSlider } from '@/components/Image/ImageSlider';
import { ScrollView, Text, View } from '@/components/Themed';
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

    console.log(venue);


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
            <ModalBackButton top={16} left={16} />
            <ImageSlider images={[venue.logo, ...venue.images]} />
            <View style={styles.textContainer}>
                <Title text={venue.name} />
                <ShareButton
                    message={`Check out this venue: ${venue.name}`}
                    title={`Share ${venue.name}`}
                    buttonLabel="Share Venue"
                />
                <OpenInMapsButton
                    latitude={venue.location.latitude}
                    longitude={venue.location.longitude}
                    label={venue.name}
                />
            </View>

        </ScrollView>
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