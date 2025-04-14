import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../Themed'
import { handleOpenMaps } from '@/utils/map'
import MapView from 'react-native-maps'
import Venue from '@/models/Venue'
import VenueMarker from '../Map/VenueMarker'

interface Props {
    venue: Venue
}

const OpenInMaps: React.FC<Props> = ({ venue }) => {
    const coords = `${venue.location.latitude},${venue.location.longitude}`;
    const encodedLabel = encodeURIComponent(venue.name || "Selected Location");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Location</Text>
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
        </View>
    )
}

export default OpenInMaps

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    map: {
        width: "100%",
        height: 150,
        borderRadius: 16,
        marginTop: 15,
        marginVertical: 10,
    },
})