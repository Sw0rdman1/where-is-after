import { View, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useColors } from '@/hooks/useColors';
import FiltersOptions from './FiltersOptions';

interface FilterBottomSheetProps {
    date: Date;
    setDate: (date: Date) => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ date, setDate }) => {
    const { filterBottomSheetRef } = useGlobalContext();
    const { surface } = useColors();


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
            index={0}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
            handleComponent={renderHandle}
            backgroundStyle={{ backgroundColor: surface }}
        >
            <FiltersOptions date={date} setDate={setDate} />
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
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
