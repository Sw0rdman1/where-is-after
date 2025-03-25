import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native';

interface Props {
    source: string | undefined;
    size: number;
    onPress?: () => void;
}

const AVATAR_FALLBACK = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

const Avatar: React.FC<Props> = ({ source, size = 50, onPress }) => {

    if (!source) {
        return (
            <BlurView intensity={60} tint='light' style={{ width: size, height: size, borderRadius: size / 2, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                <TouchableOpacity onPress={onPress} style={{ width: size, height: size, borderRadius: size / 2, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="person" size={size / 2} color="white" />
                </TouchableOpacity>
            </BlurView >
        )
    }

    return (
        <TouchableOpacity onPress={onPress} style={{ width: size, height: size, borderRadius: size / 2, justifyContent: "center", alignItems: "center" }}>
            <Image
                source={{ uri: source || AVATAR_FALLBACK }}
                style={{ width: size, height: size, borderRadius: size / 2 }}
            />
        </TouchableOpacity>

    )
}

export default Avatar
