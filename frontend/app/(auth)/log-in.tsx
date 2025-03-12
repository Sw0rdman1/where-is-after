import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed';
import Banner from '@/components/Image/Banner';
import LogInForm from '@/components/Form/LogInForm';

const LOGIN_BANNER = require('../../assets/images/auth/background.jpg')

const LogInScreen = () => {
    return (
        <View style={styles.container}>
            <Banner source={LOGIN_BANNER} height={200} />
            <LogInForm />
        </View>
    )
}

export default LogInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

})