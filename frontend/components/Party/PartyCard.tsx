import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useColors } from '@/hooks/useColors'
import { Image } from 'expo-image'
import { Text } from '../Themed'
import Party from '@/models/Party'

interface PartyCardProps {
    party: Party
}

const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
    const { surface } = useColors()

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: surface }]}>
            <Image source={{ uri: party.venue.logo }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.party}>{party.name}</Text>
                <Text style={styles.venue}>{party.venue.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PartyCard

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: '100%',
        borderRadius: 10,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'column',
        marginBottom: 20,
    },
    image: {
        height: '100%',
        flex: 1,
        borderRadius: 10,
    },
    textContainer: {
        padding: 15,
        borderRadius: 10,
        gap: 10,
    },
    party: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    venue: {
        fontSize: 16,
    },
})