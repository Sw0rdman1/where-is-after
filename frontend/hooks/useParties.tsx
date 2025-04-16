import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthProvider';
import { useState } from 'react';
import { usePartyAPI } from '@/api/parties';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes


export const useParties = (venueId?: string) => {
    const { user } = useAuth();
    const { getParties, getPartiesForVenue } = usePartyAPI();
    const [radius, setRadius] = useState(10000);
    const [date, setDate] = useState(new Date('2025-03-25'));


    const fetchParties = async () => {
        if (!user?.currentLocation) {
            throw new Error('User location not found');
        }
        if (venueId) {
            return await getPartiesForVenue(venueId);
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


export const useParty = (partyId: string) => {
    const { getParty } = usePartyAPI();

    const fetchParty = async () => {
        return await getParty(partyId);
    };

    const { data: party, isLoading, isError, error } = useQuery({
        queryKey: ['party', partyId],
        queryFn: fetchParty,
        staleTime: STALE_TIME
    });

    return {
        party,
        loading: isLoading,
        error: isError ? error?.message || 'Failed to fetch party' : null,
    };
}


