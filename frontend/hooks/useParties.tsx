import { useState, useEffect } from 'react';
import { getParties } from '@/api/parties';
import { useAuth } from '@/context/AuthProvider';

interface Party {
    _id: string;
    name: string;
    description?: string;
    date: string;
    venue: {
        _id: string;
        name: string;
        location?: string;
    };
}


export const useParties = (radius: number, date: string) => {
    const [parties, setParties] = useState<Party[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();


    useEffect(() => {
        const fetchParties = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!user?.currentLocation) {
                    throw new Error('User location not found');
                }

                const response = await getParties(user.currentLocation, radius, new Date(date));

                setParties(response.data);

            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch parties');
            } finally {
                setLoading(false);
            }
        };

        fetchParties();
    }, [radius, date]);

    return { parties, loading, error };
};
