import { VenueProps } from '../types/venue';
import VenueCard from './VenueCard';

type VenueGridProps = {
    venues: VenueProps[];
};

export function VenueGrid({ venues }: VenueGridProps) {
    return (
        <>
            <div className='grid grid-cols-1 gap-6 px-6 lg:grid-cols-2 xl:grid-cols-3 lg:px-32'>
                {venues.map((venue) => (
                    <VenueCard key={venue.id} {...venue} />
                ))}
            </div>
        </>
    );
}
