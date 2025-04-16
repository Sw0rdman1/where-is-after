import { View, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { ScrollView, Text } from '../Themed';

type SocialLinks = {
    website?: string;
    instagram?: string;
    facebook?: string;
    tiktok?: string;
};

type SocialButtonsProps = {
    socials: SocialLinks;
    name: string;
};

const openLink = async (url: string | undefined) => {
    if (!url) return;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
        await Linking.openURL(url);
    } else {
        console.warn(`Don't know how to open URI: ${url}`);
    }
};

export const SocialButtons: React.FC<SocialButtonsProps> = ({ socials, name }) => {
    const { surface, tint } = useColors();


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Social medias
            </Text>
            <ScrollView style={styles.buttonContainer} horizontal showsHorizontalScrollIndicator={false} bounces={false}>
                {socials.website && (
                    <TouchableOpacity activeOpacity={0.7} onPress={() => openLink(socials.website)} style={[styles.button, { backgroundColor: surface }]}>
                        <Ionicons name="globe-outline" size={24} color={tint} />
                        <Text style={styles.buttonText}>
                            Website
                        </Text>
                    </TouchableOpacity>
                )}
                {socials.instagram && (
                    <TouchableOpacity activeOpacity={0.7} onPress={() => openLink(socials.instagram)} style={[styles.button, { backgroundColor: surface }]}>
                        <Ionicons name="logo-instagram" size={24} color="#C13584" />
                        <Text style={styles.buttonText}>
                            Instagram
                        </Text>
                    </TouchableOpacity>
                )}
                {socials.facebook && (
                    <TouchableOpacity activeOpacity={0.7} onPress={() => openLink(socials.facebook)} style={[styles.button, { backgroundColor: surface }]}>
                        <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                        <Text style={styles.buttonText}>
                            Facebook
                        </Text>
                    </TouchableOpacity>
                )}
                {socials.tiktok && (
                    <TouchableOpacity activeOpacity={0.7} onPress={() => openLink(socials.tiktok)} style={[styles.button, { backgroundColor: surface }]}>
                        <Ionicons name="logo-tiktok" size={24} color="#000" />
                        <Text style={styles.buttonText}>
                            TikTok
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        padding: 10,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
        gap: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
