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
import { useColors } from '@/hooks/useColors';
import { BUTTON_MODAL_SIZE, BUTTON_MODAL_TOP } from './common';

type ShareButtonProps = {
    message: string;
    title?: string;
    buttonLabel?: string;
    iconSize?: number;
    color?: string;
    url?: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({
    message,
    title,
    buttonLabel,
    iconSize = 20,
    color,
    url,
}) => {
    const { tint, background } = useColors();
    const defaultColor = color || tint;

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
                position: 'absolute',
                zIndex: 100,
                top: BUTTON_MODAL_TOP,
                right: 16,
                height: BUTTON_MODAL_SIZE,
                width: BUTTON_MODAL_SIZE,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: background,
                borderRadius: 24,
            }}
        >
            <Feather name="share-2" size={iconSize} color={defaultColor} />
            {buttonLabel &&
                <Text style={{ color: defaultColor, fontSize: 16, fontWeight: 'bold' }}>
                    {buttonLabel}
                </Text>
            }
        </TouchableOpacity>
    );
};

export default ShareButton;
