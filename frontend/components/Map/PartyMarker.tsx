import { Callout, MapMarker, Marker } from 'react-native-maps'
import { Image, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Defs, Circle, Mask } from "react-native-svg";
import { isDarkMode, useColors } from '@/hooks/useColors';
import { useEffect, useRef, useState } from 'react';
import { Text } from '../Themed';
import { calculateTextWidth } from '@/utils/map';
import Party from '@/models/Party';

const SVG_MARKER_WIDTH = 40
const SVG_MARKER_HEIGHT = 50
const MARKER_IMAGE_SIZE = 30

const TOP_OFFSET = (SVG_MARKER_HEIGHT - MARKER_IMAGE_SIZE) / 6;
const LEFT_OFFSET = (SVG_MARKER_WIDTH - MARKER_IMAGE_SIZE) / 2;

const CALLOUT_IMAGE_SIZE = 50
const CALLOUT_PADDING = 10
const CALLOUT_MAX_WIDTH = 300

const PARTY_IMAGE = require('../../assets/images/protected/party.png')


const SvgMarker = ({ imageUri }: { imageUri: string }) => {
    const { tint } = useColors()

    return (
        <View style={styles.container}>
            <Svg width={SVG_MARKER_WIDTH} height={SVG_MARKER_HEIGHT} viewBox="0 0 100 140">
                <Defs>
                    <Mask id="mask">
                        <Path
                            d="M50 0C22.4 0 0 22.4 0 50c0 22.1 17.5 48.6 35.8 78.3 7.2 11.9 21.1 11.9 28.4 0C82.5 98.6 100 72.1 100 50 100 22.4 77.6 0 50 0z"
                            fill="white"
                        />
                        <Circle cx="50" cy="50" r={MARKER_IMAGE_SIZE + 10} fill="black" />
                    </Mask>
                </Defs>

                <Path
                    d="M50 0C22.4 0 0 22.4 0 50c0 22.1 17.5 48.6 35.8 78.3 7.2 11.9 21.1 11.9 28.4 0C82.5 98.6 100 72.1 100 50 100 22.4 77.6 0 50 0z"
                    fill={tint}
                    mask="url(#mask)"
                />
            </Svg>

            <Image
                source={{ uri: imageUri }}
                style={styles.image}
            />
        </View>
    );
}


interface Props {
    party: Party;
    index?: number;
}

const CustomCallout: React.FC<Props> = ({ party }) => {
    const [calloutWidth, setCalloutWidth] = useState(0);
    const { text } = useColors();

    useEffect(() => {
        const width = calculateTextWidth(party.venue.name, 16) + CALLOUT_IMAGE_SIZE + CALLOUT_PADDING;
        setCalloutWidth(Math.min(width, CALLOUT_MAX_WIDTH));
    }, []);


    return (
        <Callout tooltip >
            <BlurView
                style={[styles.calloutContainer, { boxShadow: text, width: calloutWidth }]}
                intensity={80}
                tint={'light'}
            >
                <Image
                    source={{ uri: party.venue.logo }}
                    style={styles.calloutLogo}
                />
                <View style={styles.calloutTextContainer}>
                    <Text
                        style={styles.calloutVenueName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {party.venue.name}
                    </Text>
                    <Text
                        style={styles.calloutPartyName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {party.name}
                    </Text>
                </View>
            </BlurView>
        </Callout>
    )
}



const PartyMarker: React.FC<Props> = ({ party, index }) => {
    const markerRef = useRef<MapMarker>(null);

    const handleCalloutPress = () => {
        markerRef.current?.hideCallout();
    };

    return (
        <Marker
            ref={markerRef}
            coordinate={party.venue.location}
            anchor={{ x: 0.5, y: 1 }}
            zIndex={index}
            onCalloutPress={handleCalloutPress}
        >
            <SvgMarker imageUri={party.venue.logo} />
            <CustomCallout party={party} />
        </Marker>
    )
}

export default PartyMarker


const styles = StyleSheet.create({
    //Marker styles
    container: {
        maxWidth: 250,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    image: {
        position: "absolute",
        top: TOP_OFFSET,
        left: LEFT_OFFSET,
        width: MARKER_IMAGE_SIZE,
        height: MARKER_IMAGE_SIZE,
        borderRadius: '50%',
    },

    //Callout styles
    calloutContainer: {
        padding: 5,
        paddingRight: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        overflow: "hidden",
    },
    calloutLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    calloutTextContainer: {
        flex: 1,
        gap: 5,
    },
    calloutVenueName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    calloutPartyName: {
        fontSize: 14,
    },

})
