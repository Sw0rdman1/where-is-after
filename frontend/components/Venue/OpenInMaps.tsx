import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../Themed'
import { handleOpenMaps } from '@/utils/map'
import MapView from 'react-native-maps'
import Venue from '@/models/Venue'
import VenueMarker from '../Map/VenueMarker'
import { Ionicons } from '@expo/vector-icons'
import { useColors } from '@/hooks/useColors'

interface Props {
    venue: Venue
}

const OpenInMaps: React.FC<Props> = ({ venue }) => {
    const coords = `${venue.location.latitude},${venue.location.longitude}`;
    const encodedLabel = encodeURIComponent(venue.name || "Selected Location");
    const { tint, surface } = useColors()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Location:</Text>
            <TouchableOpacity style={[styles.adressContainer, { backgroundColor: surface }]} onPress={() => handleOpenMaps(coords, encodedLabel)} >
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
                <Text style={styles.adress}>
                    Bulevar Kralja Aleksandra 73
                </Text>

            </TouchableOpacity>
        </View >
    )
}

export default OpenInMaps

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 25,
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mapContainer: {
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    adressContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 5,
        paddingRight: 10,
        borderRadius: 16,
    },
    adress: {
        fontSize: 18,
        fontWeight: "bold",
    },
    map: {
        height: 50,
        width: 50,
        borderRadius: 16,
    },
})