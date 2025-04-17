import { useEffect, useState } from 'react';
import { allVenues } from '../api/venues.tsx';
import VenueCard, { VenueProps } from '../components/VenueCard.tsx';
import { SearchBar } from '../components/SearchBar.tsx';

export function Home() {
    const [venues, setVenues] = useState<VenueProps[]>([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const limit = 15;

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search.length > 0) {
                allVenues(100).then(setVenues);
            } else {
                allVenues(limit, page).then(setVenues);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, page]);

    const filteredVenues = venues.filter((venue) =>
        venue.name?.toLowerCase().includes(search.toLowerCase()) ||
        venue.location?.address?.toLowerCase().includes(search.toLowerCase()) ||
        venue.location?.city?.toLowerCase().includes(search.toLowerCase()) ||
        venue.location?.country?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1 className='text-3xl mb-2'>Homes</h1>

            <SearchBar search={search} onSearchChange={setSearch} />

            {filteredVenues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredVenues.map((venue) => (
                        <VenueCard key={venue.id} {...venue} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-8">No matches found</p>
            )}

            <div className="flex justify-center gap-4 my-6">
                <button
                    onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className='flex items-center'>Page {page}</span>
                <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}