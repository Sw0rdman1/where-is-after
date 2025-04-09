import { StyleSheet, Text } from 'react-native'
import { useColors } from '@/hooks/useColors'
import { ScrollView } from '../Themed'

const Title = ({ text }: { text: string }) => {
    const { tint } = useColors()

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
            <Text style={[styles.title, { color: tint }]} numberOfLines={1}>
                {text}
            </Text>
        </ScrollView>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: "bold",
        marginTop: 6,
        fontFamily: "PermanentMarker",
    },
})