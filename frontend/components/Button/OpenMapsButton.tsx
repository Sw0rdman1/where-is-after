// components/OpenInMapsButton.tsx

import React from 'react';
import { Platform, TouchableOpacity, Text, Linking, Alert, ActionSheetIOS, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { handleOpenMaps } from '@/utils/map';

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



    return (
        <TouchableOpacity
            onPress={() => handleOpenMaps(coords, encodedLabel)}
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
