import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native'
import { useColors } from '@/hooks/useColors'

const { width: screenWidth } = Dimensions.get('window')
const ONE_LETTER_WIDTH = 20
const TEXT_GAP = screenWidth / 2 // space between the duplicated texts

const Title = ({ text }: { text: string }) => {
    const { tint } = useColors()
    const translateX = useRef(new Animated.Value(0)).current
    const textWidth = text.length * ONE_LETTER_WIDTH
    // const shouldAnimate = textWidth > screenWidth
    const shouldAnimate = false

    useEffect(() => {
        if (!shouldAnimate) return

        const totalWidth = textWidth + TEXT_GAP

        const animate = () => {
            translateX.setValue(0)
            Animated.timing(translateX, {
                toValue: -totalWidth,
                duration: totalWidth * 30, // adjust speed here
                useNativeDriver: true,
            }).start(() => {
                animate() // loop forever
            })
        }

        animate()
    }, [shouldAnimate])

    return (
        <View style={styles.container}>
            {shouldAnimate ? (
                <Animated.View
                    style={{
                        flexDirection: 'row',
                        transform: [{ translateX }],
                        width: (textWidth + TEXT_GAP) * 2,
                    }}
                >
                    <Text style={[styles.title, { color: tint, width: textWidth, marginRight: TEXT_GAP }]}>
                        {text}
                    </Text>
                    <Text style={[styles.title, { color: tint, width: textWidth }]}>
                        {text}
                    </Text>
                </Animated.View>
            ) : (
                <Text
                    style={[styles.title, { color: tint }]}
                    numberOfLines={1}
                >
                    {text}
                </Text>
            )}
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        height: 40,
        marginBottom: 10,
        width: screenWidth,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'PermanentMarker',
    },
})
