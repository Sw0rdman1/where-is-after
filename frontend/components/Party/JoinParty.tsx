import { StyleSheet, View } from 'react-native'
import React from 'react'
import Button from '../Button/Button'
import { Text } from '../Themed'

const JoinParty = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Join party 🔥" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Few places left
                </Text>
            </View>
        </View>
    )
}

export default JoinParty

const styles = StyleSheet.create({
    container: {
        paddingBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    textContainer: {
        flex: 2,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    buttonContainer: {
        flex: 3,
        justifyContent: "flex-end",
    },
})