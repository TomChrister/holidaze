import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allVenues } from '../api/venues';
import { Loader } from '../components/Loader.tsx';
import { SearchBar } from '../components/SearchBar.tsx';
import { VenueGrid } from '../components/VenueGrid.tsx';
import { Pagination } from '../components/Pagination.tsx';
import { buildSearchQuery, useQuery } from '../utils/useQuery.ts';
import { VenueProps } from '../types/venue';
import { CarFront, Coffee, PawPrint, Wifi } from 'lucide-react';

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

    const iconMap = {
        wifi: <Wifi className='h-4 w-4'/>,
        parking: <CarFront className='h-4 w-4'/>,
        breakfast: <Coffee className='h-4 w-4'/>,
        pets: <PawPrint className='h-4 w-4'/>,
    };

    const [filters, setFilters] = useState({
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
    });

    useEffect(() => {
        setLoading(true);
        allVenues()
            .then(setVenues)
            .finally(() => setLoading(false));
    }, []);

    const filteredVenues = venues.filter(venue => {
        const name = venue.name?.toLowerCase() || ''
        const city = venue.location?.city?.toLowerCase() || ''
        const country = venue.location?.country?.toLowerCase() || ''

        return (
            (name.includes(search) ||
                city.includes(search) ||
                country.includes(search)) &&
            venue.maxGuests >= guestCount &&

            (!filters.wifi || venue.meta.wifi) &&
            (!filters.parking || venue.meta.parking) &&
            (!filters.breakfast || venue.meta.breakfast) &&
            (!filters.pets || venue.meta.pets)
        )
    })

    const start = (page - 1) * limit;
    const paginatedVenues = filteredVenues.slice(start, start + limit);

    if (loading) return <Loader/>;

    return (
        <>
            <div>
                <title>Explore</title>
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

                    <h2 className='flex justify-center px-6 pb-3 text-2xl lg:px-32'>Pick filters</h2>
                    <div className='flex justify-center space-x-4 px-6 mb-8 lg:px-32'>
                        {Object.entries(filters).map(([key, active]) => (
                            <span
                                key={key}
                                onClick={() =>
                                    setFilters(f => ({ ...f, [key]: !f[key as keyof typeof filters] }))
                                }
                                className={`flex items-center space-x-1 cursor-pointer px-3 py-1 rounded-lg shadow-md hover:bg-brand-primary hover:text-white
                                          ${active ? 'bg-brand-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {iconMap[key as keyof typeof iconMap]}
                                <span className='capitalize text-sm'>
                                    {key}
                                </span>
                            </span>
                        ))}
                    </div>

                    <h2 className='px-6 text-3xl lg:px-32'>Search results</h2>
                    {filteredVenues.length > 0 && (
                        <p className='mt-2 mb-6 px-6 text-sm text-gray-500 lg:px-32'>
                            Found {filteredVenues.length} results
                        </p>
                    )}

                    {paginatedVenues.length > 0 ? (
                        <VenueGrid venues={paginatedVenues}/>
                    ) : (
                        <p className='mt-8 text-center text-gray-500'>No venues found.</p>
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
            </div>
        </>
    );
}