import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../Themed'
import { useState } from 'react'
import { useColors } from '@/hooks/useColors'
import Party, { JoinRequestStatus } from '@/models/Party';
import { useJoinPartyButton } from '@/hooks/useJoinPartyButton';
import { usePartyRequestAPI } from '@/api/partyRequest';

interface JoinPartyProps {
    party: Party
}

const JoinParty: React.FC<JoinPartyProps> = ({ party }) => {
    const [userStatus, setUserStatus] = useState(party.userJoinRequestStatus)
    const { placeholderText, error } = useColors()
    const { buttonColor, buttonText, textBottom, handleButtonClick } = useJoinPartyButton(userStatus, party._id, setUserStatus)
    const { cancelJoinRequest } = usePartyRequestAPI(party._id)
    const leaveButtonDisplayed = [JoinRequestStatus.ACCEPTED, JoinRequestStatus.PENDING].includes(userStatus)


    const leaveButtonHandler = async () => {
        await cancelJoinRequest()
        setUserStatus(JoinRequestStatus.NONE)
    }

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
            <View style={styles.bottomTextContainer}>
                <Text style={[styles.text, { color: placeholderText }]}>
                    {textBottom}
                </Text>

                {leaveButtonDisplayed && (
                    <TouchableOpacity onPress={leaveButtonHandler}>
                        <Text style={[styles.text, { color: error }]}>
                            {userStatus === JoinRequestStatus.ACCEPTED ? "Leave party" : "Cancel request"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View >
        </View >

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
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        maxWidth: '100%',
        flexWrap: 'wrap',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
})