import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allVenues } from '../api/venues';
import { Loader } from '../components/Loader.tsx';
import { SearchBar } from '../components/SearchBar.tsx';
import { VenueGrid } from '../components/VenueGrid.tsx';
import { Pagination } from '../components/Pagination.tsx';
import { useQuery } from '../utils/useQuery.ts';
import { VenueProps } from '../types/venue';

export function ExplorePage() {
    const query = useQuery();
    const search = query.get('search')?.toLowerCase() || '';
    const navigate = useNavigate();

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
        venue.name?.toLowerCase().includes(search) ||
        venue.location?.address?.toLowerCase().includes(search) ||
        venue.location?.city?.toLowerCase().includes(search) ||
        venue.location?.country?.toLowerCase().includes(search)
    );

    const start = (page - 1) * limit;
    const paginatedVenues = filteredVenues.slice(start, start + limit);

    if (loading) return <Loader/>;

    function handleSearchSubmit() {
        navigate(`/explore?search=${encodeURIComponent(searchInput)}`);
    }

    return (
        <div>
            <h1 className='text-3xl mb-2'>Explore</h1>

            <SearchBar
                search={searchInput}
                onSearchChange={setSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />

            {paginatedVenues.length > 0 ? (
                <VenueGrid venues={paginatedVenues} />
            ) : (
                <p className="text-center text-gray-500 mt-8">No venues found.</p>
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