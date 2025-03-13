import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

interface BannerProps {
    source: string
    height: number
}

const Banner: React.FC<BannerProps> = ({ source, height }) => {
    return (
        <Image
            source={source}
            style={[styles.image, { height }]}
        />
    )
}

export default Banner

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
    },
})