import { MapMarker, Marker } from 'react-native-maps'
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, Circle, Mask } from "react-native-svg";
import Venue from '@/models/Venue';
import { useRef } from 'react';
import { useColors } from '@/hooks/useColors';

const SVG_MARKER_WIDTH = 15
const SVG_MARKER_HEIGHT = 20
const MARKER_IMAGE_SIZE = 10

const TOP_OFFSET = (SVG_MARKER_HEIGHT - MARKER_IMAGE_SIZE) / 6;
const LEFT_OFFSET = (SVG_MARKER_WIDTH - MARKER_IMAGE_SIZE) / 2;


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
                    fill={`${tint}`}
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
    venue: Venue | null;
    index?: number;
}




const VenueMarker: React.FC<Props> = ({ venue, index }) => {
    const markerRef = useRef<MapMarker>(null);

    if (!venue) return null;

    return (
        <Marker
            ref={markerRef}
            coordinate={venue.location}
            anchor={{ x: 0.5, y: 1 }}
            zIndex={index}
        >
            <SvgMarker imageUri={venue.logo} />
        </Marker>
    )
}

export default VenueMarker


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
