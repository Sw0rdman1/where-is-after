import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import MapView from 'react-native-maps';
import { useAuth } from '@/context/AuthProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useParties } from '@/hooks/useParties';

const BELGRADE = {
    latitude: 44.787197,
    longitude: 20.457273,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

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
            />
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
