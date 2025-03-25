import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import MapView from 'react-native-maps';
import { useAuth } from '@/context/AuthProvider';
import { useGlobalContext } from '@/context/GlobalProvider';


export default function MapScreen() {
    const { user } = useAuth();
    const { mapRef } = useGlobalContext();

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
