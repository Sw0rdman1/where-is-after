import React, { useState, useRef } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Text } from '../Themed';
import { useColors } from '@/hooks/useColors';
import ConfettiCannon from 'react-native-confetti-cannon';
import Star from './Star'; // <- our new reusable component

type Props = {
    averageRating: number;
    onRate?: (rating: number) => void;
};

const StarRating: React.FC<Props> = ({ averageRating, onRate }) => {
    const [userRating, setUserRating] = useState<number | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const { tint } = useColors();

    const handleRating = (rating: number) => {
        setUserRating(rating);
        onRate?.(rating);
        if (rating === 5) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
        }
    };

    const displayedRating = userRating ?? averageRating;

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}>Ratings:</Text>
                <View style={styles.starRow}>
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            index={index}
                            rating={displayedRating}
                            interactive
                            onRate={handleRating}
                            tint={tint}
                            userRating={userRating}
                        />
                    ))}
                    <Text style={styles.rating}>
                        ({averageRating.toFixed(1)})
                    </Text>
                </View>
            </View>
            {showConfetti && (
                <ConfettiCannon count={80} origin={{ x: 0, y: 0 }} fadeOut fallSpeed={3000} />
            )}
        </>
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
    rating: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});
