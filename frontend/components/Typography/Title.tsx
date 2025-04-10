import { StyleSheet, Text } from 'react-native'
import { useColors } from '@/hooks/useColors'

const Title = ({ text }: { text: string }) => {
    const { tint } = useColors()

    return (
        <Text style={[styles.title, { color: tint }]} >
            {text}
        </Text>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: "bold",
        fontFamily: "PermanentMarker",
    },
})