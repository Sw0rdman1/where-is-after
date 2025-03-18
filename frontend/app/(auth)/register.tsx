import EmailInput from '@/components/InputFields/EmailInput'
import { Text, View } from '@/components/Themed'
import { StyleSheet } from 'react-native'

const RegisterScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <Text>RegisterScreen</Text>
            <EmailInput status="empty" />
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})