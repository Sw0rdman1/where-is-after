import React, { useEffect, useRef } from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
    index: number;
    rating: number;
    interactive?: boolean;
    onRate?: (rating: number) => void;
    tint: string;
    userRating: number | null;
};

const Star: React.FC<Props> = ({
    index,
    rating,
    interactive = false,
    onRate,
    tint,
    userRating,
}) => {
    const scale = useRef(new Animated.Value(1)).current;
    const color = useRef(new Animated.Value(0)).current;

    const isFilled = index + 1 <= Math.floor(rating);
    const isHalf = index + 1 - rating > 0 && index < rating;
    const iconName = isFilled ? 'star' : isHalf ? 'star-half-empty' : 'star-o';

    useEffect(() => {
        if (userRating !== null) {
            const active = index < userRating;
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(scale, {
                        toValue: 1.4,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scale, {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(color, {
                    toValue: active ? 1 : 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    }, [userRating]);

    const animatedColor = color.interpolate({
        inputRange: [0, 1],
        outputRange: ['#999', tint],
    });

    return (
        <Pressable onPress={() => interactive && onRate?.(index + 1)} disabled={!interactive}>
            <Animated.View style={[styles.star, { transform: [{ scale }] }]}>
                <Animated.Text style={{ color: interactive ? animatedColor : '#999' }}>
                    <FontAwesome
                        name={iconName as any}
                        size={25}
                    />
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
};

export default Star;

const styles = StyleSheet.create({
    star: {
        marginHorizontal: 5,
    },
});
