import {
    Platform,
    TouchableOpacity,
    Share,
    Alert,
    Text,
} from 'react-native';
import * as Linking from 'expo-linking';
import * as ClipboardAPI from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';

type ShareButtonProps = {
    message: string;
    title?: string;
    buttonLabel?: string;
    iconSize?: number;
    color?: string;
    url?: string; // for sharing links/images especially on web
};

const ShareButton: React.FC<ShareButtonProps> = ({
    message,
    title,
    buttonLabel = 'Share',
    iconSize = 24,
    color = '#25D366', // WhatsApp green
    url,
}) => {
    const onShare = async () => {
        try {
            // For Web: try navigator.share first
            if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
                if (navigator.share) {
                    await navigator.share({
                        title,
                        text: message,
                        url,
                    });
                    return;
                } else {
                    // Fallback: Copy to clipboard
                    await ClipboardAPI.setStringAsync(url || message);
                    Alert.alert('Copied to Clipboard', url || message);
                    return;
                }
            }

            // Native platforms (iOS, Android)
            const result = await Share.share({
                message: url ? `${message} ${url}` : message,
                title,
            });

            if (result.action === Share.sharedAction) {
                console.log('Shared!');
            } else if (result.action === Share.dismissedAction) {
                console.log('Dismissed');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <TouchableOpacity
            onPress={onShare}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                gap: 8,
            }}
        >
            <Feather name="share-2" size={iconSize} color={color} />
            <Text style={{ color, fontSize: 16 }}>{buttonLabel}</Text>
        </TouchableOpacity>
    );
};

export default ShareButton;
