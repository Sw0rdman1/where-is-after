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

export { getCurrentLocation };