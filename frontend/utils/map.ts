import { Dimensions } from "react-native";
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

export { getCurrentLocation, convertVenueLocationToRegion, calculateTextWidth };