import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { singleVenue } from '../api/venues';
import { VenueProps } from '../types/venue';
import { VenueDetails } from '../features/venue/VenueDetails.tsx';

export function VenuePage() {
    const { id } = useParams();
    const [venue, setVenue] = useState<VenueProps | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (id) {
            singleVenue(id, true).then(setVenue).catch(() => setNotFound(true));
        }
    }, [id]);

    if (notFound) return <p className='p-6 text-center'>Venue not found.</p>;
    if (!venue) return <p>Loading...</p>;

    return (
        <>
            <title>{venue.name}</title>
            <VenueDetails venue={venue} venueId={id!}/>
        </>
    )
}
