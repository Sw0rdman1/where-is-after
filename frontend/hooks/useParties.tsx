import { useQuery } from '@tanstack/react-query';
import { getParties } from '@/api/parties';
import { useAuth } from '@/context/AuthProvider';
import { useState } from 'react';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes


export const useParties = () => {
    const { user } = useAuth();
    const [radius, setRadius] = useState(10000);
    const [date, setDate] = useState(new Date('2025-03-25'));

    const fetchParties = async () => {
        if (!user?.currentLocation) {
            throw new Error('User location not found');
        }
        return await getParties(user.currentLocation, radius, date);
    };

    const { data: parties, isLoading, isError, error } = useQuery({
        queryKey: ['parties', user?.currentLocation, radius, date],
        queryFn: fetchParties,
        staleTime: STALE_TIME
    });

    return {
        parties: parties || [],
        loading: isLoading,
        error: isError ? error?.message || 'Failed to fetch parties' : null,
    };
};
