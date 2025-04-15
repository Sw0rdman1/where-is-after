import { View, ScrollView } from "@/components/Themed";
import { useParty } from "@/hooks/useParties";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import ModalBackButton from "@/components/Button/ModalBackButton";
import Title from "@/components/Typography/Title";
import { PeopleAtending } from "@/components/Party/PeopleAtending";
import ShareButton from "@/components/Button/ShareButton";
import Button from "@/components/Button/Button";
import PartyInformations from "@/components/Party/PartyInformations";
import { StatusBar } from "expo-status-bar";
import Description from "@/components/Typography/Description";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import NotFound from "@/components/Error/NotFound";
import OpenInMaps from "@/components/Party/OpenInMaps";

const partyPeople = [
    { name: 'Ana', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Marko', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Lena', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'Jovan', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { name: 'Milica', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
];


export default function PartyScreen() {
    const { partyId } = useLocalSearchParams();
    const { party, loading } = useParty(partyId as string);

    if (loading) return <LoadingScreen title="Loading party" />;

    if (!party) return <NotFound />

    return (
        <ScrollView style={styles.container}>
            <StatusBar style="light" />
            <ModalBackButton />
            <ShareButton
                message={`Check out this party: ${party.name}`}
                title={`Share ${party.name}`}
            />
            <Image source={{ uri: party.image }} style={styles.partyImage} />
            <View style={styles.partyContainer}>
                <Title text={party.name} />
                <PartyInformations party={party} />
                <PeopleAtending people={partyPeople} />
                <Description label="About party" description={party.description} />
                <OpenInMaps party={party} />
                <Button title="Join party 🔥" />
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
        height: 200,
        borderRadius: 16,
    },
    partyContainer: {
        flex: 1,
        padding: 12,
        gap: 5,
        paddingBottom: 100
    },
});
