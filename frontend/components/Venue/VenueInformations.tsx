import { useColors } from '@/hooks/useColors'
import Venue from '@/models/Venue'
import { formatTime } from '@/utils/date'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { Text } from '../Themed'

interface Props {
    venue: Venue
}

const VenueInformations: React.FC<Props> = ({ venue }) => {
    const { tint } = useColors();

    return (
        <View style={styles.dateAndTimeContainer}>
            <Ionicons name="calendar" size={22} color={tint} />
            <Text style={styles.text}>
                {formatTime(new Date())} - {formatTime(new Date())}
            </Text>
        </View>
    )
}

export default VenueInformations

const styles = StyleSheet.create({
    dateAndTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginTop: 15,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
    },
})