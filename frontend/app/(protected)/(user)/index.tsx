import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Image } from 'expo-image';

const BACKGROUND_IMAGE = require("../../../assets/images/auth/bg7.jpg");


export default function MainScreen() {

    return (
        <View style={[styles.container]}>
            <Image source={BACKGROUND_IMAGE} style={{ width: '100%', flex: 1 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
    },
});
