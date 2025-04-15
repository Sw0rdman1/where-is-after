import { ActivityIndicator, StyleSheet } from 'react-native'
import { Text, View } from '../Themed'
import { useColors } from '@/hooks/useColors'

const LoadingScreen = ({ title }: { title: string }) => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={tint} />
            <Text>{title}</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})