import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'

const QRCodeTokenScreen = () => {
    const { qrcodeToken } = useLocalSearchParams();

    return (
        <View>
            <Text>
                {qrcodeToken}
            </Text>
        </View>
    )
}

export default QRCodeTokenScreen

const styles = StyleSheet.create({})