import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allVenues } from '../api/venues';
import { Loader } from '../components/Loader.tsx';
import { SearchBar } from '../components/SearchBar.tsx';
import { VenueGrid } from '../components/VenueGrid.tsx';
import { Pagination } from '../components/Pagination.tsx';
import { buildSearchQuery, useQuery } from '../utils/useQuery.ts';
import { VenueProps } from '../types/venue';

export function ExplorePage() {
    const navigate = useNavigate();
    const query = useQuery();

    const search = query.get('search')?.toLowerCase() || '';
    const from = query.get('from');
    const to = query.get('to');
    const guests = query.get('guests');
    const guestCount = guests ? parseInt(guests) : 1;

    const [venues, setVenues] = useState<VenueProps[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(search);
    
    const limit = 15;

    useEffect(() => {
        setLoading(true);
        allVenues()
            .then(setVenues)
            .finally(() => setLoading(false));
    }, []);

    const filteredVenues = venues.filter((venue) =>
        (
            venue.name?.toLowerCase().includes(search) ||
            venue.location?.city?.toLowerCase().includes(search) ||
            venue.location?.country?.toLowerCase().includes(search)
        ) &&
        venue.maxGuests >= guestCount
    );

    const start = (page - 1) * limit;
    const paginatedVenues = filteredVenues.slice(start, start + limit);

    if (loading) return <Loader/>;

    return (
        <div className='bg-brand-secondary'>
            <SearchBar
                search={searchInput}
                onSearchChange={setSearchInput}
                onSearchSubmit={(params) => {
                    navigate(`/explore?${buildSearchQuery(searchInput, params)}`);
                }}
                initialStartDate={from ? new Date(from) : null}
                initialEndDate={to ? new Date(to) : null}
                initialGuests={guestCount}
            />

            <h1 className='px-6 text-3xl lg:px-32'>Search results</h1>
            {filteredVenues.length > 0 && (
                <p className='px-6 text-sm text-gray-500 mt-2 mb-6 lg:px-32'>
                    Found {filteredVenues.length} results
                </p>
            )}

            {paginatedVenues.length > 0 ? (
                <VenueGrid venues={paginatedVenues}/>
            ) : (
                <p className='text-center text-gray-500 mt-8'>No venues found.</p>
            )}

            {filteredVenues.length > limit && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalItems={filteredVenues.length}
                    limit={limit}
                />
            )}
        </div>
    );
}