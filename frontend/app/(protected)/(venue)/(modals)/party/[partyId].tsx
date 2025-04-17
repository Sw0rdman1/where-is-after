import { Text } from "@/components/Themed";
import { useParty, usePartyRequests } from "@/hooks/useParties";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import NotFound from "@/components/Error/NotFound";
import User from "@/models/User";
import { useColors } from "@/hooks/useColors";
import Avatar from "@/components/Image/Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { usePartyRequestAPI } from "@/api/partyRequest";


export default function PartyScreen() {
    const { partyId } = useLocalSearchParams();
    const { partyRequests, loading } = usePartyRequests(partyId as string);
    const { surface, background, success, error } = useColors()
    const { acceptRequest, rejectRequest } = usePartyRequestAPI(partyId as string);

    if (loading) return <LoadingScreen title="Loading party" />;

    const handleAccept = async (userId: string) => {
        try {
            await acceptRequest(userId);
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    }

    const handleDecline = async (userId: string) => {
        try {
            await rejectRequest(userId);
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    }

    const renderItem = ({ item }: { item: User }) => {
        return (
            <View style={[styles.userContainer, { backgroundColor: surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar size={50} source={item.profileImage} />
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.displayName}</Text>
                        <Text style={{ fontSize: 12 }}>{item.email}</Text>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => handleAccept(item._id)} >
                        <MaterialIcons name="check-circle" size={34} color={success} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDecline(item._id)} >
                        <MaterialIcons name="cancel" size={34} color={error} />
                    </TouchableOpacity>
                </View>
            </View >
        );
    }


    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <StatusBar style="light" />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
            </Text>
            <FlatList
                style={{ width: '100%', flex: 1, padding: 10 }}
                data={partyRequests?.map((request) => request.user) ?? []}
                renderItem={renderItem}
                keyExtractor={(item) => (item._id ?? "").toString()}
                ListHeaderComponent={() => <View style={{ height: 20 }} />}
                ListFooterComponent={() => <View style={{ height: 120 }} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        width: '100%',
    },
    textContainer: {
        padding: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});
