import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import UserLocation from './UserLocation';
import { useAuth } from '@/context/AuthProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useParties } from '@/hooks/useParties';
import PartyMarker from './PartyMarker';
import { AnimatedMapView } from 'react-native-maps/lib/MapView';

const Map = () => {
    const { user } = useAuth();
    const { mapRef } = useGlobalContext();
    const { parties, loading } = useParties();

    const renderMarkers = () => {
        return parties.map((party, index) => (
            <PartyMarker key={party._id} party={party} index={index} />
        ))
    }


    return (
        <MapView
            ref={mapRef}
            style={styles.container}
            initialRegion={user?.currentLocation}
            userInterfaceStyle="dark"
            loadingEnabled
            loadingIndicatorColor='#666666'
            loadingBackgroundColor='#333333'
        >
            <UserLocation location={user?.currentLocation} />
            {renderMarkers()}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
})