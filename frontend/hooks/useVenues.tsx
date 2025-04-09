import { useVenueAPI } from "@/api/venues";
import Venue from "@/models/Venue";
import { useQuery } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes


export const useVenue = (venueId: string) => {
    const { getVenue } = useVenueAPI();

    const fetchVenue = async () => {
        return await getVenue(venueId);
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['venue', venueId],
        queryFn: fetchVenue,
        staleTime: STALE_TIME
    });

    const venue = data as Venue;

    return {
        venue,
        loading: isLoading,
        error: isError ? error?.message || 'Failed to fetch venue' : null,
    };
}