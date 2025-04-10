import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useColors } from '@/hooks/useColors'
import { Image } from 'expo-image'
import { Text } from '../Themed'
import Party from '@/models/Party'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Avatar from '../Image/Avatar'
import { formatDateWithDay, formatTime } from '@/utils/date'

interface PartyCardProps {
    party: Party
}

const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
    const { surface, tint, placeholderText } = useColors()

    const handlePress = () => {
        router.push(`/party/${party._id}`)
    }

    return (
        <TouchableOpacity activeOpacity={0.7} style={[styles.container, { backgroundColor: surface }]} onPress={handlePress}>
            <Image source={{ uri: party.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.party}>{party.name}</Text>
                <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                    {party.description}
                </Text>
                <View style={styles.dateAndTimeContainer}>
                    <View style={styles.dateContainer}>
                        <Ionicons name="calendar" size={20} color={tint} />
                        <Text style={[styles.date, { color: placeholderText }]}>
                            {formatDateWithDay(party.startDate)}
                        </Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <Ionicons name="time" size={20} color={tint} />
                        <Text style={[styles.time, { color: placeholderText }]}>
                            {formatTime(party.startDate)} - {formatTime(party.endDate)}
                        </Text>
                    </View>
                </View>
                <View style={styles.venue}>
                    <Avatar size={30} source={party.venue.logo} />
                    <Text style={styles.venueName}>{party.venue.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PartyCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 20,
        flexDirection: 'column',
        marginBottom: 20,
        padding: 5,
    },
    image: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    textContainer: {
        padding: 15,
        borderRadius: 10,
        gap: 10,
    },
    party: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: "PermanentMarker",
    },
    description: {
        fontSize: 18,
    },
    dateAndTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    date: {
        fontSize: 14,
    },
    time: {
        fontSize: 14,
    },
    venue: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        alignSelf: 'flex-start',
    },
    venueName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})