import { JoinRequestStatus } from '@/models/Party'
import { useCallback, useMemo } from 'react'
import { useColors } from './useColors'
import { usePartyRequestAPI } from '@/api/partyRequest'

export const useJoinPartyButton = (userStatus: JoinRequestStatus, partyId: string, setUserStatus: (status: JoinRequestStatus) => void) => {
    const { tint, error, placeholderText } = useColors()
    const { sendJoinRequest, leaveParty, cancelJoinRequest } = usePartyRequestAPI(partyId)

    const handleButtonClick = useCallback(async () => {
        switch (userStatus) {
            case JoinRequestStatus.ACCEPTED:
                await leaveParty()
                setUserStatus(JoinRequestStatus.NONE)
                break
            case JoinRequestStatus.PENDING:
                await cancelJoinRequest()
                setUserStatus(JoinRequestStatus.NONE)
                break
            case JoinRequestStatus.REJECTED:
                // optional: show a toast or feedback
                break
            case JoinRequestStatus.NONE:
                await sendJoinRequest()
                setUserStatus(JoinRequestStatus.PENDING)
                break
            default:
                break
        }
    }, [userStatus, leaveParty, cancelJoinRequest, sendJoinRequest, setUserStatus])

    const { buttonColor, buttonText, textBottom } = useMemo(() => {
        switch (userStatus) {
            case JoinRequestStatus.ACCEPTED:
                return {
                    buttonColor: error,
                    buttonText: "Leave party 😢",
                    textBottom: "You are all set! See you at the party 🎉"
                }
            case JoinRequestStatus.PENDING:
                return {
                    buttonColor: placeholderText,
                    buttonText: "Request sent",
                    textBottom: "Waiting for party host to accept your request"
                }
            case JoinRequestStatus.REJECTED:
                return {
                    buttonColor: error,
                    buttonText: "No place left 😢",
                    textBottom: "Sorry for the inconvenience!"
                }
            case JoinRequestStatus.NONE:
                return {
                    buttonColor: tint,
                    buttonText: "Join party 🔥",
                    textBottom: "There are still some places left. Join now!"
                }
            default:
                return {
                    buttonColor: tint,
                    buttonText: "Join party 🔥",
                    textBottom: "Waiting for party host to accept your request"
                }
        }
    }, [userStatus])

    return {
        buttonColor,
        buttonText,
        textBottom,
        handleButtonClick
    }
}
