import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import UserLocation from './UserLocation';
import { useAuth } from '@/context/AuthProvider';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useParties } from '@/hooks/useParties';
import PartyMarkers from './PartyMarkers';

const Map = () => {
    const { user } = useAuth();
    const { mapRef } = useGlobalContext();
    const { parties, loading } = useParties(10000, '2025-03-25');

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <MapView
            ref={mapRef}
            style={styles.container}
            initialRegion={user?.currentLocation}
            userInterfaceStyle="dark"
        >
            <UserLocation location={user?.currentLocation} />
            <PartyMarkers parties={parties} />
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