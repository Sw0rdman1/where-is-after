import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import { Text } from "../Themed"
import { ICON_SIZE, InputProps, styles } from "./common"
import { useColors } from "@/hooks/useColors"
import { BlurView } from "expo-blur"
import { TextInput, View } from "react-native"
import { useState } from "react"
import Fontisto from '@expo/vector-icons/Fontisto';

const PasswordInput: React.FC<InputProps> = ({ status, error, ...props }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const { placeholderText, error: errorColor } = useColors()

    return (
        <BlurView style={styles.container}>
            <View style={styles.iconContainer}>
                <Fontisto name="locked" size={ICON_SIZE} color={placeholderText} />
            </View>
            <View style={styles.inputContainer}>
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
                    <Ionicons name="eye-off" size={ICON_SIZE} color={placeholderText} onPress={() => setSecureTextEntry(false)} /> :
                    <Ionicons name="eye" size={ICON_SIZE} color={placeholderText} onPress={() => setSecureTextEntry(true)} />
                }
                {(status === 'error' && error) &&
                    <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
                }
            </View>
            <View style={{ width: 25 }} />
        </BlurView>

    )
}

export default PasswordInput