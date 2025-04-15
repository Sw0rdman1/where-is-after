import { View, Text, ScrollView } from "@/components/Themed";
import { useParty } from "@/hooks/useParties";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useColors } from "@/hooks/useColors";
import ModalBackButton from "@/components/Button/ModalBackButton";
import Title from "@/components/Typography/Title";
import { PeopleAtending } from "@/components/Party/PeopleAtending";
import ShareButton from "@/components/Button/ShareButton";
import MapView from "react-native-maps";
import PartyMarker from "@/components/Map/PartyMarker";
import { handleOpenMaps } from "@/utils/map";
import Button from "@/components/Button/Button";
import PartyInformations from "@/components/Party/PartyInformations";
import { StatusBar } from "expo-status-bar";
import Description from "@/components/Typography/Description";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import NotFound from "@/components/Error/NotFound";

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
    const { surface } = useColors();

    const coords = `${party?.venue.location.latitude},${party?.venue.location.longitude}`;
    const encodedLabel = encodeURIComponent(party?.venue.name || "Selected Location");


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
            <View style={styles.textContainer}>
                <Title text={party.name} />
                <PartyInformations party={party} />
                <PeopleAtending people={partyPeople} />
                <Description label="About party" description={party.description} />
                <TouchableOpacity onPress={() => handleOpenMaps(coords, encodedLabel)}>
                    <MapView
                        style={styles.map}
                        initialRegion={party.venue.location}
                        userInterfaceStyle="dark"
                        scrollEnabled={false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                        pointerEvents="none"
                    >
                        <PartyMarker key={party._id} party={party} />
                    </MapView>
                </TouchableOpacity>
                <Button
                    title="Join party 🔥"
                    onPress={() => console.log("Join party")}
                />
            </View>
        </ScrollView >
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
    textContainer: {
        flex: 1,
        padding: 12,
        gap: 5,
        // paddingBottom: 100
    },

    map: {
        width: "100%",
        height: 150,
        borderRadius: 16,
        marginTop: 15,
        marginVertical: 10,
    },
});
