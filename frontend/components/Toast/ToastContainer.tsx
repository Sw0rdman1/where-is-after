import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export const TOAST_DURATION = 3000;

interface ToastContainerProps {
    toasts: { id: string; message: string; severity: 'success' | 'error' | 'info' }[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
    return (
        <View style={styles.container}>
            {toasts.map((toast) => (
                <Toast key={toast.id} message={toast.message} severity={toast.severity} />
            ))}
        </View>
    );
};

const Toast: React.FC<{ message: string; severity?: 'success' | 'error' | 'info' }> = ({ message, severity = 'info' }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-50)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const progressWidth = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: TOAST_DURATION / 10,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: TOAST_DURATION / 10,
                    useNativeDriver: true,
                }),
                Animated.timing(progressWidth, {
                    toValue: 0,
                    duration: TOAST_DURATION,
                    useNativeDriver: false,
                }),
            ]),

            Animated.delay(TOAST_DURATION),

            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: TOAST_DURATION / 10,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 50,
                    duration: TOAST_DURATION / 10,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    const severityMap = {
        success: { icon: <MaterialCommunityIcons name='check-circle' color='#4CAF50' size={24} />, background: '#4CAF5060' },
        error: { icon: <MaterialCommunityIcons name='alert-circle' color='#F44336' size={24} />, background: '#F4433660' },
        info: { icon: <MaterialCommunityIcons name='information' color='#2196F3' size={24} />, background: '#2196F360' },
    };

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                { opacity, transform: [{ translateY }] },
            ]}
        >
            <View style={[styles.toast, { backgroundColor: severityMap[severity].background }]} >
                <View style={styles.content}>
                    {severityMap[severity].icon}
                    <Text style={styles.text}>{message}</Text>
                </View>
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            width: progressWidth.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    toastContainer: {
        width: '100%',
        overflow: 'hidden',
        borderRadius: 12,
        marginBottom: 10,
    },
    toast: {
        width: '100%',
        padding: 12,
        paddingVertical: 16,
        borderRadius: 12,
        justifyContent: 'center',
    },
    content: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    progressBar: {
        height: 3,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
});

export default ToastContainer;
