import ModalBackButton from '@/components/Button/ModalBackButton';
import OpenInMapsButton from '@/components/Button/OpenMapsButton';
import ShareButton from '@/components/Button/ShareButton';
import { SocialButtons } from '@/components/Button/SocialMediaButtons';
import { ImageSlider } from '@/components/Image/ImageSlider';
import PartyMarker from '@/components/Map/PartyMarker';
import VenueMarker from '@/components/Map/VenueMarker';
import { ScrollView, Text, View } from '@/components/Themed';
import Title from '@/components/Typography/Title';
import StarRating from '@/components/Venue/StarRating';
import { useColors } from '@/hooks/useColors';
import { useVenue } from '@/hooks/useVenues';
import { handleOpenMaps } from '@/utils/map';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps';

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

    const coords = `${venue.location.latitude},${venue.location.longitude}`;
    const encodedLabel = encodeURIComponent(venue.name || "Selected Location");


    return (
        <ScrollView style={styles.container}  >
            <StatusBar style="light" />
            <ModalBackButton />
            <ShareButton message={`Check out this venue: ${venue.name}`} title={`Share ${venue.name}`} />
            <ImageSlider images={[venue.logo, ...venue.images]} />
            <View style={styles.textContainer}>
                <Title text={venue.name} />
                <Text style={styles.description}>
                    {venue.description}
                </Text>
                <StarRating averageRating={4.3} onRate={(rating) => console.log('Rated:', rating)} />
                <SocialButtons socials={venue.socials} name={venue.name} />
            </View>
            <TouchableOpacity onPress={() => handleOpenMaps(coords, encodedLabel)}>
                <MapView
                    style={styles.map}
                    initialRegion={venue.location}
                    userInterfaceStyle="dark"
                    scrollEnabled={false}
                    zoomEnabled={false}
                    pitchEnabled={false}
                    rotateEnabled={false}
                    pointerEvents="none"
                >
                    <VenueMarker key={venue._id} venue={venue} />
                </MapView>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default VenueScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        paddingBottom: 32
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 20,
        marginTop: 8,
        lineHeight: 24,
        fontStyle: "italic",
        marginBottom: 8,
    },
    textContainer: {
        padding: 12,
        flexGrow: 1,
        gap: 16,
    },
    map: {
        width: "100%",
        height: 150,
        borderRadius: 16,
        marginTop: 15,
        marginVertical: 10,
    },
})