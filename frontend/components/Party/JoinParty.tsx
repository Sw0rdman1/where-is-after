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
    const [userStatus, setUserStatus] = useState(party.userStatus)
    const { tint, error, placeholderText } = useColors()
    const { sendRequestToJoin, leaveParty, cancelRequest } = usePartyAPI()

    const handleButtonClick = async () => {
        switch (userStatus) {
            case 'going':
                await leaveParty(party._id)
                setUserStatus('none')
                break
            case 'requested':
                await cancelRequest(party._id)
                break
            case 'rejected':
                break
            case 'none':
                await sendRequestToJoin(party._id)
                setUserStatus('requested')
                break
            default:
                break
        }
    }

    const buttonColor = () => {
        switch (userStatus) {
            case 'going':
                return error
            case 'requested':
                return placeholderText
            case 'rejected':
                return error
            case 'none':
                return tint
            default:
                return tint
        }
    }

    const buttonText = () => {
        switch (userStatus) {
            case 'going':
                return "Leave party 😢"
            case 'requested':
                return "Request sent"
            case 'rejected':
                return "No place left 😢"
            case 'none':
                return "Join party 🔥"
            default:
                return "Join party 🔥"
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: buttonColor() }]}
                onPress={handleButtonClick}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>
                    {buttonText()}
                </Text>
            </TouchableOpacity>
            <Text style={[styles.text, { color: placeholderText }]}>
                Waiting for party host to accept your request
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