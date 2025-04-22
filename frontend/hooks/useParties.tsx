import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthProvider';
import { useState } from 'react';
import { usePartyAPI } from '@/api/parties';
import { Role } from '@/models/User';
import { usePartyRequestAPI } from '@/api/partyRequest';
import Party from '@/models/Party';
import { JoinRequest } from '@/models/JoinRequest';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes


export const useParties = (venueId?: string) => {
    const { user } = useAuth();
    const { getParties, getPartiesForVenue, } = usePartyAPI();
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
        queryKey: ['parties', user?.currentLocation, radius, date, user?._id],
        queryFn: fetchParties,
        enabled: !!user,
        staleTime: STALE_TIME
    });

    return {
        parties: parties || [],
        loading: isLoading,
        error: isError ? error?.message || 'Failed to fetch parties' : null,
        date,
        setDate,
        radius,
        setRadius,
    };
};


export const useParty = (partyId: string) => {
    const { getParty } = usePartyAPI();
    const { user } = useAuth();

    const fetchParty = async (): Promise<Party | null> => {
        return await getParty(partyId);
    };

    const { data: party, isLoading, isError, error } = useQuery({
        queryKey: ['party', partyId, user?._id],
        queryFn: fetchParty,
        enabled: !!user,
        staleTime: STALE_TIME
    });

    return {
        party,
        loading: isLoading,
        error: isError ? error?.message || 'Failed to fetch party' : null,
    };
}

export const usePartyRequests = (partyId: string) => {
    const { getJoinRequestsForParty } = usePartyRequestAPI(partyId);
    const { user } = useAuth();

    const fetchPartyRequest = async (): Promise<JoinRequest[] | null> => {
        return await getJoinRequestsForParty();
    };

    const { data: partyRequests, isLoading, isError, error } = useQuery({
        queryKey: ['party', partyId, user?._id],
        queryFn: fetchPartyRequest,
        enabled: !!user,
        staleTime: STALE_TIME
    });

    return {
        partyRequests,
        loading: isLoading,
        error: isError ? error?.message || 'Failed to fetch party' : null,
    };
}



