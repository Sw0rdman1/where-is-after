import { View, Text, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function PartyScreen() {
    const router = useRouter();
    const { partyId } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <Text style={{ fontSize: 24 }}>🎉 Party ID: {partyId} 🎉</Text>
            <Button title="Close" onPress={() => router.back()} />
        </View>
    );
}
