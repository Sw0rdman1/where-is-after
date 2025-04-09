import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';

const { width } = Dimensions.get('window');

type ImageSliderProps = {
    images: string[];
};

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / width);
        if (slide !== activeIndex) {
            setActiveIndex(slide);
        }
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.image} contentFit='cover' />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                bounces={false}
            />
            {images.length > 1 &&
                <View style={styles.indicatorOverlay}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === activeIndex && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 16,
        height: 350,
        borderRadius: 16,
        overflow: 'hidden',
    },
    imageWrapper: {
        width: width - 16,
        height: 350,
        borderRadius: 16,

    },
    image: {
        borderRadius: 16,
        width: '100%',
        height: '100%',
    },
    indicatorOverlay: {
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#fff',
        transform: [{ scale: 1.2 }],
    },
});
