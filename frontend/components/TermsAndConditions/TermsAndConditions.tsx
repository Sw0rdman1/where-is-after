import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useColors } from '@/hooks/useColors'

const TermsAndConditions = () => {
    const { tint } = useColors()
    return (
        <View style={styles.termsAndConditions}>
            <Text style={styles.text}>
                By clicking Agree & Register below i agree to
            </Text>

            <TouchableOpacity >
                <Text style={[styles.text, { color: tint }]}>
                    Terms and Conditions and Privacy Policy
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TermsAndConditions

const styles = StyleSheet.create({
    termsAndConditions: {
        borderRadius: 20,
        marginLeft: 10,
    },
    text: {
        fontSize: 14,
        color: "white",
        marginTop: 10,
    },
    buttonContainer: {
        marginHorizontal: 20,
    },
})