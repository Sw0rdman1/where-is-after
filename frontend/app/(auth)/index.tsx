import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={require('../../assets/images/background3.jpg')}
            />
            <View style={styles.buttonContainer}>
                <Text style={styles.title}>
                    The best parties aren't planned - they're discovered!
                </Text>
                <Text style={styles.subtitle}>
                    With Gde je After, find the hottest parties near you and keep the night alive!
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Explore parties
                    </Text>
                </TouchableOpacity>
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
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 60,
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