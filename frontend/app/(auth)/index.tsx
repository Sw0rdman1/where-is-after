import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button/Button'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const BACKGROUND_IMAGE = require('../../assets/images/auth/background.jpg')

const WelcomeScreen = () => {
    const handlePress = () => {
        router.push('/(auth)/log-in')
    }

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Image
                style={styles.backgroundImage}
                source={BACKGROUND_IMAGE}
            />
            <View style={styles.buttonContainer}>
                <Text style={styles.title}>
                    The best parties aren't planned - they're discovered!
                </Text>
                <Text style={styles.subtitle}>
                    With Gde je After, find the hottest parties near you and keep the night alive!
                </Text>
                <Button
                    title='Discover parties'
                    onPress={handlePress}
                    color='secondary'
                />
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,

    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        paddingHorizontal: 30,
    },
    button: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    outlineButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
})