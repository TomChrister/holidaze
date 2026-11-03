import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allVenues } from '../api/venues';
import { Loader } from '../components/Loader.tsx';
import { SearchBar } from '../components/SearchBar.tsx';
import { VenueGrid } from '../components/VenueGrid.tsx';
import { Pagination } from '../components/Pagination.tsx';
import { buildSearchQuery, useQuery } from '../utils/useQuery.ts';
import { VenueProps } from '../types/venue';
import { overlapsBooking } from '../utils/helperFunctions.tsx';
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
        pets: false,
        parking: false,
        breakfast: false,
    });

    useEffect(() => {
        setLoading(true);
        allVenues()
            .then(setVenues)
            .finally(() => setLoading(false));
    }, []);

    // New search or filter: start from the first page again
    useEffect(() => setPage(1), [search, guestCount, from, to, filters]);

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
            (!filters.pets || venue.meta.pets) &&
            !(from && to && overlapsBooking(venue.bookings, new Date(from), new Date(to)))
        )
    })

    const start = (page - 1) * limit;
    const paginatedVenues = filteredVenues.slice(start, start + limit);

    if (loading) return <Loader/>;

    return (
        <>
            <title>Explore</title>
            <section className='border-b border-divider bg-cloud'>
                <div className='container-page py-8 md:py-10'>
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

                    <div className='mt-6 flex flex-wrap justify-center gap-2'>
                        {Object.entries(filters).map(([key, active]) => (
                            <button
                                key={key}
                                type='button'
                                aria-pressed={active}
                                onClick={() =>
                                    setFilters(f => ({ ...f, [key]: !f[key as keyof typeof filters] }))
                                }
                                className={`chip capitalize ${active
                                    ? 'border-ink bg-ink text-white'
                                    : 'border-divider bg-white text-ink hover:border-ink'}`}
                            >
                                {iconMap[key as keyof typeof iconMap]}
                                {key}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className='container-page pt-10'>
                <div className='mb-6'>
                    <h1 className='page-heading'>{search ? `Stays matching “${search}”` : 'All stays'}</h1>
                    <p className='mt-1 text-base text-graphite'>
                        {filteredVenues.length} {filteredVenues.length === 1 ? 'place' : 'places'} found
                    </p>
                </div>

                {paginatedVenues.length > 0 ? (
                    <VenueGrid venues={paginatedVenues}/>
                ) : (
                    <div className='rounded-card bg-cloud px-6 py-16 text-center'>
                        <p className='section-heading'>No venues found</p>
                        <p className='mt-1 text-graphite'>Try another destination or remove some filters.</p>
                    </div>
                )}

                {filteredVenues.length > limit && (
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalItems={filteredVenues.length}
                        limit={limit}
                    />
                )}
            </section>
        </>
    );
}
