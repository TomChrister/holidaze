import { VenueProps } from '../types/venue';
import VenueCard from './VenueCard';

type VenueGridProps = {
    venues: VenueProps[];
};

export function VenueGrid({ venues }: VenueGridProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-4'>
            {venues.map((venue) => (
                <VenueCard key={venue.id} {...venue} />
            ))}
        </div>
    );
}
