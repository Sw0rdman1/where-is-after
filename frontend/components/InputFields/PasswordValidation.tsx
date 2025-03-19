import { useColors } from '@/hooks/useColors';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native'

const ICON_SIZE = 16;

const REGEX = {
    uppercase: /[A-Z]/,
    number: /[0-9]/,
    length: /.{8,}/,
}

interface Props {
    password: string;
}


const PasswordValidation: React.FC<Props> = ({ password }) => {
    const { success } = useColors();



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Password must contain:</Text>
            <View style={styles.subcontainer}>
                <AntDesign
                    name={REGEX.length.test(password) ? "checkcircle" : "checkcircleo"}
                    size={ICON_SIZE}
                    color={REGEX.length.test(password) ? success : "white"}
                />
                <Text style={styles.text}>
                    At least 8 characters
                </Text>
            </View>
            <View style={styles.subcontainer}>
                <AntDesign
                    name={REGEX.uppercase.test(password) ? "checkcircle" : "checkcircleo"}
                    size={ICON_SIZE}
                    color={REGEX.uppercase.test(password) ? success : "white"}
                />
                <Text style={styles.text}>
                    At least 1 uppercase letter
                </Text>
            </View>
            <View style={styles.subcontainer}>
                <AntDesign
                    name={REGEX.number.test(password) ? "checkcircle" : "checkcircleo"}
                    size={ICON_SIZE}
                    color={REGEX.number.test(password) ? success : "white"}
                />
                <Text style={styles.text}>
                    At least 1 number
                </Text>
            </View>

        </View>

    )
}

export default PasswordValidation

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginLeft: 10,
        gap: 5,
    },
    title: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        marginBottom: 5,
    },
    subcontainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    text: {
        color: "white",
        marginLeft: 5,
    },
})