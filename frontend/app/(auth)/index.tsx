import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '@/components/Button/Button'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import EmailInput from '@/components/InputFields/EmailInput'
import LogInForm from '@/components/Form/LogInForm'
import { View } from '@/components/Themed'
import AuthContent from '@/components/AuthContent/AuthContent'

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
            <AuthContent />
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },

})