import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';
import Button from '@/components/Button/Button';

export default function VenueScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);


    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        if (scanned) { return }

        setScanned(true);
        setLoading(true);

        try {
            console.log('Scanned data:', data);

            // const res = await axios.post('https://your-api.com/check-entry', { token: data }, {
            //     headers: {
            //         Authorization: `Bearer `, // Replace with your real token
            //     },
            // });

            // Alert.alert('✅ Entry Approved', res.data.message);
        } catch (error) {
            // Alert.alert('❌ Entry Denied', error.response?.data?.message || 'Something went wrong');
        } finally {
            setTimeout(() => {
                setLoading(false);
                setScanned(false)
            }, 2000);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={handleBarCodeScanned}
            />

            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.loadingText}>Checking entry...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
        fontSize: 18,
    },

    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
