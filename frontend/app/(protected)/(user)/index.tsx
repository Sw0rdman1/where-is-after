import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import MapView from 'react-native-maps';
import { useAuth } from '@/context/AuthProvider';

const BELGRADE = {
    latitude: 44.7866,
    longitude: 20.4489,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

export default function MainScreen() {
    const { user } = useAuth();

    return (
        <View style={[styles.container]}>
            <MapView
                style={styles.map}
                initialRegion={user?.currentLocation || BELGRADE}
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
