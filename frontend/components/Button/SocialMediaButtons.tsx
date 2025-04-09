import React from 'react';
import { View, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import ShareButton from './ShareButton';

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
    const { surface, text } = useColors();


    return (
        <View style={styles.container}>
            {socials.website && (
                <TouchableOpacity onPress={() => openLink(socials.website)} style={[styles.button, { backgroundColor: surface }]}>
                    <Ionicons name="globe-outline" size={24} color={text} />
                </TouchableOpacity>
            )}
            {socials.instagram && (
                <TouchableOpacity onPress={() => openLink(socials.instagram)} style={[styles.button, { backgroundColor: surface }]}>
                    <Ionicons name="logo-instagram" size={24} color="#C13584" />
                </TouchableOpacity>
            )}
            {socials.facebook && (
                <TouchableOpacity onPress={() => openLink(socials.facebook)} style={[styles.button, { backgroundColor: surface }]}>
                    <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                </TouchableOpacity>
            )}
            {socials.tiktok && (
                <TouchableOpacity onPress={() => openLink(socials.tiktok)} style={[styles.button, { backgroundColor: surface }]}>
                    <Ionicons name="logo-tiktok" size={24} color="#000" />
                </TouchableOpacity>
            )}
            <ShareButton
                message={`Check out this venue: ${name}`}
                title={`Share ${name}`}
                buttonLabel="Share Venue"
                color={text}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
    },
    button: {
        padding: 10,
        borderRadius: 100,
    },
});
