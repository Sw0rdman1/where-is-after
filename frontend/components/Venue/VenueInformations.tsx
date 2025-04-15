import Venue from '@/models/Venue'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
    venue: Venue
}

const VenueInformations: React.FC<Props> = ({ venue }) => {
    return (
        <View>
            <Text>VenueInformations</Text>
        </View>
    )
}

export default VenueInformations

const styles = StyleSheet.create({})