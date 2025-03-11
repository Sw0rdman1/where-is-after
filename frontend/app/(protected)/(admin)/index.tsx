import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthProvider';
import { verifyUser } from '@/api/auth';

export default function MainScreen() {
    const { user, logout } = useAuth();
    const verificationCode = '123456';

    const handleLogout = () => {
        logout();
    }

    const handleVerify = async () => {
        if (!user) return
        const data = await verifyUser(user, verificationCode);
        console.log(data);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {user?.email}
            </Text>
            <Text style={styles.title}>
                {user?.role}
            </Text>
            <Text style={styles.title}>
                {user?.isVerified ? 'Verified' : 'Not verified'}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
});
