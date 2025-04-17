import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../Themed'
import { useState } from 'react'
import { useColors } from '@/hooks/useColors'
import Party from '@/models/Party';
import { useJoinPartyButton } from '@/hooks/useJoinPartyButton';

interface JoinPartyProps {
    party: Party
}

const JoinParty: React.FC<JoinPartyProps> = ({ party }) => {
    const [userStatus, setUserStatus] = useState(party.userJoinRequestStatus)
    const { placeholderText } = useColors()

    const { buttonColor, buttonText, textBottom, handleButtonClick } = useJoinPartyButton(userStatus, party._id, setUserStatus)

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: buttonColor }]}
                onPress={handleButtonClick}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
            <Text style={[styles.text, { color: placeholderText }]}>
                {textBottom}
            </Text>
        </View>
    )
}

export default JoinParty

const styles = StyleSheet.create({
    container: {
        paddingBottom: 16,
        flexDirection: "column",
        gap: 5,
    },
    text: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "bold",
    },
    button: {
        width: '100%',
        height: 48,
        borderRadius: 15,
        marginVertical: 5,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
})