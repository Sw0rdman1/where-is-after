import { useColors } from '@/hooks/useColors'
import Party from '@/models/Party'
import { formatDateWithDay, formatTime } from '@/utils/date'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../Themed'

interface Props {
    party: Party
}

const PartyInformations: React.FC<Props> = ({ party }) => {
    const { placeholderText, tint, surface } = useColors();
    const ICON_COLOR = tint

    const handleVenuePress = () => {
        if (!party?.venue?._id) return;
        router.push(`/venue/${party.venue._id}`);
    }

    return (
        <>
            <View style={styles.dateAndTimeContainer}>
                <Ionicons name="calendar" size={22} color={ICON_COLOR} />
                <Text style={styles.text}>
                    {formatDateWithDay(party.startDate)}
                </Text>
                <Text style={[styles.text, { color: placeholderText }]}>
                    at
                </Text>
                <Text style={styles.text}>
                    {formatTime(party.startDate)} - {formatTime(party.endDate)}
                </Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row", gap: 5 }}>
                <Ionicons name="location" size={22} color={ICON_COLOR} />
                <TouchableOpacity style={[styles.venueContainer, { backgroundColor: surface }]} onPress={handleVenuePress}>
                    <Image source={{ uri: party.venue.logo }} style={{ width: 25, height: 25, borderRadius: 15 }} />
                    <Text style={[styles.text, { color: tint }]}>
                        {party.venue.name}
                    </Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

export default PartyInformations

const styles = StyleSheet.create({
    dateAndTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginTop: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
    },
    venueContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
        borderRadius: 26,
        paddingRight: 15,
    },
})