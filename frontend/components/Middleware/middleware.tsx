import { useEffect } from 'react';
import { Redirect, router, useSegments } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            return router.replace('/auth');
        } else if (!user.isVerified) {
            return router.replace('//verify');
        }

    }, [user, isLoading]);

    return user ? children : null;
}