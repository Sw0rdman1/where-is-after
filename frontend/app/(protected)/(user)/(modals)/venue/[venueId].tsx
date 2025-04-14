import ModalBackButton from '@/components/Button/ModalBackButton';
import OpenInMapsButton from '@/components/Button/OpenMapsButton';
import ShareButton from '@/components/Button/ShareButton';
import { SocialButtons } from '@/components/Button/SocialMediaButtons';
import { ImageSlider } from '@/components/Image/ImageSlider';
import PartyMarker from '@/components/Map/PartyMarker';
import VenueMarker from '@/components/Map/VenueMarker';
import { ScrollView, Text, View } from '@/components/Themed';
import Description from '@/components/Typography/Description';
import Title from '@/components/Typography/Title';
import OpenInMaps from '@/components/Venue/OpenInMaps';
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


    return (
        <ScrollView style={styles.container}>
            <StatusBar style="light" />
            <ModalBackButton />
            <ShareButton message={`Check out this venue: ${venue.name}`} title={`Share ${venue.name}`} />
            <ImageSlider images={[venue.logo, ...venue.images]} />
            <View style={styles.venueContainer}>
                <Title text={venue.name} />
                <Description label="About venue" description={venue.description} />
                <StarRating userScore={venue.userRating} averageRating={venue.rating} numberOfRatings={venue.numberOfRatings} venueId={venue._id} />
                <OpenInMaps venue={venue} />
                <SocialButtons socials={venue.socials} name={venue.name} />
            </View>
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

    venueContainer: {
        padding: 12,
        flexGrow: 1,
        gap: 8,
    },


})