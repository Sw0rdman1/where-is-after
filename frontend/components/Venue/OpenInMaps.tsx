import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../Themed'
import { handleOpenMaps } from '@/utils/map'
import MapView from 'react-native-maps'
import Venue from '@/models/Venue'
import VenueMarker from '../Map/VenueMarker'
import { Ionicons } from '@expo/vector-icons'

interface Props {
    venue: Venue
}

const OpenInMaps: React.FC<Props> = ({ venue }) => {
    const coords = `${venue.location.latitude},${venue.location.longitude}`;
    const encodedLabel = encodeURIComponent(venue.name || "Selected Location");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Location</Text>
            <View style={styles.mapContainer}>
                <View style={styles.adressContainer}>
                    <Ionicons name="location-outline" size={24} color="white" />
                    <Text style={{ color: "white", marginLeft: 10 }}>
                        Bulevar Kralja Aleksandra 73, Beograd
                    </Text>
                </View>
                <TouchableOpacity style={styles.map} onPress={() => handleOpenMaps(coords, encodedLabel)}>
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
    adressContainer: {
        flex: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    mapContainer: {
        width: "100%",
        height: 150,
        borderRadius: 16,
        backgroundColor: "#1c1c1e",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        flex: 1,
        borderRadius: 16,
        marginVertical: 5,
    },
})