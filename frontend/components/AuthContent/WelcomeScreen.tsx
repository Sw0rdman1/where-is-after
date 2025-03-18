import { StyleSheet, Text, View } from 'react-native'
import Button from '../Button/Button'

interface Props {
    handlePress: () => void
}

const WelcomeScreen: React.FC<Props> = ({ handlePress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                The best parties aren't planned - they're discovered!
            </Text>
            <Text style={styles.subtitle}>
                With Gde je After, find the hottest parties near you and keep the night alive!
            </Text>
            <Button
                title='Discover parties'
                onPress={handlePress}
                color='secondary'
            />
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        padding: 30,
        marginBottom: 10
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
    },
})