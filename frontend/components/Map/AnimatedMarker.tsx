import React, { useCallback, useRef, useEffect, ReactNode } from

    'react';
import { Animated, ViewStyle, View } from 'react-native';

interface AnimatedMarkerProp {
    size?: number;
    children: ReactNode;
    showAnimation?: boolean;
    containerStyle?: ViewStyle | ViewStyle[];
    animatedViewStyle?: ViewStyle | ViewStyle[];
    childrenWrapperStyle?: ViewStyle | ViewStyle[];
}

/**
 *
 * @param size defines the height, width & borderRadius of each view. The container View will plus 20px (animation area).
 * @param showAnimation start or stop the animation.
 * @param containerStyle styles for container view. (1st)
 * @param animatedViewStyle styles for the animated view. (2nd)
 * @param childrenWrapperStyle styles for the animated view containing the children. (3rd)
 * @returns An animated wrapper for markers.
 */

const PulseAnimation = ({
    size,
    showAnimation,
    children,
    containerStyle,
    animatedViewStyle,
    childrenWrapperStyle,
}: AnimatedMarkerProp) => {
    const fadeAnimation = useRef(new Animated.Value(1)).current;
    const pulseAnimation = useRef(new Animated.Value(1)).current;
    const animationArea = 20;

    const startAnimation = useCallback(() => {
        Animated.parallel([
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnimation, {
                        delay: 250,
                        toValue: showAnimation ? 1.5 : 1,
                        duration: 750,
                        useNativeDriver: false,
                    }),
                    Animated.timing(pulseAnimation, {
                        toValue: 1,
                        duration: 750,
                        useNativeDriver: false,
                    }),
                    Animated.timing(pulseAnimation, {
                        toValue: showAnimation ? 1.5 : 1,
                        duration: 250,
                        useNativeDriver: false,
                    }),
                    Animated.timing(fadeAnimation, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                ])
            ),
        ]).start();
    }, [fadeAnimation, pulseAnimation, showAnimation]);

    const stopAnimation = useCallback(() => {
        pulseAnimation.stopAnimation(() => {
            pulseAnimation.setValue(1);
        });
        fadeAnimation.stopAnimation();
    }, [fadeAnimation, pulseAnimation]);

    useEffect(() => {
        if (showAnimation) {
            startAnimation();
        } else {
            stopAnimation();
        }
    }, [showAnimation, startAnimation, stopAnimation]);

    return (
        <View
            style={[
                !!size && {
                    height: size + animationArea,
                    width: size + animationArea,
                    borderRadius: (size + animationArea) / 2,
                },
                {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                containerStyle,
            ]}
        >
            <Animated.View
                style={[
                    !!size && { height: size, width: size, borderRadius: size / 2 },
                    {
                        transform: [
                            {
                                scale: pulseAnimation,
                            },
                        ],
                        backgroundColor: fadeAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                                'rgba(41, 182, 246, 0)',
                                'rgba(41, 182, 246, 0.30)',
                            ],
                        }),
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    animatedViewStyle,
                ]}
            >
                <Animated.View
                    style={[
                        !!size && { height: size, width: size, borderRadius: size / 2 },
                        {
                            transform: [
                                {
                                    scale: pulseAnimation.interpolate({
                                        inputRange: [1, 1.5],
                                        outputRange: [1, 0.67],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                        childrenWrapperStyle,
                    ]}
                >
                    {children}
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default PulseAnimation;