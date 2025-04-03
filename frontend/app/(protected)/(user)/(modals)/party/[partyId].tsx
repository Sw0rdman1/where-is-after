import { View, Text, ScrollView } from "@/components/Themed";
import { useParty } from "@/hooks/useParties";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams, router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import PartyLoading from "@/components/Party/PartyLoading";
import PartyNotFound from "@/components/Party/PartyNotFound";

export default function PartyScreen() {
    const { partyId } = useLocalSearchParams();
    const { party, loading } = useParty(partyId as string);
    const { background, tint, text } = useColors();

    const handleBack = () => {
        router.back();
    }

    if (loading) return <PartyLoading />;

    if (!party) return <PartyNotFound />

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                style={[styles.backButton, { backgroundColor: background }]}
                onPress={handleBack}
            >
                <Ionicons name="chevron-back" size={24} color={tint} />
            </TouchableOpacity>
            <Image source={{ uri: party.image }} style={styles.partyImage} />
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: tint }]}>
                    {party.name}
                </Text>
                <Text style={styles.description}>
                    {party.description}
                </Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    backButton: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1,
        height: 35,
        width: 35,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    partyImage: {
        width: "100%",
        height: 350,
        borderRadius: 16,
    },
    textContainer: {
        flex: 1,
        marginTop: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 12,
        fontFamily: "PermanentMarker",
    },
    description: {
        fontSize: 18,
        marginTop: 8,
        lineHeight: 24,
        textAlign: "justify",
        marginBottom: 20,
        fontStyle: "italic",
    },
});
