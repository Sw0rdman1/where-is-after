import { ActionSheetIOS, Alert, Dimensions, Linking, Platform } from "react-native";
import { Region } from "react-native-maps";
import * as Location from 'expo-location';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const convertLocationToRegion = (location: Location.LocationObject): Region => {
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };
}

const getCurrentLocation = async (): Promise<Region> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
        const locationData = await Location.getCurrentPositionAsync({});
        return convertLocationToRegion(locationData);
    } else {
        console.warn('Location permission denied');
    }

    return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    };

}

const convertVenueLocationToRegion = (venue: any): Region => {
    return {
        longitude: venue.location.coordinates[0],
        latitude: venue.location.coordinates[1],
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }
}

const TEXT_MIN_WIDTH = 80;

const calculateTextWidth = (text: string, fontSize: number) => {
    const averageCharWidth = fontSize * 0.6;
    const textLength = text.length;
    const width = textLength * averageCharWidth;
    return Math.max(width + 40, TEXT_MIN_WIDTH);
};

const openInAppleMaps = (coords: string, encodedLabel: string) => {
    const url = `http://maps.apple.com/?ll=${coords}&q=${encodedLabel}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Could not open Apple Maps'));
};

const openInGoogleMaps = (coords: string) => {
    const url = `comgooglemaps://?q=${coords}`;
    Linking.canOpenURL(url).then((supported) => {
        if (supported) {
            Linking.openURL(url);
        } else {
            // Fallback to Google Maps web
            const webUrl = `https://www.google.com/maps/search/?api=1&query=${coords}`;
            Linking.openURL(webUrl).catch(() =>
                Alert.alert('Error', 'Could not open Google Maps')
            );
        }
    });
};

const handleOpenMaps = (coords: string, encodedLabel: string) => {
    if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Open in Apple Maps', 'Open in Google Maps'],
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    openInAppleMaps(coords, encodedLabel);
                } else if (buttonIndex === 2) {
                    openInGoogleMaps(coords)
                }
            }
        );
    } else {
        // Android: trigger chooser via geo: URI
        const geoUrl = `geo:${coords}?q=${coords}(${encodedLabel})`;
        Linking.canOpenURL(geoUrl)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(geoUrl);
                } else {
                    // fallback to Google Maps web
                    const webUrl = `https://www.google.com/maps/search/?api=1&query=${coords}`;
                    Linking.openURL(webUrl);
                }
            })
            .catch(() => Alert.alert('Error', 'Could not open map'));
    }
};

export { getCurrentLocation, convertVenueLocationToRegion, calculateTextWidth, handleOpenMaps };