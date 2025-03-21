import { Image } from 'expo-image';

interface Props {
    source: string | undefined;
    size: number;
}

const AVATAR_FALLBACK = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

const Avatar: React.FC<Props> = ({ source, size = 50 }) => {
    return (
        <Image
            source={{ uri: source || AVATAR_FALLBACK }}
            style={{ width: size, height: size, borderRadius: size / 2 }}
        />
    )
}

export default Avatar
