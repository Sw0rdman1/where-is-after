import React, { useState, useRef } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Text } from '../Themed';
import { useColors } from '@/hooks/useColors';
import Star from './Star'; // <- our new reusable component
import { useRatingAPI } from '@/api/ratings';

type Props = {
    averageRating: number;
    numberOfRatings: number;
    venueId: string;
    userScore: number | null;
    setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
};

const StarRating: React.FC<Props> = ({ averageRating, venueId, numberOfRatings, userScore, setShowConfetti }) => {
    const [userRating, setUserRating] = useState<number | null>(userScore);
    const [averageRatingState, setAverageRatingState] = useState(averageRating);
    const [numberOfRatingsState, setNumberOfRatingsState] = useState(numberOfRatings);
    const { tint } = useColors();
    const { createRating, deleteRating } = useRatingAPI();

    const handleRating = async (rating: number) => {
        if (userRating === rating) {
            setUserRating(null);

            const res = await deleteRating(venueId); // call your API to delete the rating

            if (res) {
                setAverageRatingState(res.averageScore);
                setNumberOfRatingsState(res.numberOfRatings);
            }

            return;
        }

        setUserRating(rating);

        if (rating === 5) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
        }

        const res = await createRating(venueId, rating);

        if (res) {
            setAverageRatingState(res.averageScore);
            setNumberOfRatingsState(res.numberOfRatings);
        }

    };

    const displayedRating = userRating ?? averageRatingState;

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}>Ratings:</Text>
                <View style={styles.starRow}>
                    <Text style={styles.rating}>
                        {averageRatingState.toFixed(1)}
                    </Text>
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
                        ({numberOfRatingsState})
                    </Text>
                </View>
            </View>

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
    },
    rating: {
        marginHorizontal: 4,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
