import { FlatList, StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { useParties } from '@/hooks/useParties';
import PartyCard from '@/components/Party/PartyCard';
import Party from '@/models/Party';

const ListScreen = () => {
    const { parties } = useParties();

    const renderItem = ({ item }: { item: Party }) => (
        <PartyCard party={item} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%', padding: 10 }}
                data={parties}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()}
                ListHeaderComponent={() => <View style={{ height: 120 }} />}
                ListFooterComponent={() => <View style={{ height: 120 }} />}
            />
        </View>
    )
}

export default ListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
})