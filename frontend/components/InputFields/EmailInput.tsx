import { AntDesign, Entypo } from "@expo/vector-icons"
import { Text } from "../Themed"
import { ICON_SIZE, InputProps, styles } from "./common"
import { useColors } from "@/hooks/useColors"
import { BlurView } from "expo-blur"
import { TextInput, View } from "react-native"

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
        <BlurView style={styles.container} intensity={60} tint="dark">
            <View style={styles.iconContainer}>
                <Entypo name="mail" size={ICON_SIZE} color={'white'} />
            </View>
            <View style={styles.inputContainer}>
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
                    <AntDesign style={styles.successIcon} name="checkcircle" size={ICON_SIZE} color={tint} /> :
                    <View style={{ width: 25 }} />
                }
                {(status === 'error' && error) &&
                    <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
                }
            </View>

        </BlurView>

    )
}

export default EmailInput