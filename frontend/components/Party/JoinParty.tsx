import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../Themed'
import { useState } from 'react'
import { useColors } from '@/hooks/useColors'

interface JoinPartyProps {
    isUserGoing: boolean;
    availablePlaces: number;
}

const JoinParty: React.FC<JoinPartyProps> = ({ isUserGoing, availablePlaces }) => {
    const [isUserGoingState, setIsUserGoingState] = useState(isUserGoing)
    const { tint, error } = useColors()

    const handleButtonClick = () => {
        setIsUserGoingState(!isUserGoingState)
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: isUserGoingState ? error : tint }]}
                    onPress={handleButtonClick}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>
                        {isUserGoingState ? "Leave party 😢" : "Join party 🔥"}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {isUserGoingState ? "You are all set 🚀" : `${availablePlaces} places left 🎉`}
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
        width: 80,
    },
    text: {
        textAlign: "center",
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "bold",
    },
    buttonContainer: {
        flex: 2,
        justifyContent: "flex-end",
    },
    button: {
        width: '100%',
        height: 48,
        borderRadius: 15,
        marginVertical: 10,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
})