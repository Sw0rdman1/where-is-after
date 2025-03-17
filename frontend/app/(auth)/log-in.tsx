import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed';
import Banner from '@/components/Image/Banner';
import LogInForm from '@/components/Form/LogInForm';

const LOGIN_BANNER = require('../../assets/images/auth/banner.jpg')
const BANNER_HEIGHT = 220

const LogInScreen = () => {
    return (
        <View style={styles.container}>
            <Banner source={LOGIN_BANNER} height={BANNER_HEIGHT} />
            <View style={[styles.formContainer, { marginTop: BANNER_HEIGHT - 20 }]}>
                <LogInForm />
            </View>
        </View>
    )
}

export default LogInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    formContainer: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 40,
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }


})