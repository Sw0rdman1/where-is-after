import { StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'

const ListScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ListScreen</Text>
        </View>
    )
}

export default ListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})