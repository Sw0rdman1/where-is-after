import { StyleSheet, Text } from 'react-native'
import { useColors } from '@/hooks/useColors'
import { ScrollView } from '../Themed'

const Title = ({ text }: { text: string }) => {
    const { tint } = useColors()

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
            <Text style={[styles.title, { color: tint }]} >
                {text}
            </Text>
        </ScrollView>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "PermanentMarker",
    },
})