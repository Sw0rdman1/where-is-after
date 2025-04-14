import { StyleSheet } from 'react-native'
import { Text, View } from '../Themed'
import { useColors } from '@/hooks/useColors'

const Description = ({ label, description }: { label: string, description: string }) => {
    const { surface } = useColors()


    return (
        <View style={[styles.descriptionContainer, { backgroundColor: surface }]}>
            <Text style={{ ...styles.description, fontWeight: 'bold' }}>
                {label}:
            </Text>
            <Text style={{ ...styles.description, fontStyle: "italic" }} numberOfLines={2}>
                {description}
            </Text>
        </View>
    )
}

export default Description

const styles = StyleSheet.create({
    descriptionContainer: {
        gap: 3,
        padding: 5,
        borderRadius: 8,
        paddingLeft: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
    },
})