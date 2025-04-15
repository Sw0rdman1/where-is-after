import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useColors } from '@/hooks/useColors'
import { router } from 'expo-router'
import { BUTTON_MODAL_SIZE, BUTTON_MODAL_TOP } from './common'

const ModalBackButton = ({ top, left }: { top?: number, left?: number }) => {
    const { background, tint } = useColors()

    const handleBack = () => {
        router.back()
    }
    return (
        <TouchableOpacity
            style={[styles.backButton, { backgroundColor: background, top: top || BUTTON_MODAL_TOP, left: left || 14 }]}
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
        height: BUTTON_MODAL_SIZE,
        width: BUTTON_MODAL_SIZE,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
})