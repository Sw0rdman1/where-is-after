import { useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WelcomeScreen from './WelcomeScreen';

enum AUTH_SCREENS {
    WELCOME = 'welcome',
    EMAIL_ENTER = 'email-enter',
    LOG_IN = 'log-in',
    REGISTER = 'register'
}

const AuthContent = () => {
    const [currentAuthScreen, setCurrentAuthScreen] = useState(AUTH_SCREENS.WELCOME)

    const renderContent = useMemo(() => {
        switch (currentAuthScreen) {
            case AUTH_SCREENS.WELCOME:
                return (
                    <WelcomeScreen
                        handlePress={() => setCurrentAuthScreen(AUTH_SCREENS.LOG_IN)}
                    />
                );

            case AUTH_SCREENS.EMAIL_ENTER:
                return <Text>Email Enter Screen</Text>;

            case AUTH_SCREENS.LOG_IN:
                return <Text>Log In Screen</Text>;

            case AUTH_SCREENS.REGISTER:
                return <Text>Register Screen</Text>;

            default:
                return <Text>Unknown Screen</Text>;
        }

    }, [currentAuthScreen]);

    return (
        <View>
            {renderContent}
        </View>
    )
}

export default AuthContent

const styles = StyleSheet.create({})