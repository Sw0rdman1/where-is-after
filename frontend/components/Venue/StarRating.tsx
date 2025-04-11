import React, { useState, useRef } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    Animated,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '../Themed';
import { useColors } from '@/hooks/useColors';

type Props = {
    averageRating: number; // e.g., 4.2
    onRate?: (rating: number) => void;
};

const StarRating: React.FC<Props> = ({ averageRating, onRate }) => {
    const [userRating, setUserRating] = useState<number | null>(null);
    const scaleAnimations = useRef<Animated.Value[]>([]).current;
    const { tint } = useColors();

    if (scaleAnimations.length === 0) {
        for (let i = 0; i < 5; i++) {
            scaleAnimations.push(new Animated.Value(1));
        }
    }

    const handleRating = (rating: number) => {
        setUserRating(rating);
        onRate?.(rating);

        // Animate stars
        for (let i = 0; i < rating; i++) {
            Animated.sequence([
                Animated.timing(scaleAnimations[i], {
                    toValue: 1.4,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnimations[i], {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const renderStars = (
        rating: number,
        interactive: boolean
    ) => {
        return [...Array(5)].map((_, index) => {
            const filled = index + 1 <= Math.floor(rating);
            const half = index + 1 - rating > 0 && index < rating;
            const iconName = filled
                ? 'star'
                : half
                    ? 'star-half-empty'
                    : 'star-o';

            const scaleStyle = {
                transform: [{ scale: scaleAnimations[index] }],
            };

            return (
                <Pressable
                    key={index}
                    onPress={() => interactive && handleRating(index + 1)}
                    disabled={!interactive}
                >
                    <Animated.View style={interactive ? scaleStyle : undefined}>
                        <FontAwesome
                            name={iconName as any}
                            size={25}
                            color={interactive ? (userRating ? tint : 'white') : '#999'}
                            style={styles.star}
                        />
                    </Animated.View>
                </Pressable>
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ratings:</Text>
            <View style={styles.starRow}>
                {renderStars(userRating ?? averageRating, true)}
                <Text style={styles.rating}>
                    {`(${averageRating})`}
                </Text>
            </View>
        </View>
    );
};

export default StarRating;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    star: {
        marginHorizontal: 5,
    },
    rating: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});
