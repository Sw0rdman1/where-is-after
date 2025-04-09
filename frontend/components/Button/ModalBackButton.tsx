import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useColors } from '@/hooks/useColors'
import { router } from 'expo-router'

const ModalBackButton = ({ top, left }: { top?: number, left?: number }) => {
    const { background, tint } = useColors()

    const handleBack = () => {
        router.back()
    }
    return (
        <TouchableOpacity
            style={[styles.backButton, { backgroundColor: background, top: top || 10, left: left || 10 }]}
            onPress={handleBack}
        >
            <Ionicons name="chevron-back" size={24} color={tint} />
        </TouchableOpacity>
    )
}

export default ModalBackButton

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        zIndex: 1,
        height: 35,
        width: 35,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
})