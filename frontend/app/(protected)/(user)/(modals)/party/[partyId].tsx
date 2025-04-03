import { View, Text } from "@/components/Themed";
import Button from "@/components/Button/Button";
import { useParty } from "@/hooks/useParties";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams, router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import PartyLoading from "@/components/Party/PartyLoading";

export default function PartyScreen() {
    const { partyId } = useLocalSearchParams();
    const { party, loading } = useParty(partyId as string);
    const { background, tint, text } = useColors();

    const handleBack = () => {
        router.back();
    }

    if (loading) return <PartyLoading />;

    if (!party) {
        return (
            <View style={styles.centered}>
                <Text>Party not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.backButton, { backgroundColor: background }]}
                onPress={handleBack}
            >
                <Ionicons name="chevron-back" size={24} color={tint} />
            </TouchableOpacity>
            <Image source={{ uri: party.venue.logo }} style={styles.logo} />
            <Text style={styles.title}>{party.name}</Text>
            <Text style={styles.date}>{new Date(party.date).toLocaleDateString()}</Text>
            <Text style={styles.description}>{party.description}</Text>

            <View style={styles.venueContainer}>
                <Text style={styles.venueTitle}>Venue</Text>
                <Text style={styles.venueName}>{party.venue.name}</Text>
                <Text style={styles.venueDescription}>{party.venue.description}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 1,
        height: 35,
        width: 35,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: "100%",
        height: 250,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 12,
    },
    date: {
        fontSize: 16,
        color: "gray",
        marginTop: 4,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 12,
    },
    venueContainer: {
        marginTop: 16,
    },
    venueTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    venueName: {
        fontSize: 16,
        marginTop: 4,
    },
    venueDescription: {
        fontSize: 14,
        color: "gray",
        marginTop: 4,
    },
    venueLocation: {
        fontSize: 14,
        marginTop: 4,
    },
});
