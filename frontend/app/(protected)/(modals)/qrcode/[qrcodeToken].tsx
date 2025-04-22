import { Text, View } from '@/components/Themed';
import { useColors } from '@/hooks/useColors';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native'
import QRCode from 'react-native-qrcode-svg';

const LOGO = require('../../../../assets/images/protected/logo.png')

const QRCodeTokenScreen = () => {
    const { qrcodeToken } = useLocalSearchParams();
    const { tint, background, text, placeholderText } = useColors()

    if (!qrcodeToken) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Invalid QR code token</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Your reservation QR code
            </Text>
            <QRCode
                value={Array.isArray(qrcodeToken) ? qrcodeToken.join('') : qrcodeToken}
                size={300}
                backgroundColor={background}
                // logo={LOGO}
                logoSize={60}
                logoMargin={2}
                logoBorderRadius={10}
                linearGradient={[tint, text]}
                enableLinearGradient
            />
            <Text style={[styles.subtitle, { color: placeholderText }]}>
                Show this QR code at the entrance to get your reservation
            </Text>
        </View>
    )
}

export default QRCodeTokenScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 32,
        textAlign: 'center',

    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        width: 300,
        fontWeight: 'bold',

    },
})