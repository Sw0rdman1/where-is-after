import { View, ScrollView, Text } from "@/components/Themed";
import { useParty } from "@/hooks/useParties";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import ModalBackButton from "@/components/Button/ModalBackButton";
import { StatusBar } from "expo-status-bar";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import NotFound from "@/components/Error/NotFound";
import User from "@/models/User";


export default function PartyScreen() {
    const { partyId } = useLocalSearchParams();
    const { party, loading } = useParty(partyId as string);

    if (loading) return <LoadingScreen title="Loading party" />;

    if (!party) return <NotFound />

    const renderItem = ({ item }: { item: User }) => {
        return (
            <View style={styles.partyContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.displayName}</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ModalBackButton />
            <FlatList
                style={{ width: '100%', padding: 10 }}
                data={party.joinRequests?.map(request => request as User) || []}
                renderItem={renderItem}
                keyExtractor={(item) => (item._id ?? "").toString()}
                ListHeaderComponent={() => <View style={{ height: 120 }} />}
                ListFooterComponent={() => <View style={{ height: 120 }} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    partyImage: {
        width: "100%",
        height: 200,
        borderRadius: 16,
    },
    partyContainer: {
        flex: 1,
        padding: 12,
        gap: 5,
        paddingBottom: 30
    },
});
