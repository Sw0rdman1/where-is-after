import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import MapView from 'react-native-maps';

const BACKGROUND_IMAGE = require("../../../assets/images/auth/bg7.jpg");
const BELGRADE = {
    latitude: 44.7866,
    longitude: 20.4489,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

export default function MainScreen() {

    return (
        <View style={[styles.container]}>
            <MapView
                style={styles.map}
                initialRegion={BELGRADE}
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
