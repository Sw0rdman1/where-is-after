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
            console.log(segments);

            if (user.role === 'admin' && (segments[1] as string) !== '(admin)') {
                router.replace('/(protected)/(admin)');
            } else if (user.role === 'user' && (segments[1] as string) !== '(user)') {
                router.replace('/(protected)/(user)');
            }
        }
    }, [user, isLoading]);

    if (isLoading) return null;

    return children;
}
