import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '../Themed';
import User from '@/models/User';

const AVATAR_SIZE = 32;


interface PeopleAtendingProps {
    people: Partial<User>[];
}

export const PeopleAtending: React.FC<PeopleAtendingProps> = ({ people }) => {
    const maxVisible = 3;
    const visiblePeople = people.slice(0, maxVisible);
    const remaining = people.length - maxVisible;

    const names = visiblePeople.map(p => p.displayName).join(', ');

    return (
        <View style={styles.container}>
            <View style={styles.avatars}>
                {visiblePeople.map((person, index) => (
                    <Image
                        key={index}
                        source={{ uri: person.profileImage }}
                        style={[styles.avatar, { marginLeft: index === 0 ? 0 : -12 }]}
                    />
                ))}
                {remaining > 0 && (
                    <View style={[styles.avatar, styles.extraAvatar, { marginLeft: -12 }]}>
                        <Text style={styles.extraText}>+{remaining}</Text>
                    </View>
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={{ ...styles.attendingText, fontWeight: 'bold' }}>{names}</Text>
                <Text style={styles.attendingText}>
                    {remaining > 0 ? `and ${remaining} others` : ''} are going
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 15,
    },
    avatars: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#eee',
    },
    extraAvatar: {
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    extraText: {
        color: '#333',
        fontWeight: 'bold',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 1,
    },
    attendingText: {
        fontSize: 14,
    },
});
