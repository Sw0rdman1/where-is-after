import { ActivityIndicator, StyleSheet } from 'react-native'
import { Text, View } from '../Themed'
import { useColors } from '@/hooks/useColors'

const PartyLoading = () => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={tint} />
            <Text>Loading...</Text>
        </View>
    )
}

export default PartyLoading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})