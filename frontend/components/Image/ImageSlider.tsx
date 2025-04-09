import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

type ImageSliderProps = {
    images: string[];
};

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const flatListRef = useRef<FlatList>(null);
    const modalFlatListRef = useRef<FlatList>(null);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / width);
        if (slide !== activeIndex) {
            setActiveIndex(slide);
        }
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // Scroll to the correct image in the modal once it's visible
    useEffect(() => {
        if (isModalVisible && modalFlatListRef.current) {
            // Delay to ensure modal layout is measured
            setTimeout(() => {
                modalFlatListRef.current?.scrollToIndex({
                    index: activeIndex,
                    animated: false,
                });
            }, 0);
        }
    }, [isModalVisible]);

    const renderItem = ({ item, index }: { item: string; index: number }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={openModal}
            style={styles.imageWrapper}
        >
            <Image source={{ uri: item }} style={styles.image} contentFit='cover' />
        </TouchableOpacity>
    );

    const renderModalItem = ({ item }: { item: string }) => (
        <View style={styles.modalImageWrapper}>
            <Image source={{ uri: item }} style={styles.modalImage} contentFit='contain' />
        </View>
    );

    return (
        <>
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
                {images.length > 1 && (
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
                )}
            </View>

            <Modal visible={isModalVisible} transparent={true} animationType='fade'>
                <View style={styles.modalOverlay}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>

                    <FlatList
                        ref={modalFlatListRef}
                        data={images}
                        renderItem={renderModalItem}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        getItemLayout={(_, index) => ({
                            length: width,
                            offset: width * index,
                            index,
                        })}
                    />
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width - 16,
        height: 300,
        borderRadius: 16,
        overflow: 'hidden',
    },
    imageWrapper: {
        width: width - 16,
        height: 300,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImageWrapper: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width,
        height,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        left: 15,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
    },
    closeText: {
        fontSize: 24,
        color: 'white',
    },
});
