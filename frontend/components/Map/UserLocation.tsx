import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import Avatar from '../Image/Avatar';
import { useAuth } from '@/context/AuthProvider';

interface Props {
    location: Region | undefined;
}

const UserLocation: React.FC<Props> = ({ location }) => {
    const { tint, text } = useColors();
    const { user } = useAuth();
    const scaleAnim = useSharedValue(1);
    const opacityAnim = useSharedValue(0.4);

    useEffect(() => {
        scaleAnim.value = withRepeat(
            withTiming(2, { duration: 2000, easing: Easing.ease }),
            -1,
            false
        );
        opacityAnim.value = withRepeat(
            withTiming(0.1, { duration: 2000, easing: Easing.ease }),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleAnim.value }],
            opacity: opacityAnim.value,
        };
    });

    if (!location) {
        return null;
    }

    return (
        <Marker coordinate={location} anchor={{ x: 0.5, y: 0.5 }} onPress={() => { }}>
            <View style={styles.wrapper}>
                <Animated.View style={[styles.pulse, animatedStyle, { backgroundColor: `${tint}` }]} />
                <View style={[styles.markerContainer]}>
                    <Avatar size={30} source={user?.profileImage} />
                </View>
            </View>
        </Marker>
    );
};

export default UserLocation;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pulse: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    calloutContainer: {
        width: 150,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    calloutText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    markerContainer: {
        width: 35,
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
