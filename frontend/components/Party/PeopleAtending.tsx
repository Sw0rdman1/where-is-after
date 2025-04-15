import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '../Themed';
import User from '@/models/User';
import { useAuth } from '@/context/AuthProvider';

const AVATAR_SIZE = 32;

interface PeopleAtendingProps {
    people: Partial<User>[];
}

export const PeopleAtending: React.FC<PeopleAtendingProps> = ({ people }) => {
    const { user } = useAuth();
    if (people.length === 0) return <View style={styles.container} />;

    const isCurrentUserGoing = people.some(p => p._id === user?._id);
    const others = people.filter(p => p._id !== user?._id);

    const maxVisible = 3;
    const visibleOthers = others.slice(0, maxVisible);
    const remaining = others.length - visibleOthers.length;

    const nameParts = [];

    if (isCurrentUserGoing) {
        nameParts.push('You');
    }

    visibleOthers.forEach(p => {
        nameParts.push(p.displayName ?? 'Unknown');
    });

    let attendingText = nameParts.join(', ');
    if (remaining > 0) {
        attendingText += ` and ${remaining} other${remaining > 1 ? 's' : ''}`;
    }

    const totalMentioned = nameParts.length + remaining;

    if (totalMentioned === 1 && isCurrentUserGoing && others.length === 0) {
        attendingText = 'You are going';
    } else {
        attendingText += totalMentioned === 1 ? ' is going' : ' are going';
    }

    const visibleAvatars = isCurrentUserGoing
        ? [user!, ...visibleOthers]
        : visibleOthers;

    return (
        <View style={styles.container}>
            <View style={styles.avatars}>
                {visibleAvatars.map((person, index) => (
                    <Image
                        key={person._id || index}
                        source={{ uri: person.profileImage || 'https://via.placeholder.com/50' }}
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
                <Text style={styles.attendingText}>{attendingText}</Text>
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
    },
    attendingText: {
        fontSize: 16,
    },
});
