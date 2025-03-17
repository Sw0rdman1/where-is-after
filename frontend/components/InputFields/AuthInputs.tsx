import { Dimensions, StyleSheet } from 'react-native'
import { Text, TextInput, TextInputProps, View } from '../Themed'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColors } from '@/hooks/useColors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

const { width } = Dimensions.get('window')

interface InputProps extends TextInputProps {
    registration?: boolean,
    status: 'empty' | 'error' | 'success',
    error?: string
}

const DisplayNameInput: React.FC<InputProps> = ({ registration, status, error, ...props }) => {
    const { tint, placeholderText, error: errorColor } = useColors()

    const color = () => {
        if (!registration) return placeholderText

        switch (status) {
            case 'empty':
                return placeholderText
            case 'error':
                return errorColor
            case 'success':
                return tint
        }
    }

    return (
        <View style={styles.container}>

            <View style={[styles.inputContainer, { borderColor: color() }]}>
                <Ionicons style={styles.icon} name="person-circle" size={32} color={color()} />
                <TextInput
                    style={[styles.input, { color: color() }]}
                    autoCapitalize="words"
                    placeholder="Display Name"
                    placeholderTextColor={placeholderText}
                    {...props}
                />
                {status === 'success' ?
                    <AntDesign style={styles.successIcon} name="checkcircle" size={24} color={tint} /> :
                    <View style={{ width: 25 }} />
                }
                {(status === 'error' && error) &&
                    <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
                }
            </View>
        </View>
    )
}

const EmailInput: React.FC<InputProps> = ({ registration, status, error, ...props }) => {
    const { tint, placeholderText, error: errorColor } = useColors()

    const color = () => {

        switch (status) {
            case 'empty':
                return placeholderText
            case 'error':
                return errorColor
            case 'success':
                return tint
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Entypo style={styles.icon} name="mail" size={28} color={color()} />
                <TextInput
                    style={[styles.input, { color: color() }]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    importantForAutofill="yes"
                    placeholder="Email"
                    keyboardType="email-address"
                    returnKeyType="done"
                    placeholderTextColor={placeholderText}
                    {...props}
                />
                {status === 'success' ?
                    <AntDesign style={styles.successIcon} name="checkcircle" size={24} color={tint} /> :
                    <View style={{ width: 25 }} />
                }
                {(status === 'error' && error) &&
                    <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
                }
            </View>

        </View >

    )
}


const PasswordInput: React.FC<InputProps> = ({ status, error, ...props }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const { placeholderText, error: errorColor } = useColors()

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Entypo style={styles.icon} name="lock" size={28} color={placeholderText} />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    textContentType="password"
                    importantForAutofill="yes"
                    placeholder="Password"
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={placeholderText}
                    keyboardType={secureTextEntry ? 'default' : 'visible-password'}
                    returnKeyType="done"
                    {...props}
                />
                {secureTextEntry ?
                    <Ionicons style={styles.icon} name="eye-off" size={28} color={placeholderText} onPress={() => setSecureTextEntry(false)} /> :
                    <Ionicons style={styles.icon} name="eye" size={28} color={placeholderText} onPress={() => setSecureTextEntry(true)} />
                }
                {(status === 'error' && error) &&
                    <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
                }
            </View>
            <View style={{ width: 25 }} />
        </View>

    )
}


export { DisplayNameInput, EmailInput, PasswordInput }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputContainer: {
        width: width - 40,
        marginLeft: 5,
        flexDirection: 'row',
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 5,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        fontSize: 20,
        fontWeight: '500',
        padding: 5,
        paddingLeft: 10,
        marginRight: 10,
        flexGrow: 1,
    },
    icon: {
        height: 28,
        width: 28,
    },
    successIcon: {
        height: 25,
        width: 25,
    },
    errorText: {
        position: 'absolute',
        left: 5,
        bottom: -25,
        height: 20,

        fontSize: 13,
        fontWeight: '500',
    },
})