import ModalBackButton from '@/components/Button/ModalBackButton';
import OpenInMapsButton from '@/components/Button/OpenMapsButton';
import ShareButton from '@/components/Button/ShareButton';
import { SocialButtons } from '@/components/Button/SocialMediaButtons';
import { ImageSlider } from '@/components/Image/ImageSlider';
import { ScrollView, Text, View } from '@/components/Themed';
import Title from '@/components/Typography/Title';
import { useColors } from '@/hooks/useColors';
import { useVenue } from '@/hooks/useVenues';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native'

const VenueScreen = () => {
    const { venueId } = useLocalSearchParams();
    const { venue, loading } = useVenue(venueId as string);
    const { text } = useColors();

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
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
            <ModalBackButton top={16} left={16} />
            <ImageSlider images={[venue.logo, ...venue.images]} />
            <View style={styles.textContainer}>
                <Title text={venue.name} />
                <Text style={styles.description}>
                    {venue.description}
                </Text>
                <SocialButtons socials={venue.socials} name={venue.name} />

            </View>

            <OpenInMapsButton
                latitude={venue.location.latitude}
                longitude={venue.location.longitude}
                label={venue.name}
            />
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
})