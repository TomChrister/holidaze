import { VenueProps } from '../types/venue';
import VenueCard from './VenueCard';

type VenueGridProps = {
    venues: VenueProps[];
};

export function VenueGrid({ venues }: VenueGridProps) {
    return (
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {venues.map((venue) => (
                <VenueCard key={venue.id} {...venue} />
            ))}
        </div>
    );
}
