import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar from '@/components/Image/Avatar';

export default function MainScreen() {
    const { user, logout } = useAuth();
    const { top } = useSafeAreaInsets();

    const handleLogout = () => {
        logout();
    }


    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <View style={styles.header}>
                {/* <View style={styles.headerContent}>
                    <Avatar source={user?.profileImage} size={40} />
                    <View style={styles.textContainer}>
                        <Text style={styles.displayName}>
                            {user?.displayName}
                        </Text>
                        <Text style={styles.role}>
                            {user?.role}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity> */}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    displayName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
    },
    role: {
        fontSize: 14,
    },
    button: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
    },
});
