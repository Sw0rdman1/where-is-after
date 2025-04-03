import { getVenue } from "@/api/venues";
import { useQuery } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes


export const useVenue = (venueId: string) => {
    const fetchVenue = async () => {
        return await getVenue(venueId);
    };

    const { data: venue, isLoading, isError, error } = useQuery({
        queryKey: ['venue', venueId],
        queryFn: fetchVenue,
        staleTime: STALE_TIME
    });

    return {
        venue,
        loading: isLoading,
        error: isError ? error?.message || 'Failed to fetch venue' : null,
    };
}