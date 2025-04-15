import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../Themed'
import { useState } from 'react'
import { useColors } from '@/hooks/useColors'
import { usePartyAPI } from '@/api/parties';
import Party from '@/models/Party';
import { useAuth } from '@/context/AuthProvider';

interface JoinPartyProps {
    party: Party
}

const JoinParty: React.FC<JoinPartyProps> = ({ party }) => {
    const [isUserGoingState, setIsUserGoingState] = useState(party.isUserGoing)
    const { tint, error } = useColors()
    const { joinParty, leaveParty } = usePartyAPI()

    const handleButtonClick = async () => {
        if (isUserGoingState) {
            const res = await leaveParty(party._id)
            if (res) {
                setIsUserGoingState(false)
            }
        } else {
            const res = await joinParty(party._id)
            if (res) {
                setIsUserGoingState(true)
            }
        }
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
                {isUserGoingState ?
                    <Text style={styles.text}>You are all set 🚀 </Text> :
                    <Text style={styles.text}>
                        <Text style={{ color: tint }}>{14} </Text>
                        places left 🎉
                    </Text>
                }
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