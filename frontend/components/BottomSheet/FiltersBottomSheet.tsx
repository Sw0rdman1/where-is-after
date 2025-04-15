import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useColors } from '@/hooks/useColors';

const filters = ['All', 'Favorites', 'Recent', 'Popular'];

const FilterBottomSheet = () => {
    const { filterBottomSheetRef } = useGlobalContext();
    const { surface } = useColors();

    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const handleSelect = (filter: string) => {
        console.log('Selected filter:', filter);
        filterBottomSheetRef.current?.close();
    };

    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.6}
            pressBehavior="close"
        />
    );

    const renderHandle = () => (
        <View style={[styles.handleContainer, { backgroundColor: surface }]}>
            <View style={styles.handleBar} />
        </View>
    );

    return (
        <BottomSheetModal
            ref={filterBottomSheetRef}
            snapPoints={snapPoints}
            index={0}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
            handleComponent={renderHandle}
            backgroundStyle={[styles.modalBackground, { backgroundColor: surface }]}
        >
            <BottomSheetView style={[styles.bottomSheetContent, { backgroundColor: surface }]}>
                <Text style={styles.title}>
                    Let's find perfect party for you!
                </Text>
                {filters.map((filter) => (
                    <Pressable key={filter} onPress={() => handleSelect(filter)}>
                        <Text style={styles.option}>{filter}</Text>
                    </Pressable>
                ))}
            </BottomSheetView>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
    },
    bottomSheetContent: {
        flex: 1,
        padding: 5,
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
        color: '#ffffff',
    },
    option: {
        paddingVertical: 12,
        fontSize: 16,
        color: '#ffffff',
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#121212',
    },
    handleBar: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#888',
    },
});

export default FilterBottomSheet;
