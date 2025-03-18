import { useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import WelcomeScreen from './WelcomeScreen';
import EmailForm from '../Form/EmailForm';
import Entypo from '@expo/vector-icons/Entypo';


enum AUTH_SCREENS {
    WELCOME = 'welcome',
    EMAIL_ENTER = 'email-enter',
    LOG_IN = 'log-in',
    REGISTER = 'register'
}

const AuthContent = () => {
    const [currentAuthScreen, setCurrentAuthScreen] = useState(AUTH_SCREENS.EMAIL_ENTER)

    const backState = useMemo(() => {
        switch (currentAuthScreen) {
            case AUTH_SCREENS.WELCOME:
                return null;

            case AUTH_SCREENS.EMAIL_ENTER:
                return AUTH_SCREENS.WELCOME;

            case AUTH_SCREENS.LOG_IN:
                return AUTH_SCREENS.EMAIL_ENTER;

            case AUTH_SCREENS.REGISTER:
                return AUTH_SCREENS.EMAIL_ENTER;

            default:
                return null;
        }
    }, [currentAuthScreen]);


    const handleBackButton = () => {
        if (backState) {
            setCurrentAuthScreen(backState);
        }
    }

    const renderContent = useMemo(() => {
        switch (currentAuthScreen) {
            case AUTH_SCREENS.WELCOME:
                return (
                    <WelcomeScreen
                        handlePress={() => setCurrentAuthScreen(AUTH_SCREENS.EMAIL_ENTER)}
                    />
                );

            case AUTH_SCREENS.EMAIL_ENTER:
                return <EmailForm />;

            case AUTH_SCREENS.LOG_IN:
                return <Text>Log In Screen</Text>;

            case AUTH_SCREENS.REGISTER:
                return <Text>Register Screen</Text>;

            default:
                return <Text>Unknown Screen</Text>;
        }

    }, [currentAuthScreen]);

    return (
        <View style={styles.container}>
            {backState &&
                <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                    <Entypo name='chevron-left' size={32} color='white' />
                </TouchableOpacity>
            }

            {renderContent}
        </View>
    )
}

export default AuthContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 15,
        zIndex: 1,
    }
})