import Button from "@/components/Button/Button";
import { Text, View } from "@/components/Themed";
import { useParty } from "@/hooks/useParties";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function PartyScreen() {
    const router = useRouter();
    const { partyId } = useLocalSearchParams();
    const { party, loading } = useParty(partyId as string);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!party) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Party not found</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image source={{ uri: party.venue.logo }} style={{ width: 200, height: 200 }} />
            <Text style={{ fontSize: 24 }}>{party.name}</Text>
            <Button title="Close" onPress={() => router.back()} />
        </View>
    );
}
