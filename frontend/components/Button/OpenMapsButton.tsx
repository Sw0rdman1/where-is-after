// components/OpenInMapsButton.tsx

import React from 'react';
import { Platform, TouchableOpacity, Text, Linking, Alert, ActionSheetIOS, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

type OpenInMapsButtonProps = {
    latitude: number;
    longitude: number;
    label?: string;
    buttonLabel?: string;
    iconSize?: number;
    color?: string;
};

const OpenInMapsButton: React.FC<OpenInMapsButtonProps> = ({
    latitude,
    longitude,
    label = 'Selected Location',
    buttonLabel = 'Get Directions',
    iconSize = 24,
    color
}) => {
    const { tint, surface } = useColors();
    const defaultColor = color || tint;

    const coords = `${latitude},${longitude}`;
    const encodedLabel = encodeURIComponent(label);

    const openInAppleMaps = () => {
        const url = `http://maps.apple.com/?ll=${coords}&q=${encodedLabel}`;
        Linking.openURL(url).catch(() => Alert.alert('Error', 'Could not open Apple Maps'));
    };

    const openInGoogleMaps = () => {
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

    const handleOpenMaps = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Open in Apple Maps', 'Open in Google Maps'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        openInAppleMaps();
                    } else if (buttonIndex === 2) {
                        openInGoogleMaps();
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

    return (
        <TouchableOpacity
            onPress={handleOpenMaps}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                justifyContent: 'center',
                gap: 8,
                backgroundColor: surface,
                borderRadius: 8,
                marginHorizontal: 16,
            }}
        >
            <Feather name="map-pin" size={iconSize} color={defaultColor} />
            <Text style={{ color: defaultColor, fontSize: 22, fontWeight: 'bold' }}>
                {buttonLabel}
            </Text>
        </TouchableOpacity>
    );
};

export default OpenInMapsButton;
