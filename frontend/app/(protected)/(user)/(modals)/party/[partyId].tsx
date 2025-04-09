import { View, Text, ScrollView } from "@/components/Themed";
import { useParty } from "@/hooks/useParties";
import { Image } from "expo-image";
import { useRouter, useLocalSearchParams, router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import PartyLoading from "@/components/Party/PartyLoading";
import PartyNotFound from "@/components/Party/PartyNotFound";
import { formatDateWithDay, formatTime } from "@/utils/date";
import ModalBackButton from "@/components/Button/ModalBackButton";
import Title from "@/components/Typography/Title";


export default function PartyScreen() {
    const { partyId } = useLocalSearchParams();
    const { party, loading } = useParty(partyId as string);
    const { tint, placeholderText, surface } = useColors();

    const ICON_COLOR = placeholderText

    const handleVenuePress = () => {
        if (!party?.venue?._id) return;
        router.push(`/venue/${party.venue._id}`);
    }

    if (loading) return <PartyLoading />;

    if (!party) return <PartyNotFound />

    return (
        <ScrollView style={styles.container}>
            <ModalBackButton />
            <Image source={{ uri: party.image }} style={styles.partyImage} />
            <View style={styles.textContainer}>
                <Title text={party.name} />

                <Text style={styles.description}>
                    {party.description}
                </Text>
                <View style={styles.dateAndTimeContainer}>
                    <Ionicons name="calendar" size={20} color={ICON_COLOR} />
                    <Text style={styles.text}>
                        {formatDateWithDay(party.startDate, 'long')}
                    </Text>
                </View>
                <View style={styles.dateAndTimeContainer}>
                    <Ionicons name="time" size={20} color={ICON_COLOR} />
                    <Text style={styles.text}>
                        {formatTime(party.startDate)} - {formatTime(party.endDate)}
                    </Text>
                </View>
                <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row", gap: 5 }}>
                    <Ionicons name="location" size={20} color={ICON_COLOR} />
                    <TouchableOpacity style={[styles.venueContainer, { backgroundColor: surface }]} onPress={handleVenuePress}>
                        <Image source={{ uri: party.venue.logo }} style={{ width: 25, height: 25, borderRadius: 15 }} />
                        <Text style={[styles.text, { color: tint }]}>
                            {party.venue.name}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    partyImage: {
        width: "100%",
        height: 350,
        borderRadius: 16,
    },
    textContainer: {
        flex: 1,
        padding: 12,
    },

    description: {
        fontSize: 20,
        marginTop: 8,
        lineHeight: 24,
        textAlign: "justify",
        fontStyle: "italic",
        marginBottom: 8,
    },
    dateAndTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 15,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
    },
    venueContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
        borderRadius: 26,
        paddingRight: 15,
    },
});
