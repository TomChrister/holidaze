import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { singleVenue } from '../api/venues';
import { VenueProps } from '../types/venue';
import { VenueDetails } from '../features/venue/VenueDetails.tsx';

export function VenuePage() {
    const { id } = useParams();
    const [venue, setVenue] = useState<VenueProps | null>(null);

    useEffect(() => {
        if (id) {
            singleVenue(id).then(setVenue);
        }
    }, [id]);

    if (!venue) return <p>Loading...</p>;

    return <VenueDetails venue={venue} venueId={id!} />;
}
