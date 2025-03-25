import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from '@/context/AuthProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useParties } from '@/hooks/useParties';

export default function MapScreen() {
    const { user } = useAuth();
    const { mapRef } = useGlobalContext();
    const { parties, loading } = useParties(10000, '2025-03-25');

    if (loading) {
        return <View><Text>Loading...</Text></View>;
    }


    return (
        <View style={[styles.container]}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={user?.currentLocation}
                showsMyLocationButton
                showsUserLocation
                userInterfaceStyle="dark"
            >
                {(parties) && parties.map(party => (
                    <Marker
                        key={party._id}
                        coordinate={{
                            latitude: party.venue.location?.latitude,
                            longitude: party.venue.location?.longitude,
                        }}
                        title={party.name}
                        description={party.description}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
