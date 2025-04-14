import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native'
import { useColors } from '@/hooks/useColors'

const { width: screenWidth } = Dimensions.get('window')

const ONE_LETTER_WIDTH = 20

const Title = ({ text }: { text: string }) => {
    const { tint } = useColors()
    const translateX = useRef(new Animated.Value(0)).current
    const textWidth = text.length * ONE_LETTER_WIDTH
    useEffect(() => {
        if (textWidth === 0 || textWidth <= screenWidth) return

        const overflowWidth = textWidth - screenWidth

        const loop = () => {
            translateX.setValue(30)

            Animated.timing(translateX, {
                toValue: -overflowWidth,
                duration: (screenWidth + overflowWidth) * 5,
                useNativeDriver: true,
            }).start(() => {
                // Instantly jump to right off-screen
                translateX.setValue(30)

                // Animate into view again
                Animated.timing(translateX, {
                    toValue: -overflowWidth,
                    duration: (screenWidth + overflowWidth) * 5,
                    useNativeDriver: true,
                }).start(() => loop())
            })
        }

        loop()
    }, [])

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[
                    styles.title,
                    {
                        color: tint, transform: [{ translateX }], maxWidth: textWidth, width: textWidth
                    },
                ]}
                numberOfLines={1}
            >
                {text}
            </Animated.Text>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        height: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        fontFamily: 'PermanentMarker',
    },
})
