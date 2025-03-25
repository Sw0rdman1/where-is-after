import { Text, View } from '@/components/Themed'
import { useAuth } from '@/context/AuthProvider'
import { StyleSheet, TouchableOpacity } from 'react-native'

const ProfileScreen = () => {
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: 'white',
    },
})