import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { allVenues } from '../api/venues';
import { Loader } from '../components/Loader.tsx';
import { VenueProps } from '../types/venue';
import VenueCard from '../components/VenueCard';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function Explore() {
    const [venues, setVenues] = useState<VenueProps[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 15;

    const query = useQuery();
    const search = query.get('search')?.toLowerCase() || '';

    useEffect(() => {
        setLoading(true);
        allVenues()
            .then(setVenues)
            .finally(() => setLoading(false));
    }, []);

    const filteredVenues = venues.filter((venue) =>
        venue.name?.toLowerCase().includes(search) ||
        venue.location?.address?.toLowerCase().includes(search) ||
        venue.location?.city?.toLowerCase().includes(search) ||
        venue.location?.country?.toLowerCase().includes(search)
    );

    const start = (page - 1) * limit;
    const paginatedVenues = filteredVenues.slice(start, start + limit);

    if (loading) return <Loader/>;

    return (
        <div>
            <h1 className='text-3xl mb-2'>Explore</h1>

            {paginatedVenues.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {paginatedVenues.map((venue) => (
                        <VenueCard key={venue.id} {...venue} />
                    ))}
                </div>
            ) : (
                <p className='text-center text-gray-500 mt-8'>No matches found</p>
            )}

            {filteredVenues.length > limit && (
                <div className='flex justify-center gap-4 my-6'>
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
                    >
                        Previous
                    </button>
                    <span className='flex items-center'>Page {page}</span>
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={start + limit >= filteredVenues.length}
                        className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

