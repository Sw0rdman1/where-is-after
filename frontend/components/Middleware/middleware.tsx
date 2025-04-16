import { useEffect } from 'react';
import { Redirect, router, useSegments } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            return router.replace('/(auth)');
        } else if (!user.isVerified) {
            return router.replace('/(auth)/verify');
        }

    }, [user]);

    return user ? children : null;
}

export function RoleBasedRedirect({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const segments = useSegments();

    useEffect(() => {
        if (!isLoading && user) {
            if (user.role === 'venue' && (segments[1] as string) !== '(venue)') {
                router.replace('/(protected)/(venue)');
            } else if (user.role === 'user' && (segments[1] as string) !== '(user)') {
                router.replace('/(protected)/(user)/(tabs)');
            }
        }
    }, [user, isLoading]);

    if (isLoading) return null;

    return children;
}
