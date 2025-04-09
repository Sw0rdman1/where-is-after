// components/OpenInMapsButton.tsx

import React from 'react';
import { Platform, TouchableOpacity, Text, Linking, Alert, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

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
    buttonLabel = 'Open in Maps',
    iconSize = 24,
    color = '#007AFF',
}) => {
    const handleOpenMaps = async () => {
        const coords = `${latitude},${longitude}`;
        const mapLabel = encodeURIComponent(label);

        let url = '';
        if (Platform.OS === 'ios') {
            // Apple Maps fallback
            url = `http://maps.apple.com/?ll=${coords}&q=${mapLabel}`;
        } else {
            // Android: trigger chooser
            url = `geo:${coords}?q=${coords}(${mapLabel})`;
        }

        const supported = await Linking.canOpenURL(url);

        if (supported) {
            Linking.openURL(url);
        } else {
            // fallback to Google Maps web
            const webUrl = `https://www.google.com/maps/search/?api=1&query=${coords}`;
            Linking.openURL(webUrl).catch((err) =>
                Alert.alert('Error', 'Cannot open maps.')
            );
        }
    };

    return (
        <TouchableOpacity
            onPress={handleOpenMaps}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                gap: 8,
            }}
        >
            <Feather name="map-pin" size={iconSize} color={color} />
            <Text style={{ color, fontSize: 16 }}>{buttonLabel}</Text>
        </TouchableOpacity>
    );
};

export default OpenInMapsButton;
