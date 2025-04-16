import ModalBackButton from '@/components/Button/ModalBackButton';
import ShareButton from '@/components/Button/ShareButton';
import { SocialButtons } from '@/components/Button/SocialMediaButtons';
import NotFound from '@/components/Error/NotFound';
import { ImageSlider } from '@/components/Image/ImageSlider';
import LoadingScreen from '@/components/Loading/LoadingScreen';
import { ScrollView, View } from '@/components/Themed';
import Title from '@/components/Typography/Title';
import OpenInMaps from '@/components/Venue/OpenInMaps';
import StarRating from '@/components/Venue/StarRating';
import VenueInformations from '@/components/Venue/VenueInformations';
import { useVenue } from '@/hooks/useVenues';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon';

const VenueScreen = () => {
    const { venueId } = useLocalSearchParams();
    const { venue, loading } = useVenue(venueId as string);
    const [showConfetti, setShowConfetti] = useState(false);

    if (loading) return <LoadingScreen title="Loading venue" />;

    if (!venue) return <NotFound />

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ModalBackButton />
            <ShareButton message={`Check out this venue: ${venue.name}`} title={`Share ${venue.name}`} />
            <ImageSlider images={[venue.logo, ...venue.images]} />
            <ScrollView style={styles.venueContainer}>
                <Title text={venue.name} />
                <VenueInformations venue={venue} />
                <OpenInMaps venue={venue} />

                <StarRating setShowConfetti={setShowConfetti} userScore={venue.userRating} averageRating={venue.rating} numberOfRatings={venue.numberOfRatings} venueId={venue._id} />
                <SocialButtons socials={venue.socials} name={venue.name} />
            </ScrollView>
            {showConfetti && (
                <ConfettiCannon count={80} origin={{ x: 0, y: 0 }} fadeOut fallSpeed={3000} />
            )}
        </View>
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